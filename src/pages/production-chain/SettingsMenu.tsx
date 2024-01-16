import Drawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import { SxProps, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { globalInvertBuildingChainOrder, globalNumberInputReadOnly } from '../../App'
import { theme } from '../../assets/styling/Theme'

export const SettingsMenu = (props: { drawerOpen: boolean; setDrawerOpen: Function }) => {
  const [numberInputReadOnlySwitchState, setNumberInputReadOnlySwitchState] = useState<boolean>(
    globalNumberInputReadOnly.value
  )
  const [invertBuildingChainOrderSwitchState, setInvertBuildingChainOrderSwitchState] = useState<boolean>(
    globalInvertBuildingChainOrder.value
  )

  const formControlStyling: SxProps<Theme> = { marginRight: '0.3rem' }
  const popupPosition = useMediaQuery(theme.breakpoints.up('md')) ? 'right' : 'bottom'
  const switchColor = 'default'
  const labelPlacement = 'start'

  const expertModeDescription =
    'Toggle between: showing all possible building combinations / showing only the next possible building.'
  const numberInputReadOnlyDescription =
    'Make the number input field editable. Note: If turned on, the mobile keyboard will popup if the increment/decrement button is pressed.'
  const changeBuildingOrderDescription = 'Toggle how the building order is displayed: left -> right / right -> left'

  return (
    <Drawer anchor="left" open={props.drawerOpen} onClose={() => props.setDrawerOpen(false)}>
      <Tooltip disableFocusListener title={expertModeDescription} placement={popupPosition} arrow>
        <FormControlLabel
          label="Expert Mode"
          labelPlacement={labelPlacement}
          control={<Switch color={switchColor} disabled />}
          sx={formControlStyling}
        />
      </Tooltip>
      <Tooltip disableFocusListener title={numberInputReadOnlyDescription} placement={popupPosition} arrow>
        <FormControlLabel
          label="Disable manual input"
          labelPlacement={labelPlacement}
          control={
            <Switch
              color={switchColor}
              checked={numberInputReadOnlySwitchState}
              onChange={() => {
                globalNumberInputReadOnly.value = !globalNumberInputReadOnly.value
                setNumberInputReadOnlySwitchState(!numberInputReadOnlySwitchState)
              }}
            />
          }
          sx={formControlStyling}
        />
      </Tooltip>
      <Tooltip disableFocusListener title={changeBuildingOrderDescription} placement={popupPosition} arrow>
        <FormControlLabel
          label="Invert building order"
          labelPlacement={labelPlacement}
          control={
            <Switch
              color={switchColor}
              checked={invertBuildingChainOrderSwitchState}
              onChange={() => {
                globalInvertBuildingChainOrder.value = !globalInvertBuildingChainOrder.value
                setInvertBuildingChainOrderSwitchState(!invertBuildingChainOrderSwitchState)
              }}
            />
          }
          sx={formControlStyling}
        />
      </Tooltip>
    </Drawer>
  )
}
