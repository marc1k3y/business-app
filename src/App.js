import { useState } from "react"
import { AuthModule } from "./modules/auth"
import { AppRouter } from "./Router"


export default function App() {
  const [isAuth, setIsAuth] = useState(false)
  return isAuth ? <AppRouter /> : <AuthModule setIsAuth={setIsAuth} />
}