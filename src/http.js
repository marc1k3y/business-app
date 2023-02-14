import axios from "axios"
import { REACT_APP_AUTH_SERVER, REACT_APP_STATISTIC_SERVER } from "./config"

const $authServerHost = axios.create({ baseURL: REACT_APP_AUTH_SERVER })
const $statisticServerHost = axios.create({ baseURL: REACT_APP_STATISTIC_SERVER })

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}
$statisticServerHost.interceptors.request.use(authInterceptor)

export { $authServerHost, $statisticServerHost }