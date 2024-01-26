import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import WeaverIcon from '../../../../assets/icons/buildings/colonists/Weaver.png'
import {
  BuildingGroup,
  BuildingImageSize,
  ConsumerPaperStyle,
  ProviderBoxStyle,
  SingleBuildingWithCount,
} from '../../../../assets/styling/BuildingStyle'
import { Arrow } from '../../../../common/Arrow'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'
import { SHEEP_FARM_INFO, SheepFarm } from './SheepFarm'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COTTON_PLANTATION_INFO, CottonPlantation } from '../workers/CottonPlantation'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['Yarn', 2]])
export const WEAVER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([['Yarn', CONSUME_PER_ITERATION.get('Yarn')! / ITERATION_TIME_IN_DECIMAL]]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Weaver = (props: { count: number }) => {
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
          <img src={WeaverIcon} alt={Weaver.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <SheepFarm
                count={props.count * (WEAVER_INFO.ConsumePerMinute.get('Yarn')! / SHEEP_FARM_INFO.ProducePerMinute)}
              />,
              <CottonPlantation
                count={
                  props.count * (WEAVER_INFO.ConsumePerMinute.get('Yarn')! / COTTON_PLANTATION_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
    </Box>
  )
}

export const WeaverButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={WeaverIcon}
      buildingElement={Weaver}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
