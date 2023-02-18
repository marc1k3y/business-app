import { useState } from "react"
import { ConfigProvider, Layout, Menu } from "antd"
import { useNavigate, Navigate, Route, Routes } from "react-router-dom"
import { permissions, Roles } from "./permissions"
import { DashboardModule } from "./modules/dashboard"
import {
  TagsOutlined,
  DashboardOutlined,
} from "@ant-design/icons"


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
    { key: "test", icon: <TagsOutlined />, label: "Test" },
  ].filter((link) => (permissions[link.key].access.includes(currentRole)))

  const routes = [
    { source: "dashboard", path: "/dashboard", element: <DashboardModule /> },
    { source: "test", path: "/test", element: <DashboardModule /> },
  ]
  console.log("Log from Router.jsx, currentRole:", currentRole);
  return (
    <ConfigProvider theme={{ token: { colorBgLayout: "lightgray" } }}>
      <Layout hasSider style={{
        marginLeft: collapsed ? 80 : 200,
        minHeight: "calc(100vh - 17px)",
        borderRadius: "5px",
        padding: "5px"
      }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          style={{ position: "fixed", left: 0, top: 0, bottom: 0 }} >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }} />
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={"dashboard"}
            onClick={handleMenuClick}
            items={links} />
        </Sider>
        <Layout>
          <Content>
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