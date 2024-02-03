import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import CopperSmelterTropicalIcon from '../../../../assets/icons/buildings/farmers/CopperSmelterTropical.png'
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
import { DEEP_COPPER_MINE_INFO, DeepCopperMine } from '../merchants/DeepCopperMine'
import { COAL_MINE_TROPICAL_INFO, CoalMineTropical } from './CoalMineTropical'
import { COPPER_MINE_TROPICAL_INFO, CopperMineTropical } from './CopperMineTropical'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COPPER_MINE_INFO, CopperMine } from '../colonists/CopperMine'
import { COAL_MINE_NORTH_INFO, CoalMineNorth } from '../northern-islands/CoalMineNorth'
import { COPPER_MINE_NORTH_INFO, CopperMineNorth } from '../northern-islands/CopperMineNorth'
import { CHARCOAL_KILN_INFO, CharcoalKiln } from '../townsmen/CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from '../townsmen/CoalMine'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['Copper', 1],
])
export const COPPER_SMELTER_TROPICAL_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['Copper', CONSUME_PER_ITERATION.get('Copper')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CopperSmelterTropical = (props: { count: number }) => {
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
            src={CopperSmelterTropicalIcon}
            title={capitalCase(CopperSmelterTropical.name)}
            alt={CopperSmelterTropical.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <CoalMineTropical
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Coal')! /
                    COAL_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CoalMine
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)
                }
              />,
              <CharcoalKiln
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)
                }
              />,
              <CoalMineNorth
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <CopperMineTropical
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Copper')! /
                    COPPER_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CopperMine
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Copper')! / COPPER_MINE_INFO.ProducePerMinute)
                }
              />,
              <DeepCopperMine
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Copper')! /
                    DEEP_COPPER_MINE_INFO.ProducePerMinute)
                }
              />,
              <CopperMineNorth
                count={
                  props.count *
                  (COPPER_SMELTER_TROPICAL_INFO.ConsumePerMinute.get('Copper')! /
                    COPPER_MINE_NORTH_INFO.ProducePerMinute)
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

export const CopperSmelterTropicalButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CopperSmelterTropicalIcon}
      buildingElement={CopperSmelterTropical}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
