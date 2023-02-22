import css from "./style.module.css"
import { useEffect, useState } from "react"
import { loginService } from "./api"
import { Input, Button, Form, theme, Checkbox, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import logo from "../../assets/logo.png"

const { useToken } = theme

export const AuthModule = ({ setIsAuth }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [authData, setAuthData] = useState({
    email: "", password: ""
  })
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const { token } = useToken()

  function loginHandler() {
    setLoading(true)
    loginService(authData)
      .then(() => {
        setIsAuth(true)
        remember && localStorage.setItem("authData", JSON.stringify(authData))
      })
      .catch((e) => messageApi.open({ type: "error", content: e.message }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const cacheData = JSON.parse(localStorage.getItem("authData"))
    if (cacheData?.email && cacheData?.password) {
      setLoading(true)
      loginService(cacheData)
        .then(() => setIsAuth(true))
        .catch((e) => messageApi.open({ type: "error", content: e.message }))
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={css.wrapper}>
      {contextHolder}
      <img src={logo} alt="gl-erp" />
      <Form onFinish={loginHandler}>
        <Input
          disabled={loading}
          type="email"
          size="large"
          placeholder="some@mail.ru"
          prefix={<UserOutlined />}
        value={authData.email}
        onChange={(e) => setAuthData((prev) => ({ ...prev, email: e.target.value }))} 
        />
        <Input.Password
          disabled={loading}
          size="large"
          placeholder="StrongPassword"
          prefix={<LockOutlined />}
        value={authData.password}
        onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))} 
        />
        <Checkbox
          className={css.checkbox}
          checked={remember}
          onChange={() => setRemember(!remember)}>
          Запомнить меня
        </Checkbox>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ backgroundColor: token.Button.colorPrimaryBg, boxShadow: token.Button.boxShadow }}>
          {loading ? "Идет вход.." : "Войти"}
        </Button>
      </Form>
    </div>
  )
}