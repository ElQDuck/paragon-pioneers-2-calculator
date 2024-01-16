import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import GoldsmithIcon from '../../../../assets/icons/buildings/merchants/Goldsmith.png'
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
import { GOLD_SMELTER_NORTH_INFO, GoldSmelterNorth } from '../northern-islands/GoldSmelterNorth'
import { CHARCOAL_KILN_INFO, CharcoalKiln } from '../townsmen/CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from '../townsmen/CoalMine'
import { GOLD_PANNER_INFO, GoldPanner } from '../workers/GoldPanner'
import { GOLD_SMELTER_TROPICAL_INFO, GoldSmelterTropical } from '../workers/GoldSmelterTropical'
import { GOLD_SMELTER_INFO, GoldSmelter } from './GoldSmelter'

import { globalInvertBuildingChainOrder } from '../../../../App'

const ITERATION_TIME_IN_SECONDS = 960
const PRODUCE_PER_ITERATION = 8
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['GoldIngot', 2],
])
export const GOLDSMITH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['GoldIngot', CONSUME_PER_ITERATION.get('GoldIngot')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Goldsmith = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={{ ...BuildingGroup, flexDirection: globalInvertBuildingChainOrder.value ? 'row-reverse' : 'row' }}>
      <Paper
        ref={consumerRef}
        elevation={2}
        sx={{
          ...ConsumerPaperStyle,
          marginRight: globalInvertBuildingChainOrder.value ? 0 : '4rem',
          marginLeft: globalInvertBuildingChainOrder.value ? '4rem' : 0,
        }}
      >
        <Box sx={SingleBuildingWithCount}>
          <img src={GoldsmithIcon} alt={Goldsmith.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Paper
          ref={providerRef1}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CoalMine
            count={props.count * (GOLDSMITH_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)}
          />
          OR
          <CharcoalKiln
            count={props.count * (GOLDSMITH_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <GoldSmelter
            count={
              props.count * (GOLDSMITH_INFO.ConsumePerMinute.get('GoldIngot')! / GOLD_SMELTER_INFO.ProducePerMinute)
            }
          />
          OR
          <GoldSmelterNorth
            count={
              props.count *
              (GOLDSMITH_INFO.ConsumePerMinute.get('GoldIngot')! / GOLD_SMELTER_NORTH_INFO.ProducePerMinute)
            }
          />
          OR
          <GoldSmelterTropical
            count={
              props.count *
              (GOLDSMITH_INFO.ConsumePerMinute.get('GoldIngot')! / GOLD_SMELTER_TROPICAL_INFO.ProducePerMinute)
            }
          />
          OR
          <GoldPanner
            count={
              props.count * (GOLDSMITH_INFO.ConsumePerMinute.get('GoldIngot')! / GOLD_PANNER_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const GoldsmithButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={GoldsmithIcon}
      buildingElement={Goldsmith}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
