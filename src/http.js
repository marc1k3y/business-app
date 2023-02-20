import axios from "axios"

const REACT_APP_AUTH_SERVER = "https://g-identity.azurewebsites.net"
const REACT_APP_STATISTIC_SERVER = "https://g-personinfrastructure.azurewebsites.net"
const REACT_APP_FARMING_SERVER = "https://g-go-farming.azurewebsites.net/v2/"

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