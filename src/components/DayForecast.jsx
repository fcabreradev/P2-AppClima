import { Box, Typography } from '@mui/material';

const DayForecast = ({ dayData }) => {
  return (
    <Box sx={{
        
      mt: 1,
      display: "flex",
      gap: 4,
      justifyContent: "space-around",
      alignItems: "center",
      bgcolor: "grey.200",
      p:1,
    }}>
         <Typography variant="subtitle2" sx={{ fontSize: '1rem' , flex:"0 0 auto"}}>
            {dayData.date}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img
          alt={dayData.conditionText}
          src={dayData.icon}
          sx={{ width: "45px" }}
        />
        <Box>
        <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>
        {dayData.temp_min}°C  |  {dayData.temp_max}°C
        </Typography>
        <Typography>
          {dayData.conditionText}
        </Typography>
      </Box>
      </Box>
    </Box> 
  );
};

export default DayForecast;