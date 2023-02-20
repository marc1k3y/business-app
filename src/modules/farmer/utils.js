import { Roles } from "../../permissions"

const currentRole = Roles[localStorage.getItem("roleId")]
export function roleName() {
  if (currentRole === "farmer") return "Buyer"
  if (currentRole === "buyer") return "Farmer"
}
export function roleDataIndex() {
  if (currentRole === "farmer") return ["buyer", "fullName"]
  if (currentRole === "buyer") return ["farmer", "fullName"]
}