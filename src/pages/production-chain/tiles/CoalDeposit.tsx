import Box from '@mui/material/Box'
import CoalDepositIcon from '../../../assets/icons/tiles/CoalDeposit.png'
import { BuildingImageSize, SingleBuildingWithCount } from '../../../assets/styling/BuildingStyle'
import { Tile } from '../../../types/Tile'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const PRODUCE_PER_ITERATION = 1
export const COAL_DEPOSIT_INFO: Tile = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CoalDeposit = (props: { count: number }) => {
  return (
    <Box sx={SingleBuildingWithCount}>
      <img src={CoalDepositIcon} alt={CoalDeposit.name} style={BuildingImageSize} />
      {Number(props.count.toFixed(2))}
    </Box>
  )
}
