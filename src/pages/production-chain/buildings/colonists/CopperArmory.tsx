import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import CopperArmoryIcon from '../../../../assets/icons/buildings/colonists/CopperArmory.png'
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
import { LUMBERJACK_INFO, Lumberjack } from '../pioneers/Lumberjack'
import { COPPER_SMELTER_INFO, CopperSmelter } from './CopperSmelter'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COPPER_SMELTER_TROPICAL_INFO, CopperSmelterTropical } from '../farmers/CopperSmelterTropical'
import { FOREST_WARDENS_CABIN_INFO, ForestWardensCabin } from '../merchants/ForestWardensCabin'
import { CONIFER_LUMBERJACK_INFO, ConiferLumberjack } from '../northern-islands/ConiferLumberjack'
import { COPPER_SMELTER_NORTH_INFO, CopperSmelterNorth } from '../northern-islands/CopperSmelterNorth'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Wood', 4],
  ['CopperIngot', 1],
])
export const COPPER_ARMORY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Wood', CONSUME_PER_ITERATION.get('Wood')! / ITERATION_TIME_IN_DECIMAL],
    ['CopperIngot', CONSUME_PER_ITERATION.get('CopperIngot')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CopperArmory = (props: { count: number }) => {
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
            src={CopperArmoryIcon}
            title={capitalCase(CopperArmory.name)}
            alt={CopperArmory.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <Lumberjack
                count={
                  props.count * (COPPER_ARMORY_INFO.ConsumePerMinute.get('Wood')! / LUMBERJACK_INFO.ProducePerMinute)
                }
              />,
              <ConiferLumberjack
                count={
                  props.count *
                  (COPPER_ARMORY_INFO.ConsumePerMinute.get('Wood')! / CONIFER_LUMBERJACK_INFO.ProducePerMinute)
                }
              />,
              <ForestWardensCabin
                count={
                  props.count *
                  (COPPER_ARMORY_INFO.ConsumePerMinute.get('Wood')! / FOREST_WARDENS_CABIN_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <CopperSmelter
                count={
                  props.count *
                  (COPPER_ARMORY_INFO.ConsumePerMinute.get('CopperIngot')! / COPPER_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelterTropical
                count={
                  props.count *
                  (COPPER_ARMORY_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelterNorth
                count={
                  props.count *
                  (COPPER_ARMORY_INFO.ConsumePerMinute.get('CopperIngot')! / COPPER_SMELTER_NORTH_INFO.ProducePerMinute)
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

export const CopperArmoryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CopperArmoryIcon}
      buildingElement={CopperArmory}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
