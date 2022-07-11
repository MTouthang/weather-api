import React, { useEffect, useState } from "react";

// import axios ---
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  // calling weather API
  const fetchWeatherAPI = (local) => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${local}&aqi=no`
      )
      .then((data) => {
        console.log(data.data);
        setWeather(data.data);
      })
      .catch((error) => console.log(`ERROR: ${error}`));
  };

  useEffect(() => {
    fetchWeatherAPI("Bangalore");
  }, []);

  const inputLocation = (e) => {
    setLocation(e.target.value);
  };

  const searchHandler = () => {
    fetchWeatherAPI(location);
  };

  return (
    <div>
      {weather && (
        <div>
          <input
            type="text"
            onChange={inputLocation}
            placeholder="Enter your Location"
          />
          <button onClick={searchHandler}> Search</button>

          <h1> {weather.location.name} </h1>
          <h2> {weather.location.region}</h2>
          <div className="condition">
            <h3> {weather.current.condition.text} </h3>
            <img src={weather.current.condition.icon} alt="weather icon" />
            <h3> {weather.current.temp_f} F</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
