import css from "./style.module.css"
import { useEffect, useState } from "react"
import { Button, message, Modal } from "antd"
import { createAccountRequestService, fetchTableService } from "./api"
import { CompletedTemplate } from "./tableTemplates/Completed"
import { SimpleTable } from "./components/SimpleTable"
import { PendingTemplate } from "./tableTemplates/Pending"
import { CreateARForm } from "./forms/CreateAR"
import { InWorkTemplate } from "./tableTemplates/InWork"
import { DeclinedTemplate } from "./tableTemplates/Declined"


export const FarmingModule = ({ range }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState({
    pending: [], inWork: [], completed: [], declined: []
  })
  const [isLoading, setIsLoading] = useState({
    pending: false, inWork: false, completed: false, declined: false
  })
  const [requestData, setRequestData] = useState({
    quantity: 0, price: 0,
    currencyID: "", typeID: "Select type", locationID: "Select country",
    description: ""
  })

  // MODAL
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    createAccountRequestService(requestData)
      .then((res) => {
        messageApi.open({ type: "success", content: res })
        setIsModalOpen(false)
      })
      .catch((e) => messageApi.open({ type: "error", content: e.message }))
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
      .catch((e) => messageApi.open({ type: "info", content: `Pending ${e.response.data}` }))
      .finally(() => setIsLoading((prev) => ({ ...prev, pending: false })))
  }, [range, messageApi])

  // in work
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, inWork: true }))
    fetchTableService({ status: "1", startDate: range[0], endDate: range[1] })
      .then((res) => setData((prev) => ({ ...prev, inWork: res })))
      .catch((e) => messageApi.open({ type: "info", content: `In work ${e.response.data}` }))
      .finally(() => setIsLoading((prev) => ({ ...prev, inWork: false })))
  }, [range, messageApi])

  // completed
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, completed: true }))
    fetchTableService({ status: "2", startDate: range[0], endDate: range[1] })
      .then((res) => setData((prev) => ({ ...prev, completed: res })))
      .catch((e) => messageApi.open({ type: "info", content: `Completed ${e.response.data}` }))
      .finally(() => setIsLoading((prev) => ({ ...prev, completed: false })))
  }, [range, messageApi])

  // declined
  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, declined: true }))
    fetchTableService({ status: "3", startDate: range[0], endDate: range[1] })
      .then((res) => setData((prev) => ({ ...prev, declined: res })))
      .catch((e) => messageApi.open({ type: "info", content: `Declined ${e.response.data}` }))
      .finally(() => setIsLoading((prev) => ({ ...prev, declined: false })))
  }, [range, messageApi])
  return (
    <div className={css.wrapper}>
      {contextHolder}
      <Button onClick={showModal}>
        new ar
      </Button>
      <Modal title="Create Account Request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CreateARForm requestData={requestData} setRequestData={setRequestData} />
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
      {data.inWork.length > 0 && <SimpleTable
        title="In work"
        template={InWorkTemplate}
        data={data.inWork}
        isLoading={isLoading.inWork} />}
      <SimpleTable
        title="Declined"
        template={DeclinedTemplate}
        data={data.declined}
        isLoading={isLoading.declined} />
    </div>)
}