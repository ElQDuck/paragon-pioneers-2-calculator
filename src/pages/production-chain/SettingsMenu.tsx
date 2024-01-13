import Drawer from '@mui/material/Drawer'

export const SettingsMenu = (props: { drawerOpen: boolean; setDrawerOpen: Function }) => {
  return (
    <Drawer anchor="left" open={props.drawerOpen} onClose={() => props.setDrawerOpen(false)}>
      <>Test 1</>
      <>Test 2</>
    </Drawer>
  )
}
