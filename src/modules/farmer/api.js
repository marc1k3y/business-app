import { $farmingAPIjwt } from "../../http"

export async function fetchTableService({ status, startDate, endDate }) {
  const { data } = await $farmingAPIjwt.get("tableData/get", {
    params: { status, startDate, endDate }
  })
  return data
}

export async function fetchCompletedService({ startDate, endDate }) {
  const { data } = await $farmingAPIjwt.get("tableData/get", {
    params: {
      status: "2",
      startDate: startDate,
      endDate: endDate
    }
  })
  return data
} 