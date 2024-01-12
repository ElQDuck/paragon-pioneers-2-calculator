import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import PipemakersShopIcon from '../../../../assets/icons/buildings/merchants/PipemakersShop.png'
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
import { FINE_WOOD_LOGGER_INFO, FineWoodLogger } from '../workers/FineWoodLogger'
import { CURING_HOUSE_INFO, CuringHouse } from './CuringHouse'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 4
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['FineWood', 1],
  ['PipeTobacco', 2],
])
export const PIPEMAKERS_SHOP_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['FineWood', CONSUME_PER_ITERATION.get('FineWood')! / ITERATION_TIME_IN_DECIMAL],
    ['PipeTobacco', CONSUME_PER_ITERATION.get('PipeTobacco')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PipemakersShop = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={PipemakersShopIcon} alt={PipemakersShop.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <FineWoodLogger
            count={
              props.count *
              (PIPEMAKERS_SHOP_INFO.ConsumePerMinute.get('FineWood')! / FINE_WOOD_LOGGER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <CuringHouse
            count={
              props.count *
              (PIPEMAKERS_SHOP_INFO.ConsumePerMinute.get('PipeTobacco')! / CURING_HOUSE_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const PipemakersShopButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PipemakersShopIcon}
      buildingElement={PipemakersShop}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
