import { WeatherData, WeeklyForecastData } from "../models/WeatherData";
import clearDayIcon from "../assets/clear-day.svg";
import clearNightIcon from "../assets/clear-night.svg";
import cloudyIcon from "../assets/cloudy.svg";
import fogIcon from "../assets/fog.svg";
import partlyCloudyDayIcon from "../assets/partly-cloudy-day.svg";
import partyCloudyNightIcon from "../assets/partly-cloudy-night.svg";
import rainIcon from "../assets/rain.svg";
import snowIcon from "../assets/snow.svg";
import windIcon from "../assets/wind.svg";

interface Props {
    data: WeatherData | undefined,
    weeklyForecastData: WeeklyForecastData | undefined
}

const TodayWeather = ({data, weeklyForecastData}: Props)=> {

    const getWeatherIcon = (icon: string) => {
        switch (icon) {
            case "snow":
                return snowIcon;
            case "rain":
                return rainIcon;
            case "fog":
                return fogIcon;
            case "wind":
                return windIcon;
            case "cloudy":
                return cloudyIcon;
            case "partly-cloudy-day":
                return partlyCloudyDayIcon;
            case "partly-cloudy-night":
                return partyCloudyNightIcon;
            case "clear-day":
                return clearDayIcon;
            case "clear-night":
                return clearNightIcon;
            default:
                console.log(`Error: Icon ${icon} is not recognized`);
                break;
        }
    }

    const renderPrecipInfo = () => {
        if (data && data.precipType) {
            return <div id="precipInfo">
            <div className="gridItem">
                <div className="itemLabel">Precip. Type</div>
                <div className="itemContent" id="precipType">{data.precipType}</div>
            </div>
            <div className="gridItem">
                <div className="itemLabel">Precip. Chance</div>
                <div className="itemContent">{data.precipProb}%</div>
            </div>
            </div>
        }
    }

    const renderWeeklyForecastRows = () => {
        if (weeklyForecastData) {
            return (
                weeklyForecastData.weeklyForecast.map((day) => (
                    <tr className="tableRow">
                        <td className="row-day">{day.date}</td>
                        <td className="row-forecast">
                            <img className="tableWeatherIcon" src={getWeatherIcon(day.icon)} width={30}/>
                            <div className="tempForDay">{day.temp}</div>
                        </td>
                        <td className="row-temp-low">{day.minTemp}</td>
                        <td className="row-temp-high">{day.maxTemp}</td>
                    </tr>
            )));
        }
    }

    const renderForecastTable = () => {
        if (data) {
            return <table id="forecast-table">
                {renderWeeklyForecastRows()}
            </table>
        }
    }

    if (data)
        return <div id="todayContentContainer">
            <div id="dateLocationHeader">
                <div className="header">{data.location}</div>
                <div className="subHeader">{`${data.date}`}</div>
            </div>
            <div id="todayWeatherInfoContainer">
                <div id="mainWeatherInfo">
                    <div id="temperatureInfo">
                        <img className="weatherIcon" src={getWeatherIcon(data.icon)} width={50}/>
                        <div>{data.currTemp}</div>
                    </div>
                    <div id="mainText">
                        <div id="conditions">{data.conditions}</div>
                        <div>Feels like {data.feelsLikeTemp}</div>
                        <div>Min: {data.tempMin} | Max: {data.tempMax}</div>
                    </div>
                </div>
                <div id="infoContainer">
                    <div id="infoGrid">
                        <div className="gridItem">
                            <div className="itemLabel">Wind</div>
                            <div className="itemContent">{data.windSpeed}</div>
                        </div>
                        <div className="gridItem">
                            <div className="itemLabel">Cloudiness</div>
                            <div className="itemContent">{data.cloudCover}</div>
                        </div>
                        <div className="gridItem">
                            <div className="itemLabel">Humidity</div>
                            <div className="itemContent">{data.humidity}</div>
                        </div>
                        <div className="gridItem">
                            <div className="itemLabel">Visibility</div>
                            <div className="itemContent">{data.visibility}</div>
                        </div>
                        <div className="gridItem">
                            <div className="itemLabel">Sunrise</div>
                            <div className="itemContent">{data.sunrise}</div>
                        </div>
                        <div className="gridItem">
                            <div className="itemLabel">Sunset</div>
                            <div className="itemContent">{data.sunset}</div>
                        </div>
                    </div>
                    {renderPrecipInfo()}
                </div>
            </div>
            <div id="week-forecast">
                <div className="header">This Week's Forecast</div>
                {renderForecastTable()}
            </div>
        </div>
}

export default TodayWeather;