import { Table } from "antd"

const Title = ({ text }) => {
  return <span style={{ color: "goldenrod", fontWeight: "bold" }}>{text}</span>
}

export const SimpleTable = ({ title, template, data, isLoading }) => {
  return (
    <Table
      bordered
      title={() => <Title text={title} />}
      size="middle"
      columns={template}
      dataSource={data}
      rowKey={(record) => record._id}
      scroll={{ x: 1300 }}
      pagination={false}
      loading={isLoading} />
  )
}