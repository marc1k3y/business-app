import "../../App.css"

import { Button, Form, Input, InputNumber, Popconfirm, Table } from "antd"
import { useEffect, useState } from "react"
import { fetchTableService } from "../farming/api"
import { unix } from "dayjs"
import { roleDataIndex, roleName } from "../farming/utils"

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}
export const FarmModule = () => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    setIsLoading(true)
    // fetchTableService({ status: "2", startDate: range[0], endDate: range[1] })
    fetchTableService({ status: "2", startDate: "", endDate: "" })
      .then((res) => setData(res))
      // .catch((e) => messageApi.open({ type: "error", content: e.message }))
      .finally(() => setIsLoading(false))
  }, [
    // range, messageApi
  ])
  const [editingKey, setEditingKey] = useState("")
  const isEditing = (record) => record._id === editingKey
  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      quanity: "",
      valid: "",
      price: "",
      total: "",
      ...record,
    })
    setEditingKey(record._id)
  }
  const cancel = () => {
    setEditingKey("")
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey("")
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey("")
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }
  const columns = [
    {
      width: 100,
      align: "center",
      title: "Date created",
      dataIndex: "dateCreated",
      render: ((date) => unix(date).format("DD-MM-YY"))
    },
    {
      width: 120,
      align: "center",
      title: "Date completed",
      dataIndex: "dateCompleted",
      render: ((date) => unix(date).format("DD-MM-YY"))
    },
    {
      align: "center",
      title: "Quantity",
      dataIndex: "quantity",
      editable: true
    },
    {
      align: "center",
      title: "Valids",
      dataIndex: "valid",
      editable: true
    },
    {
      align: "center",
      title: "Price",
      dataIndex: "price",
      editable: true
    },
    {
      align: "center",
      title: "Total",
      dataIndex: "total",
      editable: true
    },
    {
      align: "center",
      title: "Currency",
      dataIndex: ["currency", "iso"],
    },
    {
      width: 110,
      align: "center",
      title: "Account type",
      dataIndex: ["type", "name"],
    },
    {
      align: "center",
      title: "Location",
      dataIndex: ["location", "iso"],
    },
    {
      width: 130,
      align: "center",
      title: roleName(),
      dataIndex: roleDataIndex(),
    },
    {
      width: 110,
      align: "center",
      title: "Description",
      dataIndex: "description",
      render: ((inp) => inp ?? "Empty")
    },
    {
      align: "center",
      title: "Team",
      dataIndex: ["team", "id"],
    },
    {
      width: editingKey.length ? 150 : 80,
      align: "center",
      fixed: "right",
      title: "Actions",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Button
              size="small"
              type="primary"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel} placement="left">
              <Button size="small" danger>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <Button
            size="small" disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Button>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={isLoading}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowKey={(record) => record._id}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        scroll={{ x: 1300 }}
      />
    </Form>
  )
}