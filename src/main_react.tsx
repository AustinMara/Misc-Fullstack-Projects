import {type Container, createRoot} from "react-dom/client";
import Calculator from "./Calculator.tsx";
import ToDo from "./ToDo.tsx";
import {CatWeather} from "./CatWeather.tsx";


const root = document.getElementById('root');
if(!root){
    throw new Error('Root element not found')
}
createRoot(root).render(
    <>
        <ToDo/>
        <CatWeather/>
    </>
);