import css from "./style.module.css"
import { useEffect, useState } from "react"
import { DatePicker, message, Table } from "antd"
import { fetchCompletedService } from "./api"
import { CompletedTemplate } from "./templates/Completed"

const { RangePicker } = DatePicker

export const FarmingModule = () => {
  const [data, setData] = useState([])
  const [range, setRange] = useState(["", ""])
  const [loading, setLoading] = useState({
    pending: false, inWork: false, completed: false, declined: false
  })
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    setLoading((prev) => ({ ...prev, completed: true }))
    fetchCompletedService({ startDate: range[0], endDate: range[1] })
      .then((res) => setData(res))
      .catch((e) => messageApi.open({ type: "error", content: e.message }))
      .finally(() => setLoading((prev) => ({ ...prev, completed: false })))
  }, [range, messageApi])

  console.log("range", range);
  return (
    <div className={css.wrapper}>
      {contextHolder}
      <RangePicker
        format="YYYY-MM-DD"
        onChange={(_, y) => setRange(y)} />
      <Table
        bordered
        title={() => "Completed"}
        size="small"
        columns={CompletedTemplate}
        dataSource={data}
        rowKey={(record) => record._id}
        scroll={{ x: 1300 }}
        pagination={false}
        loading={loading.completed} />
    </div>)
}