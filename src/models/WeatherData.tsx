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

interface WeekWeatherData {
    date: string,
    icon: string,
    high: number,
    low: number
}

export type { WeatherData, WeekWeatherData}