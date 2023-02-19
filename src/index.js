import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Watermark } from "antd"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Watermark content="Mark And Timur await Payment"><BrowserRouter><App /></BrowserRouter></Watermark>)