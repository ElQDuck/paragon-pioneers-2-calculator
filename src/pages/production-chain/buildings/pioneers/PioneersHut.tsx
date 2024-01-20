import Box from '@mui/material/Box'
import PioneersHutIcon from '../../../../assets/icons/buildings/pioneers/PioneersHut.png'
import { BuildingGroup, BuildingImageSize, SingleBuildingWithCount } from '../../../../assets/styling/BuildingStyle'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'

import { globalInvertBuildingChainOrder } from '../../../../App'

const ITERATION_TIME_IN_SECONDS = 60
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([])
const PRODUCE_PER_ITERATION = 0.057
export const PIONEERS_HUT_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PioneersHut = (props: { count: number }) => {
  return (
    <Box sx={{ ...BuildingGroup, flexDirection: globalInvertBuildingChainOrder.value ? 'row-reverse' : 'row' }}>
      <Box sx={SingleBuildingWithCount}>
        <img src={PioneersHutIcon} alt={PioneersHut.name} style={BuildingImageSize} />
        <Box>{Number(props.count.toFixed(2))}</Box>
        <Box>{'@ 100%'}</Box>
      </Box>
    </Box>
  )
}

export const PioneersHutButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PioneersHutIcon}
      buildingElement={PioneersHut}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
