import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import SailmakerIcon from '../../../../assets/icons/buildings/townsmen/Sailmaker.png'
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
import { ROPERY_INFO, Ropery } from '../colonists/Ropery'
import { SHEEP_FARM_INFO, SheepFarm } from '../colonists/SheepFarm'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Rope', 1],
  ['Yarn', 2],
])
export const SAILMAKER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Rope', CONSUME_PER_ITERATION.get('Rope')! / ITERATION_TIME_IN_DECIMAL],
    ['Yarn', CONSUME_PER_ITERATION.get('Yarn')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Sailmaker = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={SailmakerIcon} alt={Sailmaker.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <Ropery
            count={props.count * (SAILMAKER_INFO.ConsumePerMinute.get('Rope')! / ROPERY_INFO.ProducePerMinute)}
          ></Ropery>
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <SheepFarm
            count={props.count * (SAILMAKER_INFO.ConsumePerMinute.get('Yarn')! / SHEEP_FARM_INFO.ProducePerMinute)}
          ></SheepFarm>
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const SailmakerButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={SailmakerIcon}
      buildingElement={Sailmaker}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
