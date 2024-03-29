import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import BuffaloButcheryIcon from '../../../../assets/icons/buildings/workers/BuffaloButchery.png'
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
import { SALTERN_TROPICAL_INFO, SalternTropical } from '../farmers/SalternTropical'
import { WATER_BUFFALO_RANCH_INFO, WaterBuffaloRanch } from '../farmers/WaterBuffaloRanch'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { SALT_WORKS_NORTH_INFO, SaltWorksNorth } from '../northern-islands/SaltWorksNorth'
import { SALTERN_INFO, Saltern } from '../paragons/Saltern'
import { SALT_WORKS_INFO, SaltWorks } from '../townsmen/SaltWorks'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 6
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Salt', 1],
  ['Buffalo', 2],
])
export const BUFFALO_BUTCHERY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Salt', CONSUME_PER_ITERATION.get('Salt')! / ITERATION_TIME_IN_DECIMAL],
    ['Buffalo', CONSUME_PER_ITERATION.get('Buffalo')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const BuffaloButchery = (props: { count: number }) => {
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
            src={BuffaloButcheryIcon}
            title={capitalCase(BuffaloButchery.name)}
            alt={BuffaloButchery.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <SalternTropical
                count={
                  props.count *
                  (BUFFALO_BUTCHERY_INFO.ConsumePerMinute.get('Salt')! / SALTERN_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <SaltWorks
                count={
                  props.count * (BUFFALO_BUTCHERY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_INFO.ProducePerMinute)
                }
              />,
              <SaltWorksNorth
                count={
                  props.count *
                  (BUFFALO_BUTCHERY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_NORTH_INFO.ProducePerMinute)
                }
              />,
              <Saltern
                count={
                  props.count * (BUFFALO_BUTCHERY_INFO.ConsumePerMinute.get('Salt')! / SALTERN_INFO.ProducePerMinute)
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
          <WaterBuffaloRanch
            count={
              props.count *
              (BUFFALO_BUTCHERY_INFO.ConsumePerMinute.get('Buffalo')! / WATER_BUFFALO_RANCH_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const BuffaloButcheryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={BuffaloButcheryIcon}
      buildingElement={BuffaloButchery}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
