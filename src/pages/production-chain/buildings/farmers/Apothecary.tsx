import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import ApothecaryIcon from '../../../../assets/icons/buildings/farmers/Apothecary.png'
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
import { CROCODILE_RANCH_INFO, CrocodileRanch } from './CrocodileRanch'
import { RUM_DISTILLERY_INFO, RumDistillery } from './RumDistillery'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { Tannery, TANNERY_INFO } from '../townsmen/Tannery'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Leather', 1],
  ['Rum', 3],
])
export const APOTHECARY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Leather', CONSUME_PER_ITERATION.get('Leather')! / ITERATION_TIME_IN_DECIMAL],
    ['Rum', CONSUME_PER_ITERATION.get('Rum')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Apothecary = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
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
            src={ApothecaryIcon}
            title={capitalCase(Apothecary.name)}
            alt={Apothecary.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <CrocodileRanch
                count={
                  props.count *
                  (APOTHECARY_INFO.ConsumePerMinute.get('Leather')! / CROCODILE_RANCH_INFO.ProducePerMinute)
                }
              />,
              <Tannery
                count={(props.count * APOTHECARY_INFO.ConsumePerMinute.get('Leather')!) / TANNERY_INFO.ProducePerMinute}
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RumDistillery
            count={props.count * (APOTHECARY_INFO.ConsumePerMinute.get('Rum')! / RUM_DISTILLERY_INFO.ProducePerMinute)}
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const ApothecaryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ApothecaryIcon}
      buildingElement={Apothecary}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
