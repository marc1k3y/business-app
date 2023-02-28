import { useState } from "react"
import { Button, ConfigProvider, DatePicker, Layout, Menu } from "antd"
import { useNavigate, useLocation, Navigate, Route, Routes } from "react-router-dom"
import { permissions, Roles } from "./permissions"
import {
  ProfileOutlined,
  AccountBookOutlined,
} from "@ant-design/icons"
import logo from "./assets/logo.png"
import { Header } from "antd/es/layout/layout"
import { ProfileModule } from "./modules/profile"
import { FarmingModule } from "./modules/farming"


const { Content, Sider } = Layout
const { RangePicker } = DatePicker

export const AppRouter = ({ setIsAuth }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentRole = Roles[localStorage.getItem("roleId")]
  const [range, setRange] = useState(["", ""])
  const [collapsed, setCollapsed] = useState(true)

  function handleMenuClick(e) {
    navigate(`/${e.key}`)
  }

  function logoutHandler() {
    setIsAuth(false)
    localStorage.clear()
    navigate("")
  }

  const links = [
    { key: "profile", icon: <ProfileOutlined />, label: "Profile" },
    { key: "farming", icon: <AccountBookOutlined />, label: "Farming" },
  ].filter((link) => (permissions[link.key].access.includes(currentRole)))

  const routes = [
    { source: "profile", path: "/profile", element: <ProfileModule /> },
    { source: "farming", path: "/farming", element: <FarmingModule range={range} /> },
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
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
            <img src={logo} width="50px" alt="gl-erp" />
          </div>
          <Menu
            theme="dark"
            mode="vertical"
            defaultSelectedKeys={pathname.split("/")[1] || "profile"}
            onClick={handleMenuClick}
            items={links} />
        </Sider>
        <Layout>
          <Header style={{ position: "fixed", top: 0, left: 80, right: 0, zIndex: 199, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 10px 0 20px" }}>
            <RangePicker
              size="small"
              style={{ width: 200 }}
              format="YYYY-MM-DD"
              onChange={(_, y) => setRange(y)} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "goldenrod" }}>
                {JSON.parse(localStorage.getItem("authData"))["email"]}
              </span>
              <Button type="primary" size="middle" danger onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          </Header>
          <Content style={{
            borderRadius: "5px",
            padding: "70px 5px 5px 5px"
          }}>
            <Routes>
              {routes.map((route) => (
                permissions[route.source].access.includes(currentRole) &&
                <Route
                  key={route.source}
                  path={route.path}
                  element={route.element} />
              ))}
              <Route path="*" element={<Navigate to={"/profile"} replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}