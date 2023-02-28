import { Col, Form, Input, InputNumber, message, Row, Select, Upload } from "antd"
import { InboxOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { getCurrencies, getAccountsTypes, getLocations, createAccountRequestService } from "../api"

const { Dragger } = Upload

export const CreateARForm = ({ requestData, setRequestData }) => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [isLoading, setIsLoading] = useState({
    currencies: false, types: false, locations: false
  })
  const [dropdowns, setDropdowns] = useState({
    currencies: [], types: [], locations: []
  })

  // currencies
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, currencies: true }))
    getCurrencies()
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          res[i].value = res[i]["_id"]
          res[i].label = res[i]["iso"]
          delete res[i]._id
          delete res[i].iso
        }
        setDropdowns((prev) => ({ ...prev, currencies: res }))
      })
      .catch((e) => messageApi.error(e.message))
      .finally(() => setIsLoading((prev) => ({ ...prev, currencies: false })))
  }, [messageApi])

  // types
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, types: true }))
    getAccountsTypes()
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          res[i].value = res[i]["_id"]
          res[i].label = res[i]["name"]
          delete res[i]._id
          delete res[i].name
        }
        setDropdowns((prev) => ({ ...prev, types: res }))
      })
      .catch((e) => messageApi.error(e.message))
      .finally(() => setIsLoading((prev) => ({ ...prev, types: false })))
  }, [messageApi])

  // locations
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, locations: true }))
    getLocations()
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          res[i].value = res[i]["_id"]
          res[i].label = res[i]["name"]
          delete res[i]._id
          delete res[i].name
        }
        setDropdowns((prev) => ({ ...prev, locations: res }))
      })
      .catch((e) => messageApi.error(e.message))
      .finally(() => setIsLoading((prev) => ({ ...prev, locations: false })))
  }, [messageApi])

  return (
    <Form layout="vertical" form={form}
      requiredMark={false}
    // style={{ maxWidth: 600 }}
    >
      {contextHolder}
      <Row align="middle">
        <Col span={8}>
          <Form.Item label="Quantity" required>
            <InputNumber
              value={requestData.quantity}
              onChange={(e) => setRequestData((prev) => ({ ...prev, quantity: e }))} />
          </Form.Item>
          <Form.Item label="Price" required>
            <InputNumber
              value={requestData.price}
              onChange={(e) => setRequestData((prev) => ({ ...prev, price: e }))} />
          </Form.Item>
          <Form.Item label="Total" required>
            <InputNumber
            // value={requestData.total}
            // onChange={(e) => setRequestData((prev) => ({ ...prev, total: e }))} 
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Currency">
            <Select
              value={requestData.currencyID}
              onChange={(e) => setRequestData((prev) => ({ ...prev, currencyID: e }))}
              loading={isLoading.currencies}
              options={dropdowns.currencies} />
          </Form.Item>
          <Form.Item label="Account type">
            <Select
              value={requestData.typeID}
              onChange={(e) => setRequestData((prev) => ({ ...prev, typeID: e }))}
              loading={isLoading.types}
              options={dropdowns.types} />
          </Form.Item>
          <Form.Item label="Country">
            <Select
              value={requestData.locationID}
              onChange={(e) => setRequestData((prev) => ({ ...prev, locationID: e }))}
              loading={isLoading.locations}
              options={dropdowns.locations} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Description" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.TextArea
          autoSize={{ minRows: 2 }}
          value={requestData.description}
          onChange={(e) => setRequestData((prev) => ({ ...prev, description: e.target.value }))} />
      </Form.Item>
      <Form.Item>
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </Form.Item>
    </Form>
  )
}