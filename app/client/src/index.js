import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";

document.addEventListener("contextmenu", (event) => event.preventDefault());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<HashRouter>
		<App />
	</HashRouter>
);