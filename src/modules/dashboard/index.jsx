import { useLocation } from "react-router-dom"
import { permissions, Roles } from "../../permissions"

export const DashboardModule = () => {
  const currentRole = Roles[localStorage.getItem("roleId")]
  const { pathname } = useLocation()
  const aviableActions = permissions[pathname.split("/")[1]].actions[currentRole]
  return (
    <div>{currentRole} can {aviableActions?.map((action) => <span key={action}>{action} </span>)}</div>
  )
}