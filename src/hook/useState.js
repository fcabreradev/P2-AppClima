import { useState } from 'react';

export const useCityState = () => {
  const [city, setCity] = useState("");
  return [ city, setCity ];
}

export const useWeatherState = () => {
const [weather, setWeather] = useState({
    city:"",
    country:"",
    temp:"",
    condition:"",
    icon:"",
    conditionText:"",
    humidity:"",
    wind:"",
  });
  return [ weather, setWeather ];
}

export const usePronosticState = () => {
  const [pronostic, setPronostic] = useState({
    day1: {
      temp_min:"",
      temp_max:"",
      icon:"",
      conditionText:"",
      rain:"",
    },
    day2: {
      temp_min:"",
      temp_max:"",
      icon:"",
      conditionText:"",
      rain:"",
    },
    day3: {
      temp_min:"",
      temp_max:"",
      icon:"",
      conditionText:"",
      rain:"",
    },
  });
  return [ pronostic, setPronostic ];
}

export const useErrorState = () => {
const [error, setError] = useState({
    error:false,
    message:"",
  })
return [ error, setError ]
}