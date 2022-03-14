import { createMuiTheme } from '@material-ui/core'

//#f2f1f1
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f1f2f2',
      paper: '#f5f5f5',
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiContainer: {
      root: {
        borderRadius: 0,
      },
    },
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
})

export default theme
