import { SxProps, Theme, createTheme, styled } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#956a3c',
      light: '#ad8f70',
      dark: '#462c15', //675340
    },
    secondary: {
      main: '#93683b',
    },
    background: {
      default: '#ad8d6e',
      paper: '#ad8f70',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.5)',
    },
    divider: '#000000',
    info: {
      main: '#0288d1',
    },
  },
  typography: {
    fontFamily: 'Carter One',
    fontWeightBold: '10',
  },
})

// NumberInput Styling
// https://mui.com/base-ui/react-number-input/
export const StyledInputRoot = styled('div')(
  () => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
)
//#462c15
export const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.5rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.text.primary};
  background: ${theme.palette.primary.main};
  border: 2px solid ${theme.palette.primary.dark};
  border-radius: 4px;
  width: 1.75rem;
  text-align: center;

  &:focus-visible {
    outline: 0;
  }
`
)

export const StyledButton = styled('button')(
  ({ theme }) => `
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 4px;
  border-color: ${theme.palette.primary.dark};
  background: ${theme.palette.primary.main};
  color: ${theme.palette.text.primary};
  height: 1.1rem;
  width: 1.1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
  }

  &.increment {
    order: 1;
  }
`
)

export const ToolbarStyle: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
}
