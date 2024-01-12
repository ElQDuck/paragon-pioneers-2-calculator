import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import GlaiveSmithIcon from '../../../../assets/icons/buildings/workers/GlaiveSmith.png'
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
import { IRON_SMELTER_NORTH_INFO, IronSmelterNorth } from '../northern-islands/IronSmelterNorth'
import { GEMSTONE_MINE_INFO, GemstoneMine } from './GemstoneMine'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['IronIngot', 1],
  ['Gemstone', 2],
])
export const GLAIVE_SMITH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['IronIngot', CONSUME_PER_ITERATION.get('IronIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['Gemstone', CONSUME_PER_ITERATION.get('Gemstone')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const GlaiveSmith = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={GlaiveSmithIcon} alt={GlaiveSmith.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <>{/* TODO */} TODO: Add iron Smelter (normal) </>
          OR
          <IronSmelterNorth
            count={
              props.count *
              (GLAIVE_SMITH_INFO.ConsumePerMinute.get('IronIngot')! / IRON_SMELTER_NORTH_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <GemstoneMine
            count={
              props.count * (GLAIVE_SMITH_INFO.ConsumePerMinute.get('Gemstone')! / GEMSTONE_MINE_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const GlaiveSmithButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={GlaiveSmithIcon}
      buildingElement={GlaiveSmith}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
