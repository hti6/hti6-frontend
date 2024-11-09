import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { Router } from "./router";
import { RootLayout } from "./layouts";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(Tooltip);
Chart.register(BarController);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(LineController);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Filler);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RootLayout>
    <Router />
  </RootLayout>,
);
