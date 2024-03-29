import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import PlaningMillIcon from '../../../../assets/icons/buildings/paragons/PlaningMill.png'
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
import { RiverField } from '../../tiles/RiverField'
import { COPPER_SMELTER_INFO, CopperSmelter } from '../colonists/CopperSmelter'
import { IRON_SMELTER_INFO, IronSmelter } from '../merchants/IronSmelter'
import { ZINC_SMELTER_INFO, ZincSmelter } from '../northern-islands/ZincSmelter'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COPPER_SMELTER_TROPICAL_INFO, CopperSmelterTropical } from '../farmers/CopperSmelterTropical'
import { COPPER_SMELTER_NORTH_INFO, CopperSmelterNorth } from '../northern-islands/CopperSmelterNorth'
import { IRON_SMELTER_NORTH_INFO, IronSmelterNorth } from '../northern-islands/IronSmelterNorth'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['ZincIngot', 1],
  ['IronIngot', 1],
  ['CopperIngot', 1],
  ['RiverField', 1],
])
export const PLANING_MILL_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['ZincIngot', CONSUME_PER_ITERATION.get('ZincIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['IronIngot', CONSUME_PER_ITERATION.get('IronIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['CopperIngot', CONSUME_PER_ITERATION.get('CopperIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PlaningMill = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  const providerRef4 = useRef(null)
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
            src={PlaningMillIcon}
            title={capitalCase(PlaningMill.name)}
            alt={PlaningMill.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Paper
          ref={providerRef1}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <ZincSmelter
            count={
              props.count * (PLANING_MILL_INFO.ConsumePerMinute.get('ZincIngot')! / ZINC_SMELTER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <IronSmelter
                count={
                  props.count *
                  (PLANING_MILL_INFO.ConsumePerMinute.get('IronIngot')! / IRON_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <IronSmelterNorth
                count={
                  props.count *
                  (PLANING_MILL_INFO.ConsumePerMinute.get('IronIngot')! / IRON_SMELTER_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef3}>
          <AlternativeCombinationProvider
            combinationList={[
              <CopperSmelter
                count={
                  props.count *
                  (PLANING_MILL_INFO.ConsumePerMinute.get('CopperIngot')! / COPPER_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelterTropical
                count={
                  props.count *
                  (PLANING_MILL_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelterNorth
                count={
                  props.count *
                  (PLANING_MILL_INFO.ConsumePerMinute.get('CopperIngot')! / COPPER_SMELTER_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef4}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RiverField count={props.count * PLANING_MILL_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
      <Arrow start={providerRef4} end={consumerRef} />
    </Box>
  )
}

export const PlaningMillButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PlaningMillIcon}
      buildingElement={PlaningMill}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
