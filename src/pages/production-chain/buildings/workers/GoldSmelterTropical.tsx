import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import GoldSmelterTropicalIcon from '../../../../assets/icons/buildings/workers/GoldSmelterTropical.png'
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
import { GOLD_MINE_TROPICAL_INFO, GoldMineTropical } from './GoldMineTropical'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { LINSEED_FARM_INFO, LinseedFarm } from '../colonists/LinseedFarm'
import { FIBER_MAKER_INFO, FiberMaker } from '../farmers/FiberMaker'
import { GOLD_MINE_NORTH_INFO, GoldMineNorth } from '../northern-islands/GoldMineNorth'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Fiber', 8],
  ['Gold', 1],
])
export const GOLD_SMELTER_TROPICAL_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Fiber', CONSUME_PER_ITERATION.get('Fiber')! / ITERATION_TIME_IN_DECIMAL],
    ['Gold', CONSUME_PER_ITERATION.get('Gold')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const GoldSmelterTropical = (props: { count: number }) => {
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
            src={GoldSmelterTropicalIcon}
            title={capitalCase(GoldSmelterTropical.name)}
            alt={GoldSmelterTropical.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <FiberMaker
                count={
                  props.count *
                  (GOLD_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Fiber')! / FIBER_MAKER_INFO.ProducePerMinute)
                }
              />,
              <LinseedFarm
                count={
                  props.count *
                  (GOLD_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Fiber')! / LINSEED_FARM_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <GoldMineTropical
                count={
                  props.count *
                  (GOLD_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Gold')! / GOLD_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <GoldMineNorth
                count={
                  props.count *
                  (GOLD_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Gold')! / GOLD_MINE_NORTH_INFO.ProducePerMinute)
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

export const GoldSmelterTropicalButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={GoldSmelterTropicalIcon}
      buildingElement={GoldSmelterTropical}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
