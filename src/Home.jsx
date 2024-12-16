import React, { useState, useEffect } from "react";
import "./App.css";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
const Home = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const fetchWeather = async () => {
        if (!city.trim()) {
            setError("Enter a city name!!");
            return;
        }

        setLoading(true);
        setError(null);
        setWeatherData(null);
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3956d0a2e9715c52421f606f41b39b84&units=metric`;
            const res = await axios.get(url);

            if (res.status === 200) {
                setWeatherData(res.data);
            } else {
                setError("Unable to fetch weather data. Please try again!!");
            }
        } catch (error) {
            setError("An error occurred while fetching weather data. Please check the city name and try again!!");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWeather();
    }, []);
    return (
        <div className="container">
            <div className="search-bar">
                <input
                    type="search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter City Name.."
                />
                <div className="search-button">
                    <IoSearchOutline className="icon" onClick={fetchWeather} />
                </div>
            </div>

            <div>
                {loading ? (
                    <>
                        <div className="loader"></div>
                    </>
                ) : weatherData ? (
                    <>
                        <h2>{`${weatherData.name}`}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Weather</th>
                                    <th>Temperature(°C)</th>
                                    <th>Humidity(%)</th>
                                    <th className="timezone">Timezone(sec)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{weatherData.weather[0].main}</td>
                                    <td>{weatherData.main.temp}</td>
                                    <td>{weatherData.main.humidity}</td>
                                    <td className="timezone">{weatherData.timezone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p className="error">{error}</p>

                )}

            </div>
        </div>
    );

}

export default Home
