import axios from "axios"
import { REACT_APP_AUTH_SERVER, REACT_APP_FARMING_SERVER, REACT_APP_STATISTIC_SERVER } from "./config"

const $authAPI = axios.create({ baseURL: REACT_APP_AUTH_SERVER })
const $statisticAPIjwt = axios.create({ baseURL: REACT_APP_STATISTIC_SERVER })
const $farmingAPIjwt = axios.create({ baseURL: REACT_APP_FARMING_SERVER })

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}
$statisticAPIjwt.interceptors.request.use(authInterceptor)
$farmingAPIjwt.interceptors.request.use(authInterceptor)

export { $authAPI, $statisticAPIjwt, $farmingAPIjwt }