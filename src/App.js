import "./App.css"
import { useState } from "react"
import { AuthModule } from "./modules/auth"
import { DashboardModule } from "./modules/dashboard"

export default function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <div className="App">
      {isAuth
        ? <DashboardModule />
        : <AuthModule setIsAuth={setIsAuth} />}
    </div>
  )
}