import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import IronSmelterNorthIcon from '../../../../assets/icons/buildings/northern-islands/IronSmelterNorth.png'
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
import { COAL_MINE_NORTH_INFO, CoalMineNorth } from './CoalMineNorth'
import { IRON_MINE_NORTH_INFO, IronMineNorth } from './IronMineNorth'

const ITERATION_TIME_IN_SECONDS = 960
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['Iron', 2],
])
export const IRON_SMELTER_NORTH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['Iron', CONSUME_PER_ITERATION.get('Iron')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const IronSmelterNorth = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={IronSmelterNorthIcon} alt={IronSmelterNorth.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <CoalMineNorth
            count={
              props.count *
              (IRON_SMELTER_NORTH_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_NORTH_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <IronMineNorth
            count={
              props.count *
              (IRON_SMELTER_NORTH_INFO.ConsumePerMinute.get('Iron')! / IRON_MINE_NORTH_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const IronSmelterNorthButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={IronSmelterNorthIcon}
      buildingElement={IronSmelterNorth}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
