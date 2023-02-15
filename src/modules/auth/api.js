import { $authServerHost } from "../../http"

const loginPoint = "/v1/accounts/auth"

export async function loginHandler(authData) {
  const { data } = await $authServerHost.post(loginPoint, authData)
  localStorage.setItem("token", data.token)
  localStorage.setItem("roleId", data.roleId)
  return data
}