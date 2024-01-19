import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import { globalExpertMode } from '../App'

export const AlternativeCombinationProvider = (props: { combinationList: JSX.Element[] }) => {
  return globalExpertMode.value ? (
    props.combinationList.map((building, index) => {
      if (index === props.combinationList.length - 1) {
        return building
      }
      return (
        <>
          {building}
          <>OR</>
        </>
      )
    })
  ) : (
    <Box>
      <Tooltip disableFocusListener title={"Enable 'Expert Mode' to see all possible combinations."}>
        <InfoOutlinedIcon color="inherit" fontSize="small" sx={{ position: 'absolute' }} />
      </Tooltip>
      {props.combinationList[0]}
    </Box>
  )
}
