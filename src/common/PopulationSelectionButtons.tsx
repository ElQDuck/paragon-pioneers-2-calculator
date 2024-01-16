import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { theme } from '../assets/styling/Theme'

export default function PopulationSelectionButton(props: { iconPath: string; onClick: Function; enabled: Boolean }) {
  return (
    <IconButton
      aria-label="delete"
      sx={{
        display: 'inline-block',
        padding: { xs: 0, md: 1 },
        margin: { xs: 0, md: 0.25 },
        border: { xs: 0, md: 1 },
        borderColor: { xs: 'primary.main', md: 'primary.main' },
        borderRadius: { xs: '4px', md: '8px' },
        background: props.enabled ? theme.palette.primary.light : theme.palette.primary.main,
      }}
      onClick={() => props.onClick()}
    >
      <Box component="img" src={props.iconPath} sx={{ height: { xs: '2rem', md: '3rem' } }} />
    </IconButton>
  )
}
