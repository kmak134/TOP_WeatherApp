import { useState, useEffect } from 'react';
import { format, fromUnixTime } from "date-fns"
import Header from './components/Header';
import TodayWeather from './components/TodayWeather';
import './css/styles.css';
import { WeatherData, WeeklyForecastData, DayDataForWeeklyForecast } from './models/WeatherData';
import MetricGroup from './enums/MetricGroup';


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
  const [currWeeklyForecast, setCurrWeeklyForecast] = useState<WeeklyForecastData>();
  const [currMetric, setCurrMetric] = useState<string>(MetricGroup.metric);
  const [currCity, setCurrCity] = useState<string>("Calgary");

  useEffect(() => {
    getWeatherInfo(currCity);
  }, []);

  useEffect(() => {
    getWeatherInfo(currCity);
  }, [currMetric]);

  const getWeatherData = async(location: string) => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${currMetric}&key=PASCJ7ZZ826BYZNQZCB86CVGD&contentType=json`);
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

  // method from https://stackoverflow.com/questions/48172772/time-zone-issue-involving-date-fns-format
  const getDayForWeeklyForecast = (datetime: string) => {
    let dt = new Date(datetime);
    let dtDate = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
    let formattedDay = format(dtDate, "cccc");
    return formattedDay;
  }

  const setMetricGroup = (metric: MetricGroup) => {
    setMetricGroup(metric);
  }

  const formatSunTimes = (time: string) => {
    return time.substring(0, 5);
  }

  const addOnTempDegrees = (temp: number) => {
    if (currMetric == MetricGroup.metric) return `${temp}°C`;
    else return `${temp}°F`
  }

  const addUnitsToWind = (windSpeed: number) => {
    if (currMetric == MetricGroup.metric) return `${windSpeed} km/h`;
    else return `${windSpeed} mph`;
  }

  const addUnitsToVisibility = (visibility: number) => {
    if (currMetric == MetricGroup.metric) return `${visibility} km`;
    else return `${visibility} mi`;
  }


  const extractWeatherData = (data: any): WeatherData => {
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
        icon: data.currentConditions.icon,
    }
    return extractedData;
  }

  const extractWeeklyForecastData = (data: any): WeeklyForecastData => {
    let extractedWeeklyForecast: WeeklyForecastData = {
      weeklyForecast: []
    }
    let forecastDays = data.days;
    for (let i = 1; i <= 7; i++) {
      let forecastDayData : DayDataForWeeklyForecast = {
        date: getDayForWeeklyForecast(forecastDays[i].datetime),
        icon: forecastDays[i].icon,
        temp: forecastDays[i].temp,
        maxTemp: forecastDays[i].tempmax,
        minTemp: forecastDays[i].tempmin
      }
      extractedWeeklyForecast.weeklyForecast.push(forecastDayData);
    }

    return extractedWeeklyForecast;
  }

  const getWeatherInfo = async(cityName: string) => {
    setCurrCity(cityName);
    let weatherData = await getWeatherData(cityName);
    let currWeatherData = extractWeatherData(weatherData);
    if (currWeatherData) setCurrWeatherData(currWeatherData);
    let currWeeklyForecast = extractWeeklyForecastData(weatherData);
    if (currWeeklyForecast) setCurrWeeklyForecast(currWeeklyForecast);
  }

  return (
    <>
      <Header handleSearchQuery={getWeatherInfo} setMetricGroup={setCurrMetric} />
      <div className='content'>
        <TodayWeather data={currWeatherData} weeklyForecastData={currWeeklyForecast}/>
      </div>
    </>
  )
}

export default App
