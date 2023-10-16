import React, { useState } from "react";
import styles from "../css/Weather.module.css";
import { FcSearch } from "react-icons/fc";
import cloud from "../images/clear-sky.png";
import wind from "../images/windbg.png";
import moon from '../images/Moon.png';
import ScatteredCloud from "../images/scatteredClouds.png";
import cloudMoon from "../images/scatteredCloudMoon.png";
import humidityImg from "../images/humidity.png";
import rain from "../images/rain.png";
import NightRain from "../images/NightRain.png";
import Thunder from "../images/thunder.png";
import MorningSnow from "../images/morningSnow.png";
import NightSnow from "../images/nightSnow.png";
import mist from "../images/Mist.png";
function Weather() {
  const [input, setInput] = useState("");
  const [inputSet, setInputSet] = useState("Coimbatore");
  const [temp, setTemp] = useState(24);
  const [humidity, setHumidity] = useState(70);
  const [windSpeed, setWindSpeed] = useState(23);
  const [place, setPlace] = useState("Coimbatore");
  const [wIcon, setWIcon] = useState(cloud);
  const api_key = "8034a6af4ba23783a015cbbc8bc1e9f3";
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const searchFunc = async () => {
    setInputSet(input);
    if (!input) return 0;
    const url = `  https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=8034a6af4ba23783a015cbbc8bc1e9f3`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    // console.log(data.main.temp);
    setTemp(data.main.temp);
    setHumidity(Math.floor(data.main.humidity));
    setWindSpeed(Math.floor(data.wind.speed));
    setPlace(data.name.icon);
    setInput("");
    document.querySelector(".searchBox").value = "";
    const weather = data.weather[0].icon;
    console.log(weather);
    if (weather === "01d" || weather === "02d") setWIcon(cloud);
    else if (weather === "01n" || weather === "02n") setWIcon(moon);
    else if (weather === "03d" || weather === "04d") setWIcon(ScatteredCloud);
    else if (weather === "03n" || weather === "04n") setWIcon(cloudMoon);
    else if (weather === "09d" || weather === "010d") setWIcon(rain);
    else if (weather === "09n" || weather === "010n") setWIcon(NightRain);
    else if (weather === "11d" || weather == "11n") setWIcon(Thunder);
    else if (weather === "13d") setWIcon(MorningSnow);
    else if (weather === "13n") setWIcon(NightSnow);
    else if (weather === "50d" || weather === "50n") setWIcon(mist);
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <input
          type="text"
          className={`${styles.cityInput} searchBox`}
          placeholder="Search"
          value={input}
          onChange={handleInput}
        />
        <div className={styles.bgSpace}>
          <FcSearch className={styles.Search} onClick={searchFunc} />
        </div>
      </div>
      <div className={styles.weatherImage}>
        <img src={wIcon} alt="" className={styles.img} />
      </div>
      <div className={styles.percentPlace}>
        <div className={styles.weatherTemp}>{temp}&deg;c</div>
        <div className={styles.weatherLocation}>{place}</div>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.element}>
          <img src={humidityImg} className={styles.humidity} />
          <div className={styles.data}>
            <div className={styles.humidityPercent}>{humidity}%</div>
            <div className={styles.speed}>Humidity</div>
          </div>
        </div>
        <div className={styles.element}>
          <img src={wind} className={styles.humidity} />
          <div className={styles.data}>
            <div className={styles.humidityPercent}>{windSpeed}</div>
            <div className={styles.speed}>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
