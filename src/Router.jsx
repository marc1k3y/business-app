import { useState } from "react"
import { ConfigProvider, Layout, Menu } from "antd"
import { useNavigate, Navigate, Route, Routes } from "react-router-dom"
import { permissions, Roles } from "./permissions"
import { DashboardModule } from "./modules/dashboard"
import { FarmingModule } from "./modules/farmer"
import {
  DashboardOutlined,
  AccountBookOutlined,
} from "@ant-design/icons"
import logo from "./assets/logo.png"
import { Header } from "antd/es/layout/layout"


const { Content, Sider } = Layout

export const AppRouter = () => {
  const navigate = useNavigate()
  const currentRole = Roles[localStorage.getItem("roleId")]
  const [collapsed, setCollapsed] = useState(true)

  function handleMenuClick(e) {
    navigate(`/${e.key}`)
  }

  const links = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "farming", icon: <AccountBookOutlined />, label: "Farming" },
  ].filter((link) => (permissions[link.key].access.includes(currentRole)))

  const routes = [
    { source: "dashboard", path: "/dashboard", element: <DashboardModule /> },
    { source: "farming", path: "/farming", element: <FarmingModule /> },
  ]
  console.log("Log from Router.jsx, currentRole:", currentRole);
  return (
    <ConfigProvider theme={{ token: { colorBgLayout: "white" } }}>
      <Layout hasSider style={{
        marginLeft: 80,
        // marginLeft: collapsed ? 80 : 200,
        minHeight: "calc(100vh - 17px)",
      }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          style={{ position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 200 }} >
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0" }}>
            <img src={logo} width="50px" alt="gl-erp" />
          </div>
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={"dashboard"}
            onClick={handleMenuClick}
            items={links} />
        </Sider>
        <Layout>
          {/* <Header /> */}
          <Content style={{
            borderRadius: "5px",
            padding: "5px"
          }}>
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
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}