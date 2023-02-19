import { Table } from "antd"

export const SimpleTable = ({ title, template, data, isLoading }) => {
  return (
    <Table
      bordered
      title={() => title}
      size="middle"
      columns={template}
      dataSource={data}
      rowKey={(record) => record._id}
      scroll={{ x: 1300 }}
      pagination={false}
      loading={isLoading} />
  )
}