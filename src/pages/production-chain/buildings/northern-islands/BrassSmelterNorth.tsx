import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import BrassSmelterNorthIcon from '../../../../assets/icons/buildings/northern-islands/BrassSmelterNorth.png'
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
import { COPPER_SMELTER_NORTH_INFO, CopperSmelterNorth } from './CopperSmelterNorth'
import { ZINC_SMELTER_INFO, ZincSmelter } from './ZincSmelter'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COPPER_SMELTER_INFO, CopperSmelter } from '../colonists/CopperSmelter'
import { COPPER_SMELTER_TROPICAL_INFO, CopperSmelterTropical } from '../farmers/CopperSmelterTropical'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 5
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['CopperIngot', 3],
  ['ZincIngot', 2],
])
export const BRASS_SMELTER_NORTH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['CopperIngot', CONSUME_PER_ITERATION.get('CopperIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['ZincIngot', CONSUME_PER_ITERATION.get('ZincIngot')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const BrassSmelterNorth = (props: { count: number }) => {
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
            src={BrassSmelterNorthIcon}
            title={capitalCase(BrassSmelterNorth.name)}
            alt={BrassSmelterNorth.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <CopperSmelterNorth
                count={
                  props.count *
                  (BRASS_SMELTER_NORTH_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_NORTH_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelter
                count={
                  props.count *
                  (BRASS_SMELTER_NORTH_INFO.ConsumePerMinute.get('CopperIngot')! / COPPER_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelterTropical
                count={
                  props.count *
                  (BRASS_SMELTER_NORTH_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_TROPICAL_INFO.ProducePerMinute)
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
          <ZincSmelter
            count={
              props.count *
              (BRASS_SMELTER_NORTH_INFO.ConsumePerMinute.get('ZincIngot')! / ZINC_SMELTER_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const BrassSmelterNorthButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={BrassSmelterNorthIcon}
      buildingElement={BrassSmelterNorth}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
