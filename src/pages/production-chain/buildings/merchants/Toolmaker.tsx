import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import ToolmakerIcon from '../../../../assets/icons/buildings/merchants/Toolmaker.png'
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
import { CHARCOAL_KILN_INFO, CharcoalKiln } from '../townsmen/CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from '../townsmen/CoalMine'
import { IRON_SMELTER_INFO, IronSmelter } from './IronSmelter'

const ITERATION_TIME_IN_SECONDS = 960
const PRODUCE_PER_ITERATION = 4
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['IronIngot', 2],
])
export const TOOLMAKER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['IronIngot', CONSUME_PER_ITERATION.get('IronIngot')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Toolmaker = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={ToolmakerIcon} alt={Toolmaker.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <CoalMine
            count={props.count * (TOOLMAKER_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)}
          />
          OR
          <CharcoalKiln
            count={props.count * (TOOLMAKER_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <IronSmelter
            count={
              props.count * (TOOLMAKER_INFO.ConsumePerMinute.get('IronIngot')! / IRON_SMELTER_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const ToolmakerButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ToolmakerIcon}
      buildingElement={Toolmaker}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
