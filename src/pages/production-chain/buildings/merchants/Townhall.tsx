import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import TownhallIcon from '../../../../assets/icons/buildings/merchants/Townhall.png'
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
import { APIARY_INFO, Apiary } from './Apiary'

const ITERATION_TIME_IN_SECONDS = 80
const PRODUCE_PER_ITERATION = 24 // => Amount of buildings within range
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['Honeycomb', 1]])
export const TOWNHALL_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Honeycomb', CONSUME_PER_ITERATION.get('Honeycomb')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Townhall = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={TownhallIcon} alt={Townhall.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Apiary
            count={props.count * (TOWNHALL_INFO.ConsumePerMinute.get('Honeycomb')! / APIARY_INFO.ProducePerMinute)}
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const TownhallButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={TownhallIcon}
      buildingElement={Townhall}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
