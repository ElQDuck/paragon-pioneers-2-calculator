import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import JamMakerIcon from '../../../../assets/icons/buildings/townsmen/JamMaker.png'
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
import { SUGAR_MILL_INFO, SugarMill } from '../farmers/SugarMill'
import { SUGAR_WINDMILL_INFO, SugarWindmill } from '../farmers/SugarWindmill'
import { SUGAR_BEET_FARM_INFO, SugarBeetFarm } from '../merchants/SugarBeetFarm'
import { STRAWBERRY_FARM_INFO, StrawberryFarm } from './StrawberryFarm'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'

const ITERATION_TIME_IN_SECONDS = 720
const PRODUCE_PER_ITERATION = 4
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Sugar', 1],
  ['Strawberry', 4],
])
export const JAM_MAKER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Sugar', CONSUME_PER_ITERATION.get('Sugar')! / ITERATION_TIME_IN_DECIMAL],
    ['Strawberry', CONSUME_PER_ITERATION.get('Strawberry')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const JamMaker = (props: { count: number }) => {
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
          <img src={JamMakerIcon} alt={JamMaker.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <SugarMill
                count={props.count * (JAM_MAKER_INFO.ConsumePerMinute.get('Sugar')! / SUGAR_MILL_INFO.ProducePerMinute)}
              />,
              <SugarWindmill
                count={
                  props.count * (JAM_MAKER_INFO.ConsumePerMinute.get('Sugar')! / SUGAR_WINDMILL_INFO.ProducePerMinute)
                }
              />,
              <SugarBeetFarm
                count={
                  props.count * (JAM_MAKER_INFO.ConsumePerMinute.get('Sugar')! / SUGAR_BEET_FARM_INFO.ProducePerMinute)
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
          <StrawberryFarm
            count={
              props.count * (JAM_MAKER_INFO.ConsumePerMinute.get('Strawberry')! / STRAWBERRY_FARM_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const JamMakerButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={JamMakerIcon}
      buildingElement={JamMaker}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
