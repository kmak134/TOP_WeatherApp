import { useState, useEffect } from 'react';
import { format, fromUnixTime } from "date-fns"
import Header from './components/Header';
import TodayWeather from './components/TodayWeather';
import './css/styles.css';
import { WeatherData, WeekWeatherData } from './models/WeatherData';


function App() {

  /* 
  Metric units:
  Temp:           Degrees Celcius
  Precipitation:  Milimeters
  Snow:           Centimeters
  Wind:           km/hr
  Visibility:     km
  */

  /* 
  US units:
  Temp:           Degrees Fahrenheit
  Precipitation:  Inches
  Snow:           Inches
  Wind:           miles/hr
  Visibility:     miles
  */

  /*
  Icons:
  Snow
  Rain
  Fog
  Wind
  Cloudy
  Partly-Cloud-Day
  Partly-Cloud-Night
  Clear-Day
  Clear-Night
  */

  const [currWeatherData, setCurrWeatherData]= useState<WeatherData>();

  useEffect(() => {
    getWeatherInfo("Vancouver");
  }, []);

  const getWeatherData = async(location: string) => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=PASCJ7ZZ826BYZNQZCB86CVGD&contentType=json`);
    const weatherData = await response.json();
    return weatherData;
  }

  const extractPrecipType = (precipTypeArr: any) => {
    if (precipTypeArr) return precipTypeArr[0];
    else return null;
  }

  // method from https://stackoverflow.com/questions/65006937/get-date-in-a-specific-timezone
  const getDatetimeFromTimezone = (timezone: string) => {
    const date = new Date().toLocaleString("en-US", {
      timeZone: timezone,
    });

    let formattedDate = format(date, "cccc, MMMM do, yyyy | hh:mm aaa")
    return formattedDate;
  }

  const formatSunTimes = (time: string) => {
    return time.substring(0, 5);
  }

  const addOnTempDegrees = (temp: number) => {
    return `${temp}°C`;
  }

  const addUnitsToWind = (windSpeed: number) => {
    return `${windSpeed} km/h`;
  }

  const addUnitsToVisibility = (visibility: number) => {
    return `${visibility} km`;
  }


  const extractWeatherData = (data: any): WeatherData => {

    console.log(fromUnixTime(data.currentConditions.datetimeEpoch));

    let extractedData: WeatherData = {
        location: data.resolvedAddress,
        date: getDatetimeFromTimezone(data.timezone),
        currTemp: addOnTempDegrees(data.currentConditions.temp),
        feelsLikeTemp: addOnTempDegrees(data.currentConditions.feelslike),
        tempMin: data.days[0].tempmin,
        tempMax: data.days[0].tempmax,
        conditions: data.currentConditions.conditions,
        description: data.description,
        windSpeed: addUnitsToWind(data.currentConditions.windspeed),
        cloudCover: `${data.currentConditions.cloudcover}%`,
        humidity: `${data.currentConditions.humidity}%`,
        precip: data.currentConditions.precip,
        precipProb: data.currentConditions.precipprob,
        precipType: extractPrecipType(data.currentConditions.preciptype),
        sunrise: formatSunTimes(data.currentConditions.sunrise),
        sunset: formatSunTimes(data.currentConditions.sunset),
        visibility: addUnitsToVisibility(data.currentConditions.visibility),
        icon: data.currentConditions.icon
    }

    return extractedData;
  }

  const getWeatherInfo = async(cityName: string) => {
    let weatherData = await getWeatherData(cityName);
    let currWeatherData = extractWeatherData(weatherData);
    if (currWeatherData) setCurrWeatherData(currWeatherData);
    console.log(currWeatherData);
  }

  return (
    <>
      <Header handleSearchQuery={getWeatherInfo} />
      <div className='content'>
        <TodayWeather data={currWeatherData} />
      </div>
    </>
  )
}

export default App
