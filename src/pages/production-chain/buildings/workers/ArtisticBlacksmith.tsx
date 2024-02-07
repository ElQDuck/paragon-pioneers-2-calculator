import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import ArtisticBlacksmithIcon from '../../../../assets/icons/buildings/workers/ArtisticBlacksmith.png'
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
import { GEMSTONE_MINE_INFO, GemstoneMine } from './GemstoneMine'
import { GOLD_PANNER_INFO, GoldPanner } from './GoldPanner'
import { GOLD_SMELTER_TROPICAL_INFO, GoldSmelterTropical } from './GoldSmelterTropical'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { GOLD_SMELTER_INFO, GoldSmelter } from '../merchants/GoldSmelter'

const ITERATION_TIME_IN_SECONDS = 960
const PRODUCE_PER_ITERATION = 4
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['GoldIngot', 1],
  ['Gemstone', 2],
])
export const ARTISTIC_BLACKSMITH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['GoldIngot', CONSUME_PER_ITERATION.get('GoldIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['Gemstone', CONSUME_PER_ITERATION.get('Gemstone')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const ArtisticBlacksmith = (props: { count: number }) => {
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
            src={ArtisticBlacksmithIcon}
            title={capitalCase(ArtisticBlacksmith.name)}
            alt={ArtisticBlacksmith.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <GoldSmelterTropical
                count={
                  props.count *
                  (ARTISTIC_BLACKSMITH_INFO.ConsumePerMinute.get('GoldIngot')! /
                    GOLD_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <GoldPanner
                count={
                  props.count *
                  (ARTISTIC_BLACKSMITH_INFO.ConsumePerMinute.get('GoldIngot')! / GOLD_PANNER_INFO.ProducePerMinute)
                }
              />,
              <GoldSmelterNorth
                count={
                  props.count *
                  (ARTISTIC_BLACKSMITH_INFO.ConsumePerMinute.get('GoldIngot')! /
                    GOLD_SMELTER_NORTH_INFO.ProducePerMinute)
                }
              />,
              <GoldSmelter
                count={
                  props.count *
                  (ARTISTIC_BLACKSMITH_INFO.ConsumePerMinute.get('GoldIngot')! / GOLD_SMELTER_INFO.ProducePerMinute)
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
              props.count *
              (ARTISTIC_BLACKSMITH_INFO.ConsumePerMinute.get('Gemstone')! / GEMSTONE_MINE_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const ArtisticBlacksmithButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ArtisticBlacksmithIcon}
      buildingElement={ArtisticBlacksmith}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
