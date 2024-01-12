import Box from '@mui/material/Box'
import PalmTreesIcon from '../../../assets/icons/tiles/PalmTrees.png'
import { BuildingImageSize, SingleBuildingWithCount } from '../../../assets/styling/BuildingStyle'
import { Tile } from '../../../types/Tile'

const ITERATION_TIME_IN_SECONDS = 360
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
// TODO: Tree producion depends on amount of trees on tile. Solution: Add smal tile selector so the user can select with how much trees per tile he wants to calculate.
const PRODUCE_PER_ITERATION = 2
export const PALM_TREES_INFO: Tile = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PalmTrees = (props: { count: number }) => {
  return (
    <Box sx={SingleBuildingWithCount}>
      <img src={PalmTreesIcon} alt={PalmTrees.name} style={BuildingImageSize} />
      {Number(props.count.toFixed(2))}
    </Box>
  )
}
