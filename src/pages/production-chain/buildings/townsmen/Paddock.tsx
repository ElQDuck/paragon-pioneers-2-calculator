import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import PaddockIcon from '../../../../assets/icons/buildings/townsmen/Paddock.png'
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
import { HORSE_BREEDER_INFO, HorseBreeder } from './HorseBreeder'

const ITERATION_TIME_IN_SECONDS = 360
const PRODUCE_PER_ITERATION = 24 // => Amount of tiles within range
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['Horse', 1]])
export const PADDOCK_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Horse', CONSUME_PER_ITERATION.get('Horse')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Paddock = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={PaddockIcon} alt={Paddock.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <HorseBreeder
            count={props.count * (PADDOCK_INFO.ConsumePerMinute.get('Horse')! / HORSE_BREEDER_INFO.ProducePerMinute)}
          ></HorseBreeder>
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const PaddockButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PaddockIcon}
      buildingElement={Paddock}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
