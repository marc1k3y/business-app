import { useEffect, useState } from "react"
import { unix } from "dayjs"
import { Button, Form, Input, InputNumber, Popconfirm, Table } from "antd"
import { TableTitle } from "../components/TableTitle"
import { Roles } from "../../../permissions"

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
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}>
          {inputNode}
        </Form.Item>
      ) : (children)}
    </td>
  )
}
export const InWorkTable = ({ data, isLoading }) => {
  const [form] = Form.useForm()
  const [roleName, setRoleName] = useState("")
  const [roleDataIndex, setRoleDataIndex] = useState([])
  const [editingKey, setEditingKey] = useState("")
  const isEditing = (record) => record._id === editingKey
  const edit = (record) => {
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

  useEffect(() => {
    const currentRole = Roles[localStorage.getItem("roleId")]
    if (currentRole === "farmer") setRoleName("Buyer")
    if (currentRole === "buyer") setRoleName("Farmer")
    if (currentRole === "farmer") setRoleDataIndex(["buyer", "fullName"])
    if (currentRole === "buyer") setRoleDataIndex(["farmer", "fullName"])
  }, [])
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
        // setData(newData)
        setEditingKey("")
      } else {
        newData.push(row)
        // setData(newData)
        setEditingKey("")
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }
  const columns = [
    {
      width: 120,
      fixed: "left",
      align: "center",
      title: "Date created",
      dataIndex: "dateCreated",
      render: ((date) => unix(date).format("DD-MM-YY"))
    },
    {
      align: "center",
      title: "Amount",
      dataIndex: "quantity",
    },
    {
      align: "center",
      title: "Account type",
      dataIndex: ["type", "name"]
    },
    {
      align: "center",
      title: "Location",
      dataIndex: ["location", "iso"],
    },
    {
      align: "center",
      title: roleName,
      dataIndex: roleDataIndex
    },
    {
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
              }}>
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
        inputType: typeof (col.dataIndex) === "string" ? "text" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  return (
    <Form form={form} component={false}>
      <Table
        bordered
        size="small"
        pagination={false}
        title={() => <TableTitle text="In work" />}
        components={{ body: { cell: EditableCell } }}
        loading={isLoading}
        dataSource={data}
        columns={mergedColumns}
        rowKey={(record) => record._id}
        rowClassName="editable-row"
        scroll={{ x: 1300 }} />
    </Form>
  )
}