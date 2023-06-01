const moment = require('moment');
const { getWeatherForecast } = require('./weather-api');

const transformDate = (rawDate) => {
    const transformedDate = moment(rawDate).format('dddd, Do MMMM YYYY');
    return transformedDate;
};

const transformTime = (rawDate) => {
    const transformedTime = rawDate.slice(11, 16);
    return transformedTime;
};

const convertKelvinToCelsius = (kelvin) => {
    const celsius = Math.round(kelvin - 273);
    return celsius;
};

const createForecastInterface = async () => {
    try {
        let forecastMessage = 'Weather forecast in Munich';
        const forecast = await getWeatherForecast();

        forecast.map((item, index, array) => {
            const currentDate = array[index].dt_txt.slice(0, 11);
            const previousDate = index === 0 ? 0 : array[index - 1].dt_txt.slice(0, 11);
            const formattedDate = transformDate(item.dt_txt);
            const { temp, feels_like } = item.main;
            const time = transformTime(item.dt_txt);
            const description = item.weather[0].description;
            const tempCels = convertKelvinToCelsius(temp) > 0 ? `+${convertKelvinToCelsius(temp)}` : convertKelvinToCelsius(temp);
            const feelsLikeCels = convertKelvinToCelsius(feels_like) > 0 ? `+${convertKelvinToCelsius(feels_like)}` : convertKelvinToCelsius(feels_like);
           
            if (currentDate !== previousDate) {
                forecastMessage += `\n ${formattedDate} \n ${time} Temperature ${tempCels}, feels like ${feelsLikeCels}, ${description}`;
            }
            else forecastMessage += `  \n ${time} Temperature ${tempCels}, feels like ${feelsLikeCels}, ${description}`;
        }
        );
         
        console.log(forecastMessage);
        return forecastMessage;
    }
    catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    createForecastInterface,
};