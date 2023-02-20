import css from "./style.module.css"
import { useEffect, useState } from "react"
import { Button, message, Modal } from "antd"
import { fetchTableService } from "./api"
import { CompletedTemplate } from "./tableTemplates/Completed"
import { SimpleTable } from "./components/SimpleTable"
import { PendingTemplate } from "./tableTemplates/Pending"
import { CreateARForm } from "./forms/CreateAR"


export const FarmingModule = ({ range }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState({
    pending: [], inWork: [], completed: [], declined: []
  })
  const [isLoading, setIsLoading] = useState({
    pending: false, inWork: false, completed: false, declined: false
  })

  // MODAL
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // MODAL

  useEffect(() => {
    if (!PendingTemplate[4]["dataIndex"]) window.location.reload(false)
    if (!CompletedTemplate[9]["dataIndex"]) window.location.reload(false)
  }, [])

  // pending
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, pending: true }))
    fetchTableService({ status: "0", startDate: range[0], endDate: range[1] })
      .then((res) => setData((prev) => ({ ...prev, pending: res })))
      .catch((e) => messageApi.open({ type: "error", content: e.message }))
      .finally(() => setIsLoading((prev) => ({ ...prev, pending: false })))
  }, [range, messageApi])

  // completed
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, completed: true }))
    fetchTableService({ status: "2", startDate: range[0], endDate: range[1] })
      .then((res) => setData((prev) => ({ ...prev, completed: res })))
      .catch((e) => messageApi.open({ type: "error", content: e.message }))
      .finally(() => setIsLoading((prev) => ({ ...prev, completed: false })))
  }, [range, messageApi])
  return (
    <div className={css.wrapper}>
      {contextHolder}
      <Button onClick={showModal}>
        new ar
      </Button>
      <Modal title="Create Account Request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CreateARForm />
      </Modal>
      <SimpleTable
        title="Pending"
        template={PendingTemplate}
        data={data.pending}
        isLoading={isLoading.pending} />
      <SimpleTable
        title="Completed"
        template={CompletedTemplate}
        data={data.completed}
        isLoading={isLoading.completed} />
    </div>)
}