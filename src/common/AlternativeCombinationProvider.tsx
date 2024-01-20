import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { globalExpertMode } from '../App'

export const AlternativeCombinationProvider = (props: { combinationList: JSX.Element[] }) => {
  return (
    <>
      <Accordion defaultExpanded={globalExpertMode.value}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          {props.combinationList[0]}
        </AccordionSummary>
        <AccordionDetails>
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
