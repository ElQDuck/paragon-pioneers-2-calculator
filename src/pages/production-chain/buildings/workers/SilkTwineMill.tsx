import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import SilkTwineMillIcon from '../../../../assets/icons/buildings/workers/SilkTwineMill.png'
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
import { RiverFieldTropical } from '../../tiles/RiverFieldTropical'
import { SILK_PLANTATION_INFO, SilkPlantation } from './SilkPlantation'

const ITERATION_TIME_IN_SECONDS = 120
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Silk', 2],
  ['RiverField', 1],
])
export const SILK_TWINE_MILL_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Silk', CONSUME_PER_ITERATION.get('Silk')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const SilkTwineMill = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={SilkTwineMillIcon} alt={SilkTwineMill.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <SilkPlantation
            count={
              props.count * (SILK_TWINE_MILL_INFO.ConsumePerMinute.get('Silk')! / SILK_PLANTATION_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        {/* TODO: Add river field to all buildings which need to be build on top of*/}
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <RiverFieldTropical count={props.count * SILK_TWINE_MILL_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const SilkTwineMillButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={SilkTwineMillIcon}
      buildingElement={SilkTwineMill}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
