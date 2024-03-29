import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import BrocadeSpinningFactoryIcon from '../../../../assets/icons/buildings/paragons/BrocadeSpinningFactory.png'
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
import { GOLD_SMELTER_INFO, GoldSmelter } from '../merchants/GoldSmelter'
import { GOLD_PANNER_INFO, GoldPanner } from '../workers/GoldPanner'
import { SILK_TWINE_MILL_INFO, SilkTwineMill } from '../workers/SilkTwineMill'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { GOLD_SMELTER_NORTH_INFO, GoldSmelterNorth } from '../northern-islands/GoldSmelterNorth'
import { GOLD_SMELTER_TROPICAL_INFO, GoldSmelterTropical } from '../workers/GoldSmelterTropical'

const ITERATION_TIME_IN_SECONDS = 60
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['GoldIngot', 1],
  ['SilkFabric', 1],
  ['RiverField', 1],
])
export const BROCADE_SPINNING_FACTORY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['GoldIngot', CONSUME_PER_ITERATION.get('GoldIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['SilkFabric', CONSUME_PER_ITERATION.get('SilkFabric')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const BrocadeSpinningFactory = (props: { count: number }) => {
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
            src={BrocadeSpinningFactoryIcon}
            title={capitalCase(BrocadeSpinningFactory.name)}
            alt={BrocadeSpinningFactory.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <GoldSmelter
                count={
                  props.count *
                  (BROCADE_SPINNING_FACTORY_INFO.ConsumePerMinute.get('GoldIngot')! /
                    GOLD_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <GoldSmelterTropical
                count={
                  props.count *
                  (BROCADE_SPINNING_FACTORY_INFO.ConsumePerMinute.get('GoldIngot')! /
                    GOLD_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <GoldPanner
                count={
                  props.count *
                  (BROCADE_SPINNING_FACTORY_INFO.ConsumePerMinute.get('GoldIngot')! / GOLD_PANNER_INFO.ProducePerMinute)
                }
              />,
              <GoldSmelterNorth
                count={
                  props.count *
                  (BROCADE_SPINNING_FACTORY_INFO.ConsumePerMinute.get('GoldIngot')! /
                    GOLD_SMELTER_NORTH_INFO.ProducePerMinute)
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
          <SilkTwineMill
            count={
              props.count *
              (BROCADE_SPINNING_FACTORY_INFO.ConsumePerMinute.get('SilkFabric')! /
                SILK_TWINE_MILL_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef3}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RiverField count={props.count * BROCADE_SPINNING_FACTORY_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
    </Box>
  )
}

export const BrocadeSpinningFactoryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={BrocadeSpinningFactoryIcon}
      buildingElement={BrocadeSpinningFactory}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
