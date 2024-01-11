import IconButton from '@mui/material/IconButton'
import { theme } from '../assets/styling/Theme'

export default function PapulationSelectionButton(props: { iconPath: string; onClick: Function; enabled: Boolean }) {
  return (
    <IconButton
      aria-label="delete"
      sx={{
        display: 'inline-block',
        padding: 1,
        margin: 0.5,
        border: 1,
        borderColor: 'primary.main',
        borderRadius: '8px',
        background: props.enabled ? theme.palette.primary.main : theme.palette.primary.light,
      }}
      onClick={() => props.onClick()}
    >
      <img src={props.iconPath} style={{ width: '4rem' }} />
    </IconButton>
  )
}
