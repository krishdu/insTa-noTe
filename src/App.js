import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import './App.css';
import defaultBackground from './assets/background-default.png';
import BaseLayout from './components/BaseLayout';
import { Provider } from 'react-redux';
import applicationStore from './store/application-store';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[300],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function App() {
  const styles = {
    paperContainer: {
        backgroundImage: `url(${defaultBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          width: '100%',
          height: '100vh',
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <Paper
          style={styles.paperContainer}
        >
          <Provider store={applicationStore}>
            <BaseLayout />
          </Provider>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

export default App;
