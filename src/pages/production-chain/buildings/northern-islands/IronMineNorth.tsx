import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import IronMineNorthIcon from '../../../../assets/icons/buildings/northern-islands/IronMineNorth.png'
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
import { IronstoneDeposit } from '../../tiles/IronstoneDeposit'

import { globalInvertBuildingChainOrder } from '../../../../App'

const ITERATION_TIME_IN_SECONDS = 120
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['Iron', 1]])
export const IRON_MINE_NORTH_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([['Iron', CONSUME_PER_ITERATION.get('Iron')! / ITERATION_TIME_IN_DECIMAL]]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const IronMineNorth = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  return (
    <Box sx={{ ...BuildingGroup, flexDirection: globalInvertBuildingChainOrder.value ? 'row-reverse' : 'row' }}>
      <Paper
        ref={consumerRef}
        elevation={2}
        sx={{
          ...ConsumerPaperStyle,
          marginRight: globalInvertBuildingChainOrder.value ? 0 : '4rem',
          marginLeft: globalInvertBuildingChainOrder.value ? '4rem' : 0,
        }}
      >
        <Box sx={SingleBuildingWithCount}>
          <Box
            component="img"
            src={IronMineNorthIcon}
            title={capitalCase(IronMineNorth.name)}
            alt={IronMineNorth.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Paper
          ref={providerRef1}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <IronstoneDeposit count={props.count * IRON_MINE_NORTH_INFO.ConsumePerIteration.get('Iron')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const IronMineNorthButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={IronMineNorthIcon}
      buildingElement={IronMineNorth}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
