import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import RenderingWorksIcon from '../../../../assets/icons/buildings/colonists/RenderingWorks.png'
import {
  BuildingGroup,
  BuildingImageSize,
  ConsumerPaperStyle,
  ProviderBoxStyle,
  ProviderPaperStyle,
  SingleBuildingWithCount,
} from '../../../../assets/styling/BuildingStyle'
import { Arrow } from '../../../../common/Arrow'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'
import { PIG_RANCH_INFO, PigRanch } from '../pioneers/PigRanch'
import { PIGGERY_INFO, Piggery } from '../pioneers/Piggery'

const ITERATION_TIME_IN_SECONDS = 120
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['Pigs', 1]])
const PRODUCE_PER_ITERATION = 1
export const RENDERING_WORKS_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([['Pigs', CONSUME_PER_ITERATION.get('Pigs')! / ITERATION_TIME_IN_DECIMAL]]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const RenderingWorks = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={RenderingWorksIcon} alt={RenderingWorks.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Paper variant="outlined">
            <Piggery
              count={props.count * (RENDERING_WORKS_INFO.ConsumePerMinute.get('Pigs')! / PIGGERY_INFO.ProducePerMinute)}
            ></Piggery>
          </Paper>
          OR
          <Paper variant="outlined">
            <PigRanch
              count={
                props.count * (RENDERING_WORKS_INFO.ConsumePerMinute.get('Pigs')! / PIG_RANCH_INFO.ProducePerMinute)
              }
            ></PigRanch>
          </Paper>
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const RenderingWorksButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={RenderingWorksIcon}
      buildingElement={RenderingWorks}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
