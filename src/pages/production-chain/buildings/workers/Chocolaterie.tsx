import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import ChocolaterieIcon from '../../../../assets/icons/buildings/workers/Chocolaterie.png'
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
import { CACAO_PLANTATION_INFO, CacaoPlantation } from './CacaoPlantation'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { SUGAR_BEET_FARM_INFO, SugarBeetFarm } from '../merchants/SugarBeetFarm'

const ITERATION_TIME_IN_SECONDS = 120
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Sugar', 1],
  ['Cacao', 2],
])
export const CHOCOLATERIE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Sugar', CONSUME_PER_ITERATION.get('Sugar')! / ITERATION_TIME_IN_DECIMAL],
    ['Cacao', CONSUME_PER_ITERATION.get('Cacao')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Chocolaterie = (props: { count: number }) => {
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
            src={ChocolaterieIcon}
            title={capitalCase(Chocolaterie.name)}
            alt={Chocolaterie.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <SugarMill
                count={
                  props.count * (CHOCOLATERIE_INFO.ConsumePerMinute.get('Sugar')! / SUGAR_MILL_INFO.ProducePerMinute)
                }
              />,
              <SugarWindmill
                count={
                  props.count *
                  (CHOCOLATERIE_INFO.ConsumePerMinute.get('Sugar')! / SUGAR_WINDMILL_INFO.ProducePerMinute)
                }
              />,
              <SugarBeetFarm
                count={
                  props.count *
                  (CHOCOLATERIE_INFO.ConsumePerMinute.get('Sugar')! / SUGAR_BEET_FARM_INFO.ProducePerMinute)
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
          <CacaoPlantation
            count={
              props.count * (CHOCOLATERIE_INFO.ConsumePerMinute.get('Cacao')! / CACAO_PLANTATION_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const ChocolaterieButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ChocolaterieIcon}
      buildingElement={Chocolaterie}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
