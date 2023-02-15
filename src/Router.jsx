import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardModule } from "./modules/dashboard"
import { permissions, Roles } from "./permissions"

export const AppRouter = () => {
  const routes = [
    { source: "dashboard", path: "/dashboard", element: <DashboardModule /> }
  ]
  const currentRole = Roles[localStorage.getItem("roleId")]
  console.log(currentRole);
  return (
    <Routes>
      {routes.map((route) => (
        permissions[route.source].access.includes(currentRole) &&
        <Route
          key={route.source}
          path={route.path}
          element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}