import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          background: "#1a1c1d",
          color: "#f0f0f2",
          borderRadius: "0.125rem",
          padding: "12px 16px",
          boxShadow: "0 8px 40px -5px rgba(26,28,29,0.20)",
        },
        success: { iconTheme: { primary: "#857159", secondary: "#f0f0f2" } },
        error:   { iconTheme: { primary: "#ba1a1a", secondary: "#f0f0f2" } },
      }}
    />
  </BrowserRouter>
)

