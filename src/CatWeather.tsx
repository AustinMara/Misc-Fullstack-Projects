import {useEffect, useState} from "react";
const stillCat = 'https://cataas.com/cat?type=square';
const gifCat = 'https://cataas.com/cat/gif?type=square';

let cityName = "Seattle";
const weatherAPI = `http://goweather.xyz/weather/${cityName}`;
const geoAPI = 'https://api.geoapify.com/v1/ipinfo?&apiKey=31c3a86e91e648569a0403f635df3fc6';
//let response = '';



async function fetchData(api: string, retries = 3, delay = 1000): Promise<any> {
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
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchData(api, retries - 1, delay);
        } else {
            // Handle any errors during the fetch or parsing
            console.error('Error fetching or parsing data:', error);
            return null;
        }
    }

}

// Call the async function

const cToF = (celsiusStr: string) => {
    const celsius = parseInt(celsiusStr);
    return isNaN(celsius) ? celsiusStr : `${Math.round((celsius * 9 / 5) + 32)} °F`;
};

export function CatWeather(){
    const [weather, setWeather] = useState<any>(null);
    const [location, setLocation] = useState<any>(null);
    const [city, setCity] = useState<string | null>(null);

    useEffect(() => {
        fetchData(geoAPI).then(data => {
            if (data?.city?.name) {
                setCity(data.city.name);
            }
        });
    }, []);



    useEffect(() => {
        if (city) {
            fetchData(`http://goweather.xyz/weather/${city}`).then(data => setWeather(data));
        }
    }, [city]);

    const [image, setImage] = useState("https://cataas.com/cat?type=square")
    return(
        <div
            data-theme={'retro'}
            className={'flex w-screen h-screen items-center justify-center bg-base-100 align-middle'}
        >
            <section className={"card h-auto w-full max-w-xl items-center justify-center outline-accent outline-1 p-4 overflow-hidden bg-base-200"}>
                <p className = " card-title align-middle text-8xl mb-2" >Hello, {city}</p>
                <figure className={"w-full"}>
                    <img src={image} className={"w-2/3 aspect-square rounded-xl object-contain mt-1"} onClick={() => setImage(image == stillCat ? gifCat : stillCat)} alt={"cat"}></img>
                </figure>
                <div className={'card-body items-center justify-center w-full'}>

                    <h1 className={''}>{weather ? weather.temperature : "Loading..."}</h1>
                    <h1 className={''}>{weather ? weather.wind : "Loading..."}</h1>
                </div>


            </section>

        </div>
    )
}