import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import { theme } from './assets/styling/Theme'
import { ProductionChainPage } from './pages/production-chain/ProductionChainPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ProductionChainPage />
    </ThemeProvider>
  )
}

export default App
