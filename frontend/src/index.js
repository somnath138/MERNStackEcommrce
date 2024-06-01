import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import AlertTemplate from "react-alert-template-basic";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
const options = {
  timeout: 5000,
  Positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
root.render(
  //wrap App using provider
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </BrowserRouter>
  //document.getElementById("root")
);
//reportWebVitals();
