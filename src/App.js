import "./App.css"
import { useState } from "react"
import { AuthModule } from "./modules/auth"
import { AppRouter } from "./Router"

export default function App() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <div className="App">
      {isAuth
        ? <AppRouter />
        : <AuthModule setIsAuth={setIsAuth} />}
    </div>
  )
}