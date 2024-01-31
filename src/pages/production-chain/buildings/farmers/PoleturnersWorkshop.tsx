import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import PoleturnersWorkshopIcon from '../../../../assets/icons/buildings/farmers/PoleturnersWorkshop.png'
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
import { COAL_MINE_TROPICAL_INFO, CoalMineTropical } from './CoalMineTropical'
import { COPPER_SMELTER_TROPICAL_INFO, CopperSmelterTropical } from './CopperSmelterTropical'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { COPPER_SMELTER_INFO, CopperSmelter } from '../colonists/CopperSmelter'
import { COAL_MINE_NORTH_INFO, CoalMineNorth } from '../northern-islands/CoalMineNorth'
import { COPPER_SMELTER_NORTH_INFO, CopperSmelterNorth } from '../northern-islands/CopperSmelterNorth'
import { CHARCOAL_KILN_INFO, CharcoalKiln } from '../townsmen/CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from '../townsmen/CoalMine'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['CopperIngot', 1],
])
export const POLETURNERS_WORKSHOP_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['CopperIngot', CONSUME_PER_ITERATION.get('CopperIngot')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PoleturnersWorkshop = (props: { count: number }) => {
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
            src={PoleturnersWorkshopIcon}
            title={capitalCase(PoleturnersWorkshop.name)}
            alt={PoleturnersWorkshop.name}
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
                  (POLETURNERS_WORKSHOP_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CoalMine
                count={
                  props.count *
                  (POLETURNERS_WORKSHOP_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)
                }
              />,
              <CharcoalKiln
                count={
                  props.count *
                  (POLETURNERS_WORKSHOP_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)
                }
              />,
              <CoalMineNorth
                count={
                  props.count *
                  (POLETURNERS_WORKSHOP_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <CopperSmelterTropical
                count={
                  props.count *
                  (POLETURNERS_WORKSHOP_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelter
                count={
                  props.count *
                  (POLETURNERS_WORKSHOP_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <CopperSmelterNorth
                count={
                  props.count *
                  (POLETURNERS_WORKSHOP_INFO.ConsumePerMinute.get('CopperIngot')! /
                    COPPER_SMELTER_NORTH_INFO.ProducePerMinute)
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

export const PoleturnersWorkshopButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PoleturnersWorkshopIcon}
      buildingElement={PoleturnersWorkshop}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
