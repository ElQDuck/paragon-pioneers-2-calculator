import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import BoilingHouseIcon from '../../../../assets/icons/buildings/townsmen/BoilingHouse.png'
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
import { FISHERMANS_HUT_INFO, FishermansHut } from '../pioneers/FishermansHut'
import { CHARCOAL_KILN_INFO, CharcoalKiln } from './CharcoalKiln'
import { COAL_MINE_INFO, CoalMine } from './CoalMine'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { BEACH_FISHERMANS_HUT_INFO, BeachFishermansHut } from '../farmers/BeachFishermansHut'
import { COAL_MINE_TROPICAL_INFO, CoalMineTropical } from '../farmers/CoalMineTropical'
import { COAL_MINE_NORTH_INFO, CoalMineNorth } from '../northern-islands/CoalMineNorth'
import { SALMON_FISHERMANS_HUT_INFO, SalmonFishermansHut } from '../northern-islands/SalmonFishermansHut'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 2
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Coal', 1],
  ['Fish', 6],
])
export const BOILING_HOUSE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Coal', CONSUME_PER_ITERATION.get('Coal')! / ITERATION_TIME_IN_DECIMAL],
    ['Fish', CONSUME_PER_ITERATION.get('Fish')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const BoilingHouse = (props: { count: number }) => {
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
            src={BoilingHouseIcon}
            title={capitalCase(BoilingHouse.name)}
            alt={BoilingHouse.name}
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
                  props.count * (BOILING_HOUSE_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_INFO.ProducePerMinute)
                }
              />,
              <CharcoalKiln
                count={
                  props.count * (BOILING_HOUSE_INFO.ConsumePerMinute.get('Coal')! / CHARCOAL_KILN_INFO.ProducePerMinute)
                }
              />,
              <CoalMineTropical
                count={
                  props.count *
                  (BOILING_HOUSE_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <CoalMineNorth
                count={
                  props.count *
                  (BOILING_HOUSE_INFO.ConsumePerMinute.get('Coal')! / COAL_MINE_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <FishermansHut
                count={
                  props.count *
                  (BOILING_HOUSE_INFO.ConsumePerMinute.get('Fish')! / FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <BeachFishermansHut
                count={
                  props.count *
                  (BOILING_HOUSE_INFO.ConsumePerMinute.get('Fish')! / BEACH_FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <SalmonFishermansHut
                count={
                  props.count *
                  (BOILING_HOUSE_INFO.ConsumePerMinute.get('Fish')! / SALMON_FISHERMANS_HUT_INFO.ProducePerMinute)
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

export const BoilingHouseButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={BoilingHouseIcon}
      buildingElement={BoilingHouse}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
