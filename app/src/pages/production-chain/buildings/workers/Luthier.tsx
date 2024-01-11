import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import LuthierIcon from '../../../../assets/icons/buildings/workers/Luthier.png'
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
import { BRASS_SMELTER_INFO, BrassSmelter } from '../northern-islands/BrassSmelter'
import { FINE_WOOD_LOGGER_INFO, FineWoodLogger } from './FineWoodLogger'

const ITERATION_TIME_IN_SECONDS = 120
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Brass', 1],
  ['FineWood', 2],
])
export const LUTHIER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Brass', CONSUME_PER_ITERATION.get('Brass')! / ITERATION_TIME_IN_DECIMAL],
    ['FineWood', CONSUME_PER_ITERATION.get('FineWood')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Luthier = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={LuthierIcon} alt={Luthier.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <BrassSmelter
            count={props.count * (LUTHIER_INFO.ConsumePerMinute.get('Brass')! / BRASS_SMELTER_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <FineWoodLogger
            count={
              props.count * (LUTHIER_INFO.ConsumePerMinute.get('FineWood')! / FINE_WOOD_LOGGER_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const LuthierButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={LuthierIcon}
      buildingElement={Luthier}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
