import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * Rendering the App component inside a HashRouter component
 * as it is GitHub Pages friendly.
 */
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
