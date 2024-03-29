import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import PastryManufactureIcon from '../../../../assets/icons/buildings/merchants/PastryManufacture.png'
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
import { FLOUR_MILL_INFO, FlourMill } from '../colonists/FlourMill'
import { FLOUR_WINDMILL_INFO, FlourWindmill } from '../colonists/FlourWindmill'
import { BUFFALO_BUTCHERY_INFO, BuffaloButchery } from '../workers/BuffaloButchery'
import { BUTCHERY_INFO, Butchery } from './Butchery'
import { CHICKEN_FARM_INFO, ChickenFarm } from './ChickenFarm'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 4
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Meat', 2],
  ['Flour', 1],
  ['Egg', 3],
])
export const PASTRY_MANUFACTURE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Meat', CONSUME_PER_ITERATION.get('Meat')! / ITERATION_TIME_IN_DECIMAL],
    ['Flour', CONSUME_PER_ITERATION.get('Flour')! / ITERATION_TIME_IN_DECIMAL],
    ['Egg', CONSUME_PER_ITERATION.get('Egg')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PastryManufacture = (props: { count: number }) => {
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
            src={PastryManufactureIcon}
            title={capitalCase(PastryManufacture.name)}
            alt={PastryManufacture.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <Butchery
                count={
                  props.count * (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Meat')! / BUTCHERY_INFO.ProducePerMinute)
                }
              />,
              <BuffaloButchery
                count={
                  props.count *
                  (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Meat')! / BUFFALO_BUTCHERY_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <FlourMill
                count={
                  props.count *
                  (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Flour')! / FLOUR_MILL_INFO.ProducePerMinute)
                }
              />,
              <FlourWindmill
                count={
                  props.count *
                  (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Flour')! / FLOUR_WINDMILL_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef3}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <ChickenFarm
            count={
              props.count * (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Egg')! / CHICKEN_FARM_INFO.ProducePerMinute)
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

export const PastryManufactureButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PastryManufactureIcon}
      buildingElement={PastryManufacture}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
