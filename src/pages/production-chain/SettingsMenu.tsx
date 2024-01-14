import Drawer from '@mui/material/Drawer'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const SettingsMenu = (props: { drawerOpen: boolean; setDrawerOpen: Function }) => {
  const switchColor = "primary"
  return (
    <Drawer anchor="left" open={props.drawerOpen} onClose={() => props.setDrawerOpen(false)}>
    <FormControlLabel
        control={<Switch color={switchColor} />}
        label="Expert Mode"
        labelPlacement="start"
      />
      <FormControlLabel
          control={<Switch color={switchColor} />}
          label="Allow manual number input"
          labelPlacement="start"
        />
    </Drawer>
  )
}
