import { type Container, createRoot } from "react-dom/client";
import Calculator from "./Components/Calculator.tsx";
import ToDo from "./Components/ToDo.tsx";
import { CatWeather } from "./Components/CatWeather.tsx";
import App from "./Components/App.tsx";
import Points from "./Components/Points/Points.tsx";

const root = document.getElementById("root");
if (!root) {
    throw new Error("Root element not found");
}
createRoot(root).render(
    <>
        <App>
            <ToDo />
            <CatWeather />
            <Points />
        </App>

    </>,
);
