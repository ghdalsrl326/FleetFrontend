import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import reportWebVitals from "reportWebVitals";
import { worker } from "mocks/browser";

async function startApp() {
  if (process.env.NODE_ENV === "development") {
    // Wait for the worker to be ready
    await worker.start({ onUnhandledRequest: "bypass" });
  }

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

startApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals.console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
