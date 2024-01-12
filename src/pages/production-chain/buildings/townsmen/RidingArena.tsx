import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import RidingArenaIcon from '../../../../assets/icons/buildings/townsmen/RidingArena.png'
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
import { PIONEERS_HUT_INFO, PioneersHut } from '../pioneers/PioneersHut'
import { HORSE_BREEDER_INFO, HorseBreeder } from './HorseBreeder'

const ITERATION_TIME_IN_SECONDS = 900
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Militia', 3],
  ['Horse', 1],
])
export const RIDING_ARENA_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Militia', CONSUME_PER_ITERATION.get('Militia')! / ITERATION_TIME_IN_DECIMAL],
    ['Horse', CONSUME_PER_ITERATION.get('Horse')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const RidingArena = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={RidingArenaIcon} alt={RidingArena.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <PioneersHut
            count={
              props.count * (RIDING_ARENA_INFO.ConsumePerMinute.get('Militia')! / PIONEERS_HUT_INFO.ProducePerMinute)
            }
          ></PioneersHut>
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <HorseBreeder
            count={
              props.count * (RIDING_ARENA_INFO.ConsumePerMinute.get('Horse')! / HORSE_BREEDER_INFO.ProducePerMinute)
            }
          ></HorseBreeder>
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const RidingArenaButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={RidingArenaIcon}
      buildingElement={RidingArena}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
