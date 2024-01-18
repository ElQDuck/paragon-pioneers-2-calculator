import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { signal } from '@preact/signals'
import './App.css'
import { theme } from './assets/styling/Theme'
import { ProductionChainPage } from './pages/production-chain/ProductionChainPage'

export const globalNumberInputReadOnly = signal<boolean>(
  localStorage.getItem('globalNumberInputReadOnly') === 'false' ? false : true
)
export const globalInvertBuildingChainOrder = signal<boolean>(
  localStorage.getItem('globalInvertBuildingChainOrder') === 'true' ? true : false
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ProductionChainPage />
    </ThemeProvider>
  )
}

export default App
