import css from "./style.module.css"
import { useEffect, useState } from "react"
import { Button, message, Modal } from "antd"
import { createAccountRequestService, fetchTableService } from "./api"
import { CreateARForm } from "./forms/CreateAR"
import { PendingTable } from "./tables/Pending"
import { InWorkTable } from "./tables/InWork"
import { DeclinedTable } from "./tables/Declined"
import { CompletedTable } from "./tables/Completed"
import { permissions, Roles } from "../../permissions"


export const FarmingModule = ({ range }) => {
  const currentRole = Roles[localStorage.getItem("roleId")]
  const [actionsAccess, setActionsAccess] = useState({
    edit: false, create: false
  })
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
    currencyID: "Select currency", typeID: "Select type", locationID: "Select country",
    description: ""
  })

  // actions access
  useEffect(() => {
    if (permissions.farming.actions[currentRole].includes("edit")) {
      setActionsAccess((prev) => ({ ...prev, edit: true, showActions: true }))
    }
    if (permissions.farming.actions[currentRole].includes("create")) {
      setActionsAccess((prev) => ({ ...prev, create: true }))
    }
  }, [currentRole])

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
      {data.pending.length > 0 &&
        <PendingTable data={data.pending} setData={setData} isLoading={isLoading.pending} actionsAccess={actionsAccess} />}
      {data.inWork.length > 0 &&
        <InWorkTable data={data.inWork} setData={setData} isLoading={isLoading.inWork} actionsAccess={actionsAccess} />}
      {data.completed.length > 0 &&
        <CompletedTable data={data.completed} setData={setData} isLoading={isLoading.completed} actionsAccess={actionsAccess} />}
      {data.declined.length > 0 &&
        <DeclinedTable data={data.declined} setData={setData} isLoading={isLoading.declined} actionsAccess={actionsAccess} />}
    </div>)
}