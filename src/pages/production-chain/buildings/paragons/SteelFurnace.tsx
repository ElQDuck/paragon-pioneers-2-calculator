import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import SteelFurnaceIcon from '../../../../assets/icons/buildings/paragons/SteelFurnace.png'
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
import { RiverField } from '../../tiles/RiverField'
import { LIME_KILN_INFO, LimeKiln } from '../colonists/LimeKiln'
import { IRON_SMELTER_INFO, IronSmelter } from '../merchants/IronSmelter'
import { COKERY_INFO, Cokery } from './Cokery'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { IRON_SMELTER_NORTH_INFO, IronSmelterNorth } from '../northern-islands/IronSmelterNorth'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Quicklime', 1],
  ['Coke', 1],
  ['IronIngot', 1],
  ['RiverField', 1],
])
export const STEEL_FURNACE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Quicklime', CONSUME_PER_ITERATION.get('Quicklime')! / ITERATION_TIME_IN_DECIMAL],
    ['Coke', CONSUME_PER_ITERATION.get('Coke')! / ITERATION_TIME_IN_DECIMAL],
    ['IronIngot', CONSUME_PER_ITERATION.get('IronIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const SteelFurnace = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  const providerRef4 = useRef(null)
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
          <img src={SteelFurnaceIcon} alt={SteelFurnace.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Paper
          ref={providerRef1}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <LimeKiln
            count={
              props.count * (STEEL_FURNACE_INFO.ConsumePerMinute.get('Quicklime')! / LIME_KILN_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Cokery
            count={props.count * (STEEL_FURNACE_INFO.ConsumePerMinute.get('Coke')! / COKERY_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Box ref={providerRef3}>
          <AlternativeCombinationProvider
            combinationList={[
              <IronSmelter
                count={
                  props.count *
                  (STEEL_FURNACE_INFO.ConsumePerMinute.get('IronIngot')! / IRON_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <IronSmelterNorth
                count={
                  props.count *
                  (STEEL_FURNACE_INFO.ConsumePerMinute.get('IronIngot')! / IRON_SMELTER_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef4}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RiverField count={props.count * STEEL_FURNACE_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
      <Arrow start={providerRef4} end={consumerRef} />
    </Box>
  )
}

export const SteelFurnaceButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={SteelFurnaceIcon}
      buildingElement={SteelFurnace}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
