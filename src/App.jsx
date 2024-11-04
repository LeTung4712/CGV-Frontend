import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { LocationProvider } from './contexts/LocationContext';
import AppRouter from './routes/AppRouter';
import "./App.css";
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocationProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
