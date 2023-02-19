import { $authAPI } from "../../http"

const loginPoint = "/v1/accounts/auth"

export async function loginService(authData) {
  const { data } = await $authAPI.post(loginPoint, authData)
  localStorage.setItem("token", data.token)
  localStorage.setItem("roleId", data.roleId)
  return data
}