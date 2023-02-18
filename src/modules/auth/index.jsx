import css from "./style.module.css"
import { useState } from "react"
import { loginHandler } from "./api"

export const AuthModule = ({ setIsAuth }) => {
  const [email, setEmail] = useState("serviceAccount@mail.com")
  const [password, setPassword] = useState("63%n9l$gPXw0")

  function login(e) {
    e.preventDefault()
    const authData = { email, password }
    loginHandler(authData)
      .then(() => setIsAuth(true))
      .catch((e) => console.error(e.message))
  }
  return (
    <div className={css.wrapper}>
      Please auth
      <form onSubmit={(e) => login(e)}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button>enter</button>
      </form>
    </div>
  )
}