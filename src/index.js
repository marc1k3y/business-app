import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router-dom"
import { Watermark } from "antd"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Watermark content="Future of Gipsy Land"><HashRouter><App /></HashRouter></Watermark>)