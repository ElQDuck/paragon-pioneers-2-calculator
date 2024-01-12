import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import SalmonFishermansHutIcon from '../../../../assets/icons/buildings/northern-islands/SalmonFishermansHut.png'
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
import { CoastalFieldNorth } from '../../tiles/CoastalFieldNorth'
import { Weir } from '../../tiles/Weir'

const ITERATION_TIME_IN_SECONDS = 45
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['CoastalField', 4]])
export const SALMON_FISHERMANS_HUT_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['CoastalField', CONSUME_PER_ITERATION.get('CoastalField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const SalmonFishermansHut = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={SalmonFishermansHutIcon} alt={SalmonFishermansHut.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <CoastalFieldNorth
            count={props.count * SALMON_FISHERMANS_HUT_INFO.ConsumePerIteration.get('CoastalField')!}
          />
          OR
          <Weir count={(props.count * SALMON_FISHERMANS_HUT_INFO.ConsumePerIteration.get('CoastalField')!) / 2} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const SalmonFishermansHutButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={SalmonFishermansHutIcon}
      buildingElement={SalmonFishermansHut}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
