import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import TrumpetMakerIcon from '../../../../assets/icons/buildings/paragons/TrumpetMaker.png'
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

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { BRASS_SMELTER_NORTH_INFO, BrassSmelterNorth } from '../northern-islands/BrassSmelterNorth'
import { BRASS_SMELTER_TROPICAL_INFO, BrassSmelterTropical } from '../workers/BrassSmelterTropical'
import { BRASS_SMELTER_INFO, BrassSmelter } from './BrassSmelter'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([['BrassIngot', 1]])
export const TRUMPET_MAKER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['BrassIngot', CONSUME_PER_ITERATION.get('BrassIngot')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const TrumpetMaker = (props: { count: number }) => {
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
            src={TrumpetMakerIcon}
            title={capitalCase(TrumpetMaker.name)}
            alt={TrumpetMaker.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <BrassSmelter
                count={
                  props.count *
                  (TRUMPET_MAKER_INFO.ConsumePerMinute.get('BrassIngot')! / BRASS_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <BrassSmelterTropical
                count={
                  props.count *
                  (TRUMPET_MAKER_INFO.ConsumePerMinute.get('BrassIngot')! / BRASS_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <BrassSmelterNorth
                count={
                  props.count *
                  (TRUMPET_MAKER_INFO.ConsumePerMinute.get('BrassIngot')! / BRASS_SMELTER_NORTH_INFO.ProducePerMinute)
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

export const TrumpetMakerButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={TrumpetMakerIcon}
      buildingElement={TrumpetMaker}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
