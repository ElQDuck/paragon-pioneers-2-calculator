import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
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
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={PastryManufactureIcon} alt={PastryManufacture.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Paper elevation={2} sx={ProviderPaperStyle}>
            <Butchery
              count={
                props.count * (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Meat')! / BUTCHERY_INFO.ProducePerMinute)
              }
            />
          </Paper>
          OR
          <Paper elevation={2} sx={ProviderPaperStyle}>
            <BuffaloButchery
              count={
                props.count *
                (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Meat')! / BUFFALO_BUTCHERY_INFO.ProducePerMinute)
              }
            />
          </Paper>
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <FlourMill
            count={
              props.count * (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Flour')! / FLOUR_MILL_INFO.ProducePerMinute)
            }
          />
          OR
          <FlourWindmill
            count={
              props.count *
              (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Flour')! / FLOUR_WINDMILL_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef3} elevation={2} sx={ProviderPaperStyle}>
          <ChickenFarm
            count={
              props.count * (PASTRY_MANUFACTURE_INFO.ConsumePerMinute.get('Egg')! / CHICKEN_FARM_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      {/* TODO: Optimize arrows */}
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
    ></BuildingButton>
  )
}
