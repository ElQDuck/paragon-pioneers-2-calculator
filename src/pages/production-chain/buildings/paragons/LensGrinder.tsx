import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import LensGrinderIcon from '../../../../assets/icons/buildings/paragons/LensGrinder.png'
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
import { GLASSWORKS_INFO, Glassworks } from './Glassworks'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { BRASS_SMELTER_NORTH_INFO, BrassSmelterNorth } from '../northern-islands/BrassSmelterNorth'
import { BRASS_SMELTER_TROPICAL_INFO, BrassSmelterTropical } from '../workers/BrassSmelterTropical'
import { BRASS_SMELTER_INFO, BrassSmelter } from './BrassSmelter'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 8
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Brass', 1],
  ['Glass', 4],
])
export const LENS_GRINDER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Brass', CONSUME_PER_ITERATION.get('Brass')! / ITERATION_TIME_IN_DECIMAL],
    ['Glass', CONSUME_PER_ITERATION.get('Glass')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const LensGrinder = (props: { count: number }) => {
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
            src={LensGrinderIcon}
            title={capitalCase(LensGrinder.name)}
            alt={LensGrinder.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <BrassSmelter
                count={
                  props.count * (LENS_GRINDER_INFO.ConsumePerMinute.get('Brass')! / BRASS_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <BrassSmelterTropical
                count={
                  props.count *
                  (LENS_GRINDER_INFO.ConsumePerMinute.get('Brass')! / BRASS_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <BrassSmelterNorth
                count={
                  props.count *
                  (LENS_GRINDER_INFO.ConsumePerMinute.get('Brass')! / BRASS_SMELTER_NORTH_INFO.ProducePerMinute)
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
          <Glassworks
            count={props.count * (LENS_GRINDER_INFO.ConsumePerMinute.get('Glass')! / GLASSWORKS_INFO.ProducePerMinute)}
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const LensGrinderButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={LensGrinderIcon}
      buildingElement={LensGrinder}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
