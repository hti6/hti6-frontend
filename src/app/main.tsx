import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Router } from "./router";
import { RootLayout } from "./layouts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RootLayout>
    <Router />
  </RootLayout>,
);
