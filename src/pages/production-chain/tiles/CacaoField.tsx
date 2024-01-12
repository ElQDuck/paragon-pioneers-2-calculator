import Box from '@mui/material/Box'
import CacaoFieldIcon from '../../../assets/icons/tiles/CacaoField.png'
import { BuildingImageSize, SingleBuildingWithCount } from '../../../assets/styling/BuildingStyle'
import { Tile } from '../../../types/Tile'

const ITERATION_TIME_IN_SECONDS = 3600
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const PRODUCE_PER_ITERATION = 3
export const CACAO_FIELD_INFO: Tile = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CacaoField = (props: { count: number }) => {
  return (
    <Box sx={SingleBuildingWithCount}>
      <img src={CacaoFieldIcon} alt={CacaoField.name} style={BuildingImageSize} />
      {Number(props.count.toFixed(2))}
    </Box>
  )
}
