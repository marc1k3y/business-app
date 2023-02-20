import { Col, Form, Input, InputNumber, Row, Select, Upload } from "antd"
import { InboxOutlined } from "@ant-design/icons"

const { Dragger } = Upload

export const CreateARForm = () => {
  const [form] = Form.useForm()
  return (
    <Form layout="vertical" form={form}
    // style={{ maxWidth: 600 }}
    >
      <Row align="middle">
        <Col span={8}>
          <Form.Item label="Amount" required>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Price" required>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Total" required>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Currency">
            <Select />
          </Form.Item>
          <Form.Item label="Account type">
            <Select />
          </Form.Item>
          <Form.Item label="Country">
            <Select />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Description" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.TextArea autoSize={{ minRows: 2 }} />
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