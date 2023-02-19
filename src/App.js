import "./App.css"
import { useState } from "react"
import { ConfigProvider } from "antd"
import { AuthModule } from "./modules/auth"
import { AppRouter } from "./Router"


export default function App() {
  const [isAuth, setIsAuth] = useState(false)
  
  return (
    <ConfigProvider theme={{
      components: {
        Button: {
          colorPrimaryBg: "goldenrod",
          boxShadow: "0 2px 0 rgba(218, 165, 22, 0.1)"
        }
      }
    }}>
      {isAuth ? <AppRouter /> : <AuthModule setIsAuth={setIsAuth} />}
    </ConfigProvider>
  )
}