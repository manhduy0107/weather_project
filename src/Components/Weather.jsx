import React, { useState } from "react";
import { fetchDataWeather } from "../api/main";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("");
  const [hum, setHum] = useState(0);
  const [wind, setWind] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [Error404, setError404] = useState(true);
  
  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const reponsve = await fetchDataWeather(city);
      setTemp(Math.round(reponsve.main.temp) / 10);
      setDesc(reponsve.weather[0].description);
      setHum(Math.round(reponsve.main.humidity));
      setWind(Math.round(reponsve.wind.speed));
      selectImg(reponsve.weather[0].main);
      setHideSearch(true);
      setLoading(true);
      setShowResult(false);
      setCity("");
      setError404(true)
    } catch (err) {
      setHideSearch(true)
      setError404(false)
    }
  };


  const resetValues = () => {
    setHideSearch(false);
    setShowResult(true);
    setError404(true);
    setCity("");
  }

  function selectImg(sky) {
    switch (sky) {
      case "Clear":
        setImage("https://cdn-icons-png.flaticon.com/512/6974/6974833.png");
        break;
      case "Rain":
        setImage("https://cdn-icons-png.flaticon.com/512/6974/6974833.png");
        break;
      case "Snow":
        setImage("https://cdn-icons-png.flaticon.com/512/642/642102.png");
        break;
      case "Clouds":
        setImage("https://cdn-icons-png.flaticon.com/512/414/414825.png");
        break;
      case "Haze":
        setImage("https://cdn-icons-png.flaticon.com/512/1197/1197102.png");
        break;
      default:
        setImage("https://i.imgur.com/NNLjUId.png");
        break;
    }
  }

  return (
    <>
      <button onClick={resetValues} className='button'>Tìm lại</button>
      {!hideSearch ? (
        <div className="search">
          <form onSubmit={(e) => getWeather(e)}>
            <FontAwesomeIcon className="mm" icon={faMapLocationDot} />
            <input
              value={city}
              placeholder="Thành phố..."
              className="city_input"
              onChange={(e) => setCity(e.target.value)}
            />
            <FontAwesomeIcon className="si" icon={faSearch} />
          </form>
        </div>
      ) : null}
      {loading && !showResult ? (
        <>
          <div className="result" id="result">
            <h2 className="title">{city}</h2>
            <img className="sky_img" src={image} alt="weather-img" />

            <div className="main_comp">
              <h3 className="temp">{temp} &deg;C</h3>
              <h3 className="sky">{desc}</h3>
            </div>

            <div className="footer">
              <div className="humidity">
                <FontAwesomeIcon className="hd" icon={faWater} />
                <div className="hum_comp">
                  <p>{hum} %</p>
                  <p>Độ ẩm</p>
                </div>
              </div>

              <div className="wind">
                <FontAwesomeIcon className="wd" icon={faWind} />
                <div className="wind_comp">
                  <p>{wind} KMPH</p>
                  <p>Tốc độ gió</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : !Error404 && (<div className="img-error"><img className="sky_img" src="https://i.imgur.com/NNLjUId.png" alt="weather-img" /></div>)}
    </>
  );
};
