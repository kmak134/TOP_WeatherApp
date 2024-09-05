interface WeatherData {
    location: string,
    date: string,
    currTemp: string,
    feelsLikeTemp: string,
    tempMin: number,
    tempMax: number,
    conditions: string,
    description: string,
    windSpeed: string,
    cloudCover: string,
    humidity: string,
    precip: number,
    precipProb: number,
    precipType: string,
    sunrise: string,
    sunset: string,
    visibility: string,
    icon: string
}

interface WeeklyForecastData {
    weeklyForecast: DayDataForWeeklyForecast[]
}

interface DayDataForWeeklyForecast {
    date: string,
    icon: string,
    temp: string,
    maxTemp: number,
    minTemp: number
}

export type { WeatherData, WeeklyForecastData, DayDataForWeeklyForecast}