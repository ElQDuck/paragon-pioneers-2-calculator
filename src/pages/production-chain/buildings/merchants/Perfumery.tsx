import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import PerfumeryIcon from '../../../../assets/icons/buildings/merchants/Perfumery.png'
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
import { AMBERGRIS_PRODUCTION_INFO, AmbergrisProduction } from '../northern-islands/AmbergrisProduction'
import { BRANDY_DISTILLERY_INFO, BrandyDistillery } from './BrandyDistillery'
import { ESSENCE_DISTILLERY_INFO, EssenceDistillery } from './EssenceDistillery'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 10
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Ambergris', 1],
  ['Brandy', 2],
  ['RoseWater', 2],
])
export const PERFUMERY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Ambergris', CONSUME_PER_ITERATION.get('Ambergris')! / ITERATION_TIME_IN_DECIMAL],
    ['Brandy', CONSUME_PER_ITERATION.get('Brandy')! / ITERATION_TIME_IN_DECIMAL],
    ['RoseWater', CONSUME_PER_ITERATION.get('RoseWater')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Perfumery = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={PerfumeryIcon} alt={Perfumery.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <AmbergrisProduction
            count={
              props.count *
              (PERFUMERY_INFO.ConsumePerMinute.get('Ambergris')! / AMBERGRIS_PRODUCTION_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <BrandyDistillery
            count={
              props.count * (PERFUMERY_INFO.ConsumePerMinute.get('Brandy')! / BRANDY_DISTILLERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef3} elevation={2} sx={ProviderPaperStyle}>
          <EssenceDistillery
            count={
              props.count *
              (PERFUMERY_INFO.ConsumePerMinute.get('RoseWater')! / ESSENCE_DISTILLERY_INFO.ProducePerMinute)
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

export const PerfumeryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PerfumeryIcon}
      buildingElement={Perfumery}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
