import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import PigRanchIcon from '../../../../assets/icons/buildings/pioneers/PigRanch.png'
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
import { Grass } from '../../tiles/Grass'

const ITERATION_TIME_IN_SECONDS = 30
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['Grass', 8]])
const PRODUCE_PER_ITERATION = 1
export const PIG_RANCH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Grass', CONSUME_PER_ITERATION.get('Grass')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PigRanch = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={PigRanchIcon} alt={PigRanch.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Grass count={props.count * PIG_RANCH_INFO.ConsumePerIteration.get('Grass')!}></Grass>
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const PigRanchButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PigRanchIcon}
      buildingElement={PigRanch}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
