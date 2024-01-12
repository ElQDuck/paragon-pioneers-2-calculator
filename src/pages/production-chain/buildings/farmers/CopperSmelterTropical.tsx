import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import CopperSmelterTropicalIcon from '../../../../assets/icons/buildings/farmers/CopperSmelterTropical.png'
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
import { DEEP_COPPER_MINE_INFO, DeepCopperMine } from '../merchants/DeepCopperMine'
import { COAL_MINE_TROPICAL_INFO, CoalMineTropical } from './CoalMineTropical'
import { COPPER_MINE_TROPICAL_INFO, CopperMineTropical } from './CopperMineTropical'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['Copper', 1],
])
export const COPPER_SMELTER_TROPICAL_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['Copper', CONSUME_PER_ITERATION.get('Copper')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CopperSmelterTropical = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={CopperSmelterTropicalIcon} alt={CopperSmelterTropical.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <CoalMineTropical
            count={
              props.count *
              (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_TROPICAL_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <CopperMineTropical
            count={
              props.count *
              (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Copper')! /
                COPPER_MINE_TROPICAL_INFO.ProducePerMinute)
            }
          />
          OR
          <DeepCopperMine
            count={
              props.count *
              (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Copper')! / DEEP_COPPER_MINE_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const CopperSmelterTropicalButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CopperSmelterTropicalIcon}
      buildingElement={CopperSmelterTropical}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
