import Box from '@mui/material/Box'
import { capitalCase } from 'change-case'
import CopperPyriteDepositIcon from '../../../assets/icons/tiles/CopperPyriteDeposit.png'
import { BuildingImageSize, SingleBuildingWithCount } from '../../../assets/styling/BuildingStyle'
import { Tile } from '../../../types/Tile'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const PRODUCE_PER_ITERATION = 1
export const COPPER_PYRITE_DEPOSIT_INFO: Tile = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CopperPyriteDeposit = (props: { count: number }) => {
  return (
    <Box sx={SingleBuildingWithCount}>
      <Box
        component="img"
        src={CopperPyriteDepositIcon}
        title={capitalCase(CopperPyriteDeposit.name)}
        alt={CopperPyriteDeposit.name}
        sx={BuildingImageSize}
      />
      {Number(props.count.toFixed(2))}
    </Box>
  )
}
