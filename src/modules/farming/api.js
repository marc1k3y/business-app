import { $farmingAPIjwt } from "../../http"

export async function fetchTableService({ status, startDate, endDate }) {
  const { data } = await $farmingAPIjwt.get("tableData/get", {
    params: { status, startDate, endDate }
  })
  return data
}

export const getCurrencies = async () => {
  const { data } = await $farmingAPIjwt.get("currency/get/all")
  return data
}

export const getAccountsTypes = async () => {
  const { data } = await $farmingAPIjwt.get("accountTypes/get/all")
  return data
}

export const getLocations = async () => {
  const { data } = await $farmingAPIjwt.get("locations/get/all")
  return data
}

export const createAccountRequestService = async (requestData) => {
  const { data } = await $farmingAPIjwt.post("accountRequests/create", requestData)
  return data
}

export const updateAccountRequestService = async (requestData) => {
  const { data } = await $farmingAPIjwt.put("accountRequests/update", requestData)
  return data
}