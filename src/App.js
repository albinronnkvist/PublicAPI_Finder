import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      light: purple[300],
      dark: purple[900]
    },
    secondary: {
      main: grey[100],
      light: grey[50],
      dark: grey[200]
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  },
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536 // large screens
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
