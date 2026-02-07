import { useEffect, useState } from "react";
import WeatherDisplay from "./WeatherDisplay";
import { fetchWeatherApi } from "openmeteo";
import weatherCodes from "../data/weather_codes.json";



const stillCat = "https://cataas.com/cat?type=square";
const gifCat = "https://cataas.com/cat/gif?type=square";

let cityName = "Seattle";
const weatherAPI = `https://api.open-meteo.com/v1/forecast`;
const geoAPI = `${import.meta.env.VITE_GEO_API_URL}`;

//const openWeather =
//let response = '';

async function fetchData(
    api?: string,
    params?: {},
    retries = 3,
    delay = 1000,
) {
    if (!api) {
        const responses = await fetchWeatherApi(weatherAPI, params);
        const response = responses[0];

        const current = response.current();
        if (current == null) {
            console.error(`Current is null`);
            return;
        }

        const latitude = response.latitude();
        const longitude = response.longitude();
        const elevation = response.elevation();
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const weatherData = {
            current: {
                time: new Date(
                    (Number(current.time()) + utcOffsetSeconds) * 1000,
                ),
                temperature_2m: current.variables(0)!.value(),
                weather_code: current.variables(1)!.value(),
                is_day: current.variables(2)!.value(),
                cloud_cover: current.variables(3)!.value(),
                wind_speed_10m: current.variables(4)!.value(),
                precipitation: current.variables(5)!.value(),
                wind_direction_10m: current.variables(6)!.value(),
                relative_humidity_2m: current.variables(7)!.value(),
                apparent_temperature: current.variables(8)!.value(),
            },
        };
        console.log(latitude, longitude);
        return weatherData;
    }

    try {
        // Await the fetch call to get the Response object
        const response = await fetch(api);

        // Check for an OK response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Await the .json() method call to get the parsed JavaScript object
        const data = await response.json();

        console.log(data);
        // Example of accessing data properties:
        // console.log(data.someProperty);
        return data;
    } catch (error) {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchData(api, {}, retries - 1, delay);
        } else {
            // Handle any errors during the fetch or parsing
            console.error("Error fetching or parsing data:", error);
            return null;
        }
    }
}

// Call the async function

const cToF = (celsiusStr: string) => {
    const celsius = parseInt(celsiusStr);
    return isNaN(celsius)
        ? celsiusStr
        : `${Math.round((celsius * 9) / 5 + 32)} °F`;
};

export function CatWeather() {
    const [weather, setWeather] = useState<any>(null);
    const [location, setLocation] = useState<any>(null);
    const [city, setCity] = useState<string | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [openWeather, setOpenWeather] = useState<any>(false);

    useEffect(() => {
        fetchData(geoAPI).then((data) => {
            if (data?.city?.name) {
                setCity(data.city.name);
            }
            if (data?.location?.latitude) {
                setLatitude(data.location.latitude);
            }

            if (data?.location?.longitude) {
                setLongitude(data.location.longitude);
            }
        });
    }, []);

    const weatherParams = {
        latitude: latitude,
        longitude: longitude,
        current: [
            "temperature_2m",
            "weather_code",
            "is_day",
            "cloud_cover",
            "wind_speed_10m",
            "precipitation",
            "wind_direction_10m",
            "relative_humidity_2m",
            "apparent_temperature",
        ],
        wind_speed_unit: "mph",
        temperature_unit: "fahrenheit",
        precipitation_unit: "inch",
    };

    useEffect(() => {
        if (city) {
            fetchData(undefined, weatherParams)
                .then((data) => setWeather(data))
                .catch((error) => console.log(error));
        }
    }, [city]);

    // useEffect(() => {
    //     if (latitude && longitude) {
    //         fetchWeatherApi(

    //         )
    //             .then((data) => setOpenWeather(data))
    //             .catch((error) => console.log(error));
    //     }
    // }, [latitude, longitude]);

    console.log(weather);

    const [image, setImage] = useState("https://cataas.com/cat?type=square");

    const weatherCode = weather?.current?.weather_code;
    const isDay = weather?.current?.is_day;
    const weatherInfo = (weatherCode !== undefined && isDay !== undefined)
        ? (weatherCodes as any)[String(weatherCode)]?.[isDay === 1 ? "day" : "night"]
        : null;

    return (
        <div

            className={
                "flex w-screen h-screen items-center justify-center  align-middle overflow-x-hidden"
            }>
            <section
                className={
                    "card h-auto w-full max-w-xl items-center justify-center outline-accent outline-3 p-4 overflow-hidden bg-base-200"
                }>
                <p className='font-serif  card-title align-middle text-8xl mb-2'>
                    Hello, {city}
                </p>
                <figure className={"w-full"}>
                    <img
                        src={image}
                        className={
                            "w-2/3 outline-accent-content outline-2 aspect-square rounded-xl object-contain mt-1"
                        }
                        onClick={() =>
                            setImage(image == stillCat ? gifCat : stillCat)
                        }
                        alt={"cat"}></img>
                </figure>
                <div
                    className={
                        "card-body items-center justify-center w-full font-serif text-lg"
                    }>
                    <h1 className={""}>{weatherInfo ? weatherInfo.description : "Loading..."}</h1>
                    <h1 className={""}>
                        {weather
                            ? `${Math.floor(weather.current.temperature_2m)} °F`
                            : "Loading..."}
                    </h1>
                    <h1 className={""}>
                        {weather
                            ? `${Math.round(weather.current.wind_speed_10m * 100) / 100} mph`
                            : "Loading..."}
                    </h1>
                </div>
            </section>
        </div>
    );
}
