import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import GlassworksIcon from '../../../../assets/icons/buildings/paragons/Glassworks.png'
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
import { ASH_HOUSE_INFO, AshHouse } from '../colonists/AshHouse'
import { STONECUTTER_INFO, Stonecutter } from '../colonists/Stonecutter'
import { BOULDER_GATHERER_INFO, BoulderGatherer } from '../townsmen/BoulderGatherer'
import { QUARTZ_QUARRY_INFO, QuartzQuarry } from './QuartzQuarry'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Limestone', 1],
  ['Potash', 2],
  ['Quartz', 3],
])
export const GLASSWORKS_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Limestone', CONSUME_PER_ITERATION.get('Limestone')! / ITERATION_TIME_IN_DECIMAL],
    ['Potash', CONSUME_PER_ITERATION.get('Potash')! / ITERATION_TIME_IN_DECIMAL],
    ['Quartz', CONSUME_PER_ITERATION.get('Quartz')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Glassworks = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={GlassworksIcon} alt={Glassworks.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Stonecutter
            count={
              props.count * (GLASSWORKS_INFO.ConsumePerMinute.get('Limestone')! / STONECUTTER_INFO.ProducePerMinute)
            }
          />
          OR
          <BoulderGatherer
            count={
              props.count *
              (GLASSWORKS_INFO.ConsumePerMinute.get('Limestone')! / BOULDER_GATHERER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <AshHouse
            count={props.count * (GLASSWORKS_INFO.ConsumePerMinute.get('Potash')! / ASH_HOUSE_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper ref={providerRef3} elevation={2} sx={ProviderPaperStyle}>
          <QuartzQuarry
            count={
              props.count * (GLASSWORKS_INFO.ConsumePerMinute.get('Quartz')! / QUARTZ_QUARRY_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
    </Box>
  )
}

export const GlassworksButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={GlassworksIcon}
      buildingElement={Glassworks}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
