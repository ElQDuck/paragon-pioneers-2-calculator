import Box from '@mui/material/Box'
import { capitalCase } from 'change-case'
import GrassNorthIcon from '../../../assets/icons/tiles/GrassNorth.png'
import { BuildingImageSize, SingleBuildingWithCount } from '../../../assets/styling/BuildingStyle'
import { Tile } from '../../../types/Tile'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const PRODUCE_PER_ITERATION = 1
export const GRASS_NORTH_INFO: Tile = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const GrassNorth = (props: { count: number }) => {
  return (
    <Box sx={SingleBuildingWithCount}>
      <Box
        component="img"
        src={GrassNorthIcon}
        title={capitalCase(GrassNorth.name)}
        alt={GrassNorth.name}
        sx={BuildingImageSize}
      />
      {Number(props.count.toFixed(2))}
    </Box>
  )
}
