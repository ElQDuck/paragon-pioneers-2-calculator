import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { globalExpertMode, globalInvertBuildingChainOrder } from '../App'
import { ProviderPaperStyle } from '../assets/styling/BuildingStyle'

export const AlternativeCombinationProvider = (props: { combinationList: JSX.Element[] }) => {
  return (
    <>
      <Accordion defaultExpanded={globalExpertMode.value}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>{props.combinationList[0]}</AccordionSummary>
        <AccordionDetails
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          {props.combinationList.map((building, index) => {
            if (index !== 0) {
              return (
                <>
                  <>OR</>
                  {building}
                </>
              )
            }
          })}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
