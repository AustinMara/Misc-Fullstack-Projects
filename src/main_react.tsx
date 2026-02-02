import { type Container, createRoot } from "react-dom/client";
import Calculator from "./Components/Calculator.tsx";
import ToDo from "./Components/ToDo.tsx";
import { CatWeather } from "./Components/CatWeather.tsx";

const root = document.getElementById("root");
if (!root) {
    throw new Error("Root element not found");
}
createRoot(root).render(
    <>
        <ToDo />
        <CatWeather />
    </>,
);
