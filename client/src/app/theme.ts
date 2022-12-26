import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
  palette: {
    primary: {
      main: '#28ABE3',
      light: '#BBE1FA',
      dark: '#1B262C',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
