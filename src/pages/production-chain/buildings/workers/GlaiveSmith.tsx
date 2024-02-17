import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import GlaiveSmithIcon from '../../../../assets/icons/buildings/workers/GlaiveSmith.png'
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
import { GEMSTONE_MINE_INFO, GemstoneMine } from './GemstoneMine'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COPPER_SMELTER_INFO, CopperSmelter } from '../colonists/CopperSmelter'
import { COPPER_SMELTER_TROPICAL_INFO, CopperSmelterTropical } from '../farmers/CopperSmelterTropical'
import { COPPER_SMELTER_NORTH_INFO, CopperSmelterNorth } from '../northern-islands/CopperSmelterNorth'
import { FINE_WOOD_LOGGER_INFO, FineWoodLogger } from './FineWoodLogger'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['FineWood', 1],
  ['Gemstone', 2],
  ['CopperIngot', 1],
])
export const GLAIVE_SMITH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['FineWood', CONSUME_PER_ITERATION.get('FineWood')! / ITERATION_TIME_IN_DECIMAL],
    ['Gemstone', CONSUME_PER_ITERATION.get('Gemstone')! / ITERATION_TIME_IN_DECIMAL],
    ['CopperIngot', CONSUME_PER_ITERATION.get('CopperIngot')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const GlaiveSmith = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
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
            src={GlaiveSmithIcon}
            title={capitalCase(GlaiveSmith.name)}
            alt={GlaiveSmith.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <CopperSmelterTropical
                count={
                  props.count *
                  (GLAIVE_SMITH_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelter
                count={
                  props.count *
                  (GLAIVE_SMITH_INFO.ConsumePerMinute.get('CopperIngot')! / COPPER_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelterNorth
                count={
                  props.count *
                  (GLAIVE_SMITH_INFO.ConsumePerMinute.get('CopperIngot')! / COPPER_SMELTER_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <GemstoneMine
            count={
              props.count * (GLAIVE_SMITH_INFO.ConsumePerMinute.get('Gemstone')! / GEMSTONE_MINE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef3}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <FineWoodLogger
            count={
              props.count *
              (GLAIVE_SMITH_INFO.ConsumePerMinute.get('FineWood')! / FINE_WOOD_LOGGER_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
    </Box>
  )
}

export const GlaiveSmithButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={GlaiveSmithIcon}
      buildingElement={GlaiveSmith}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
