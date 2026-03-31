import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import ToDo from "./Components/ToDo.tsx";
import { CatWeather } from "./Components/CatWeather.tsx";
import Points from "./Components/Points/Points.tsx";
// @ts-ignore
import CanvasGame from "./Components/Game/CanvasGame.jsx";
import GameTime from "./Components/SaturdayGametime/GameTime.tsx";

const pages = [
    { path: '/GameTime', label: 'Saturday Game Time', desc: 'Track computer time for drop-in students', accent: true },
    { path: '/Points', label: 'Points', desc: 'Manage club points' },
    { path: '/Game', label: 'Canvas Game', desc: 'Play the canvas game' },
    { path: '/ToDo', label: 'To Do', desc: 'Task list' },
    { path: '/CatWeather', label: 'Cat Weather', desc: 'Weather with cats' },
];

function Home() {
    return (
        <div data-theme="crc" className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-8 gap-10">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold tracking-tight text-primary">Austin's Projects</h1>
                <p className="text-base-content/60 mt-2 text-lg"></p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
                {pages.map(p => (
                    <Link
                        key={p.path}
                        to={p.path}
                        className={`card bg-base-200 border-2 hover:scale-105 transition-transform duration-150 ${p.accent ? 'border-accent' : 'border-base-300 hover:border-primary'}`}
                    >
                        <div className="card-body p-5">
                            <h2 className={`card-title text-xl ${p.accent ? 'text-accent' : 'text-primary'}`}>{p.label}</h2>
                            <p className="text-base-content/60 text-sm">{p.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/ToDo' element={<ToDo />} />
                <Route path='/CatWeather' element={<CatWeather />} />
                <Route path='/Points' element={<Points />} />
                <Route path='/Game' element={<CanvasGame />} />
                <Route path='/GameTime' element={<GameTime />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>,
);

