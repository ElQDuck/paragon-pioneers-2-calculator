import Box from '@mui/material/Box'
import { capitalCase } from 'change-case'
import CliffIcon from '../../../assets/icons/tiles/Cliff.png'
import { BuildingImageSize, SingleBuildingWithCount } from '../../../assets/styling/BuildingStyle'
import { Tile } from '../../../types/Tile'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const PRODUCE_PER_ITERATION = 1
export const CLIFF_INFO: Tile = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Cliff = (props: { count: number }) => {
  return (
    <Box sx={SingleBuildingWithCount}>
      <Box component="img" src={CliffIcon} title={capitalCase(Cliff.name)} alt={Cliff.name} sx={BuildingImageSize} />
      {Number(props.count.toFixed(2))}
    </Box>
  )
}
