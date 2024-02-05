import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import CopperSmelterNorthIcon from '../../../../assets/icons/buildings/northern-islands/CopperSmelterNorth.png'
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
import { DEEP_COPPER_MINE_INFO, DeepCopperMine } from '../merchants/DeepCopperMine'
import { CONIFER_LUMBERJACK_INFO, ConiferLumberjack } from './ConiferLumberjack'
import { COPPER_MINE_NORTH_INFO, CopperMineNorth } from './CopperMineNorth'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COPPER_MINE_INFO, CopperMine } from '../colonists/CopperMine'
import { COPPER_MINE_TROPICAL_INFO, CopperMineTropical } from '../farmers/CopperMineTropical'
import { FOREST_WARDENS_CABIN_INFO, ForestWardensCabin } from '../merchants/ForestWardensCabin'
import { LUMBERJACK_INFO, Lumberjack } from '../pioneers/Lumberjack'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Wood', 8],
  ['Copper', 1],
])
export const COPPER_SMELTER_NORTH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Wood', CONSUME_PER_ITERATION.get('Wood')! / ITERATION_TIME_IN_DECIMAL],
    ['Copper', CONSUME_PER_ITERATION.get('Copper')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CopperSmelterNorth = (props: { count: number }) => {
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
            src={CopperSmelterNorthIcon}
            title={capitalCase(CopperSmelterNorth.name)}
            alt={CopperSmelterNorth.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <ConiferLumberjack
                count={
                  props.count *
                  (COPPER_SMELTER_NORTH_INFO.ConsumePerMinute.get('Wood')! / CONIFER_LUMBERJACK_INFO.ProducePerMinute)
                }
              />,
              <Lumberjack
                count={
                  props.count *
                  (COPPER_SMELTER_NORTH_INFO.ConsumePerMinute.get('Wood')! / LUMBERJACK_INFO.ProducePerMinute)
                }
              />,
              <ForestWardensCabin
                count={
                  props.count *
                  (COPPER_SMELTER_NORTH_INFO.ConsumePerMinute.get('Wood')! / FOREST_WARDENS_CABIN_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <CopperMineNorth
                count={
                  props.count *
                  (COPPER_SMELTER_NORTH_INFO.ConsumePerMinute.get('Copper')! / COPPER_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
              <CopperMine
                count={
                  props.count *
                  (COPPER_SMELTER_NORTH_INFO.ConsumePerMinute.get('Copper')! / COPPER_MINE_INFO.ProducePerMinute)
                }
              />,
              <DeepCopperMine
                count={
                  props.count *
                  (COPPER_SMELTER_NORTH_INFO.ConsumePerMinute.get('Copper')! / DEEP_COPPER_MINE_INFO.ProducePerMinute)
                }
              />,
              <CopperMineTropical
                count={
                  props.count *
                  (COPPER_SMELTER_NORTH_INFO.ConsumePerMinute.get('Copper')! /
                    COPPER_MINE_TROPICAL_INFO.ProducePerMinute)
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

export const CopperSmelterNorthButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CopperSmelterNorthIcon}
      buildingElement={CopperSmelterNorth}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
