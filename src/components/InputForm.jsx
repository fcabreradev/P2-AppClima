import { Box, TextField } from '@mui/material';
import { LoadingButton } from "@mui/lab";

const InputForm = ({ city, setCity, onSubmit, loading, error }) => {
  return (
    <Box
      sx={{display:"grid", gap:2}}
      component="form"
      onSubmit={onSubmit}>
      <TextField
        id="city"
        label="Ciudad"
        size="small"
        required
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        error={error.error}
        helperText={error.message}/>
      <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        loadingIndicator="Buscando...">
        Buscar
      </LoadingButton>
    </Box>
  );
}

export default InputForm;
