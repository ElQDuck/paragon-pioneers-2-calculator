import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import IronSmelterIcon from '../../../../assets/icons/buildings/merchants/IronSmelter.png'
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
import { CHARCOAL_KILN_INFO, CharcoalKiln } from '../townsmen/CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from '../townsmen/CoalMine'
import { IRON_MINE_INFO, IronMine } from './IronMine'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COAL_MINE_TROPICAL_INFO, CoalMineTropical } from '../farmers/CoalMineTropical'
import { COAL_MINE_NORTH_INFO, CoalMineNorth } from '../northern-islands/CoalMineNorth'
import { IRON_MINE_NORTH_INFO, IronMineNorth } from '../northern-islands/IronMineNorth'

const ITERATION_TIME_IN_SECONDS = 960
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['Iron', 2],
])
export const IRON_SMELTER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['Iron', CONSUME_PER_ITERATION.get('Iron')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const IronSmelter = (props: { count: number }) => {
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
            src={IronSmelterIcon}
            title={capitalCase(IronSmelter.name)}
            alt={IronSmelter.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <CoalMine
                count={
                  props.count * (IRON_SMELTER_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)
                }
              />,
              <CharcoalKiln
                count={
                  props.count * (IRON_SMELTER_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)
                }
              />,
              <CoalMineTropical
                count={
                  props.count *
                  (IRON_SMELTER_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CoalMineNorth
                count={
                  props.count *
                  (IRON_SMELTER_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <IronMine
                count={
                  props.count * (IRON_SMELTER_INFO.ConsumePerMinute.get('Iron')! / IRON_MINE_INFO.ProducePerMinute)
                }
              />,
              <IronMineNorth
                count={
                  props.count *
                  (IRON_SMELTER_INFO.ConsumePerMinute.get('Iron')! / IRON_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const IronSmelterButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={IronSmelterIcon}
      buildingElement={IronSmelter}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
