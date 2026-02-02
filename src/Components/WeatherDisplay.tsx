import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import React from "react";


function WeatherDisplay(props:any) {
    const weather = props.data;
    const temperature = weather.
    return (
        <div>
            <h1>{props.lat}</h1>
            <h1>{props.long}</h1>
        </div>
    );
}

export default WeatherDisplay;
