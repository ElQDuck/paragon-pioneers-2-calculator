import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import HoneyDistilleryIcon from '../../../../assets/icons/buildings/paragons/HoneyDistillery.png'
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
import { APIARY_INFO, Apiary } from '../merchants/Apiary'
import { BRANDY_DISTILLERY_INFO, BrandyDistillery } from '../merchants/BrandyDistillery'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Honey', 1],
  ['Brandy', 1],
])
export const HONEY_DISTILLERY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Honey', CONSUME_PER_ITERATION.get('Honey')! / ITERATION_TIME_IN_DECIMAL],
    ['Brandy', CONSUME_PER_ITERATION.get('Brandy')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const HoneyDistillery = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={HoneyDistilleryIcon} alt={HoneyDistillery.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Apiary
            count={props.count * (HONEY_DISTILLERY_INFO.ConsumePerMinute.get('Honey')! / APIARY_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <BrandyDistillery
            count={
              props.count *
              (HONEY_DISTILLERY_INFO.ConsumePerMinute.get('Brandy')! / BRANDY_DISTILLERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const HoneyDistilleryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={HoneyDistilleryIcon}
      buildingElement={HoneyDistillery}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
