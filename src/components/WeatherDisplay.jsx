import { Box, Typography, SvgIcon } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';

const WeatherDisplay = ({ weather }) => {
  return (
    <Box
      sx={{
        mt: 3,
        display: "grid",
        gap: 2,
        textAlign: "center",
      }}>
      <Typography variant="h5" component="h2">
        {weather.city}, {weather.country}
      </Typography>
      <Box
        component="img"
        alt={weather.conditionText}
        src={weather.icon}
        sx={{ margin: "auto", width: "95px" }} />
      <Typography variant="h4" component="h3">
        {weather.temp} °C
      </Typography>
      <Typography variant="h6" component="h4">
        {weather.conditionText}
      </Typography>
      <Box sx={{
        mt: 3,
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
      }}>

        <Box>
          <Typography variant="h6">
            <SvgIcon component={WaterIcon} sx={{ fontSize: 20, margin: '0 5px' }} />
            {weather.humidity}%
          </Typography>
          <Typography variant="text" component="text">
            Humedad
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6">
            <SvgIcon component={AirIcon} sx={{ fontSize: 20, margin: '0 5px' }} />
            {weather.wind} km/h
          </Typography>
          <Typography variant="text" component="text">
            Viento
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default WeatherDisplay;
