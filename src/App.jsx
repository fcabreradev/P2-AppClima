import { Box, Container, Typography} from "@mui/material";
import { useState } from "react";
import DayForecast from './components/DayForecast';
import InputForm from "./components/InputForm";
import WeatherDisplay from "./components/WeatherDisplay";
import { useCityState, useWeatherState, usePronosticState, useErrorState } from "./hook/useState";

export default function App() {

  const [city, setCity] = useCityState();
  const [weather, setWeather] = useWeatherState();
  const [pronostic, setPronostic] = usePronosticState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useErrorState()

  const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`
  
  const API_WEATHER_PRONOSTIC = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=${city}&days=3&aqi=no&alerts=no`

  const getDayOfWeek = (unixTimestamp) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date(unixTimestamp * 1000); 
    date.setDate(date.getDate() + 1);
    const dayIndex = date.getDay(); 
    return daysOfWeek[dayIndex];
  };

  const onSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    setError({
      error:false,
      message:"",
    });
    try {
      if(!city.trim()) throw {message: "El campo ciudad es obligatorio"}
      const response = await fetch (API_WEATHER+city);
      const data = await response.json();
      
      if (data.error) throw {message: data.error.message};

      const pronosticResponse = await fetch(API_WEATHER_PRONOSTIC);
      const pronosticData = await pronosticResponse.json();
      
      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
      });

      setPronostic({
        day1: {
          date: "Hoy",
          icon: pronosticData.forecast.forecastday[0].day.condition.icon,
          conditionText: pronosticData.forecast.forecastday[0].day.condition.text,
          rain: pronosticData.forecast.forecastday[0].day.daily_chance_of_rain,
          temp_min: pronosticData.forecast.forecastday[0].day.mintemp_c,
          temp_max: pronosticData.forecast.forecastday[0].day.maxtemp_c,
        },
        day2: {
          date: getDayOfWeek(pronosticData.forecast.forecastday[1].date_epoch),
          icon: pronosticData.forecast.forecastday[1].day.condition.icon,
          conditionText: pronosticData.forecast.forecastday[1].day.condition.text,
          rain: pronosticData.forecast.forecastday[1].day.daily_chance_of_rain,
          temp_min: pronosticData.forecast.forecastday[1].day.mintemp_c,
          temp_max: pronosticData.forecast.forecastday[1].day.maxtemp_c,
        },
        day3: {
          date: getDayOfWeek(pronosticData.forecast.forecastday[2].date_epoch),
          icon: pronosticData.forecast.forecastday[2].day.condition.icon,
          conditionText: pronosticData.forecast.forecastday[2].day.condition.text,
          rain: pronosticData.forecast.forecastday[2].day.daily_chance_of_rain,
          temp_min: pronosticData.forecast.forecastday[2].day.mintemp_c,
          temp_max: pronosticData.forecast.forecastday[2].day.maxtemp_c,
        },
      });

    } catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false)
    }
  }

  return(
    <Container 
      maxWidth="xs"
      sx={{mt:3 , mb:3}}>

      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{mb:4}}
        >Clima App
      </Typography>

      <InputForm
        city={city} 
        setCity={setCity} 
        onSubmit={onSubmit} 
        loading={loading} 
        error={error} >
      </InputForm>

      {weather.city && (
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}>
          <WeatherDisplay weather={weather} />
          <DayForecast dayData={pronostic.day1}/>  
          <DayForecast dayData={pronostic.day2}/>
          <DayForecast dayData={pronostic.day3}/>
        </Box>
      )}
    </Container>
  );
}