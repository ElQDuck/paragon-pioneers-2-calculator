import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import CaviarFactoryIcon from '../../../../assets/icons/buildings/northern-islands/CaviarFactory.png'
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
import { SALT_WORKS_NORTH_INFO, SaltWorksNorth } from './SaltWorksNorth'
import { STURGEON_FARM_INFO, SturgeonFarm } from './SturgeonFarm'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { SALTERN_TROPICAL_INFO, SalternTropical } from '../farmers/SalternTropical'
import { SALTERN_INFO, Saltern } from '../paragons/Saltern'
import { SALT_WORKS_INFO, SaltWorks } from '../townsmen/SaltWorks'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 6
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Salt', 1],
  ['Sturgeon', 1],
])
export const CAVIAR_FACTORY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Salt', CONSUME_PER_ITERATION.get('Salt')! / ITERATION_TIME_IN_DECIMAL],
    ['Sturgeon', CONSUME_PER_ITERATION.get('Sturgeon')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CaviarFactory = (props: { count: number }) => {
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
            src={CaviarFactoryIcon}
            title={capitalCase(CaviarFactory.name)}
            alt={CaviarFactory.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <SaltWorksNorth
                count={
                  props.count *
                  (CAVIAR_FACTORY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_NORTH_INFO.ProducePerMinute)
                }
              />,
              <SalternTropical
                count={
                  props.count *
                  (CAVIAR_FACTORY_INFO.ConsumePerMinute.get('Salt')! / SALTERN_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <SaltWorks
                count={
                  props.count * (CAVIAR_FACTORY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_INFO.ProducePerMinute)
                }
              />,
              <Saltern
                count={
                  props.count * (CAVIAR_FACTORY_INFO.ConsumePerMinute.get('Salt')! / SALTERN_INFO.ProducePerMinute)
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
          <SturgeonFarm
            count={
              props.count *
              (CAVIAR_FACTORY_INFO.ConsumePerMinute.get('Sturgeon')! / STURGEON_FARM_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const CaviarFactoryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CaviarFactoryIcon}
      buildingElement={CaviarFactory}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
