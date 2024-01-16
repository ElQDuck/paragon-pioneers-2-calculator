import Drawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { theme } from '../../assets/styling/Theme'

export const SettingsMenu = (props: { drawerOpen: boolean; setDrawerOpen: Function }) => {
  const popupPosition = useMediaQuery(theme.breakpoints.up('md')) ? 'right' : 'bottom'
  const switchColor = 'primary'
  const expertModeDescription =
    'Toggle between: showing all possible building combinations / showing only the next possible building.'
  const disableInputFieldDescription =
    'Make the number input field editable. Note: If turned on, the mobile keyboard will popup if the increment/decrement button is pressed.'
  const changeBuildingOrderDescription = 'Toggle how the building order is displayed: left -> right / right -> left'
  return (
    <Drawer anchor="left" open={props.drawerOpen} onClose={() => props.setDrawerOpen(false)}>
      <Tooltip disableFocusListener title={expertModeDescription} placement={popupPosition} arrow>
        <FormControlLabel
          control={<Switch color={switchColor} disabled />}
          label="Expert Mode"
          labelPlacement="start"
        />
      </Tooltip>
      <Tooltip disableFocusListener title={disableInputFieldDescription} placement={popupPosition} arrow>
        <FormControlLabel control={<Switch color={switchColor} />} label="Allow manual input" labelPlacement="start" />
      </Tooltip>
      <Tooltip disableFocusListener title={changeBuildingOrderDescription} placement={popupPosition} arrow>
        <FormControlLabel
          control={<Switch color={switchColor} disabled />}
          label="Invert building order"
          labelPlacement="start"
        />
      </Tooltip>
    </Drawer>
  )
}
