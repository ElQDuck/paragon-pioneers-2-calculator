import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import ZincSmelterIcon from '../../../../assets/icons/buildings/northern-islands/ZincSmelter.png'
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
import { COAL_MINE_NORTH_INFO, CoalMineNorth } from './CoalMineNorth'
import { GOLD_MINE_NORTH_INFO } from './GoldMineNorth'
import { ZincMine } from './ZincMine'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COAL_MINE_TROPICAL_INFO, CoalMineTropical } from '../farmers/CoalMineTropical'
import { CHARCOAL_KILN_INFO, CharcoalKiln } from '../townsmen/CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from '../townsmen/CoalMine'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['Zinc', 1],
])
export const ZINC_SMELTER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['Zinc', CONSUME_PER_ITERATION.get('Zinc')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const ZincSmelter = (props: { count: number }) => {
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
            src={ZincSmelterIcon}
            title={capitalCase(ZincSmelter.name)}
            alt={ZincSmelter.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <CoalMineNorth
                count={
                  props.count *
                  (ZINC_SMELTER_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
              <CoalMine
                count={
                  props.count * (ZINC_SMELTER_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)
                }
              />,
              <CharcoalKiln
                count={
                  props.count * (ZINC_SMELTER_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)
                }
              />,
              <CoalMineTropical
                count={
                  props.count *
                  (ZINC_SMELTER_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_TROPICAL_INFO.ProducePerMinute)
                }
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
          <ZincMine
            count={
              props.count * (ZINC_SMELTER_INFO.ConsumePerMinute.get('Zinc')! / GOLD_MINE_NORTH_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const ZincSmelterButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ZincSmelterIcon}
      buildingElement={ZincSmelter}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
