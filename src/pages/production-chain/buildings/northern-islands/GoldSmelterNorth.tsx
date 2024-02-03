import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import GoldSmelterNorthIcon from '../../../../assets/icons/buildings/northern-islands/GoldSmelterNorth.png'
import {
  BuildingGroup,
  BuildingImageSize,
  ConsumerPaperStyle,
  ProviderBoxStyle,
  SingleBuildingWithCount,
} from '../../../../assets/styling/BuildingStyle'
import { Arrow } from '../../../../common/Arrow'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'
import { COAL_MINE_NORTH_INFO, CoalMineNorth } from './CoalMineNorth'
import { GOLD_MINE_NORTH_INFO, GoldMineNorth } from './GoldMineNorth'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COAL_MINE_TROPICAL_INFO, CoalMineTropical } from '../farmers/CoalMineTropical'
import { CHARCOAL_KILN_INFO, CharcoalKiln } from '../townsmen/CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from '../townsmen/CoalMine'
import { GOLD_MINE_TROPICAL_INFO, GoldMineTropical } from '../workers/GoldMineTropical'

const ITERATION_TIME_IN_SECONDS = 960
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['Gold', 2],
])
export const GOLD_SMELTER_NORTH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['Gold', CONSUME_PER_ITERATION.get('Gold')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const GoldSmelterNorth = (props: { count: number }) => {
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
          <Box
            component="img"
            src={GoldSmelterNorthIcon}
            title={capitalCase(GoldSmelterNorth.name)}
            alt={GoldSmelterNorth.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <CoalMineNorth
                count={
                  props.count *
                  (GOLD_SMELTER_NORTH_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
              <CoalMine
                count={
                  props.count *
                  (GOLD_SMELTER_NORTH_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)
                }
              />,
              <CharcoalKiln
                count={
                  props.count *
                  (GOLD_SMELTER_NORTH_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)
                }
              />,
              <CoalMineTropical
                count={
                  props.count *
                  (GOLD_SMELTER_NORTH_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <GoldMineNorth
                count={
                  props.count *
                  (GOLD_SMELTER_NORTH_INFO.ConsumePerMinute.get('Gold')! / GOLD_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
              <GoldMineTropical
                count={
                  props.count *
                  (GOLD_SMELTER_NORTH_INFO.ConsumePerMinute.get('Gold')! / GOLD_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const GoldSmelterNorthButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={GoldSmelterNorthIcon}
      buildingElement={GoldSmelterNorth}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
