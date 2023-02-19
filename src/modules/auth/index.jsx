import css from "./style.module.css"
import { useState } from "react"
import { loginService } from "./api"
import { Input, Button, Form, theme } from "antd"
import { UserOutlined } from "@ant-design/icons"
import logo from "../../assets/logo.png"

const { useToken } = theme

export const AuthModule = ({ setIsAuth }) => {
  const [email, setEmail] = useState("ivaychenko.d@gmail.com")
  const [password, setPassword] = useState("HklfewlWEFn23kl")
  const [loading, setLoading] = useState(false)
  const { token } = useToken()

  function loginHandler() {
    setLoading(true)
    const authData = { email, password }
    loginService(authData)
      .then(() => setIsAuth(true))
      .catch((e) => console.error(e.message))
      .finally(() => setLoading(false))
  }
  return (
    <div className={css.wrapper}>
      <img src={logo} alt="gl-erp" />
      <Form>
        <Input
          type="email"
          size="large"
          placeholder="some@mail.ru"
          prefix={<UserOutlined />}
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <Button type="primary" loading={loading} onClick={loginHandler} style={{ backgroundColor: token.Button.colorPrimaryBg, boxShadow: token.Button.boxShadow }}>
          {loading ? "Идет вход.." : "Войти"}
        </Button>
      </Form>
    </div>
  )
}