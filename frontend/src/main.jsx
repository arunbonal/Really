import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiDataProvider } from "./contexts/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApiDataProvider>
      <App />
    </ApiDataProvider>
  </BrowserRouter>
);
