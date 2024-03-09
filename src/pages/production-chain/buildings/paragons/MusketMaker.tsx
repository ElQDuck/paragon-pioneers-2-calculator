import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import MusketMakerIcon from '../../../../assets/icons/buildings/paragons/MusketMaker.png'
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
import { POWDER_MILL_INFO, PowderMill } from './PowderMill'
import { STEEL_FURNACE_INFO, SteelFurnace } from './SteelFurnace'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { BRASS_SMELTER_NORTH_INFO, BrassSmelterNorth } from '../northern-islands/BrassSmelterNorth'
import { BRASS_SMELTER_TROPICAL_INFO, BrassSmelterTropical } from '../workers/BrassSmelterTropical'
import { BRASS_SMELTER_INFO, BrassSmelter } from './BrassSmelter'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Gunpowder', 1],
  ['BrassIngot', 1],
  ['Steel', 1],
  ['RiverField', 1],
])
export const MUSKET_MAKER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Gunpowder', CONSUME_PER_ITERATION.get('Gunpowder')! / ITERATION_TIME_IN_DECIMAL],
    ['BrassIngot', CONSUME_PER_ITERATION.get('BrassIngot')! / ITERATION_TIME_IN_DECIMAL],
    ['Steel', CONSUME_PER_ITERATION.get('Steel')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const MusketMaker = (props: { count: number }) => {
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
          <Box
            component="img"
            src={MusketMakerIcon}
            title={capitalCase(MusketMaker.name)}
            alt={MusketMaker.name}
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
          <PowderMill
            count={
              props.count * (MUSKET_MAKER_INFO.ConsumePerMinute.get('Gunpowder')! / POWDER_MILL_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <BrassSmelter
                count={
                  props.count *
                  (MUSKET_MAKER_INFO.ConsumePerMinute.get('BrassIngot')! / BRASS_SMELTER_INFO.ProducePerMinute)
                }
              />,
              <BrassSmelterTropical
                count={
                  props.count *
                  (MUSKET_MAKER_INFO.ConsumePerMinute.get('Brass')! / BRASS_SMELTER_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <BrassSmelterNorth
                count={
                  props.count *
                  (MUSKET_MAKER_INFO.ConsumePerMinute.get('BrassIngot')! / BRASS_SMELTER_NORTH_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef3}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <SteelFurnace
            count={
              props.count * (MUSKET_MAKER_INFO.ConsumePerMinute.get('Steel')! / STEEL_FURNACE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef4}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RiverField count={props.count * MUSKET_MAKER_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
      <Arrow start={providerRef4} end={consumerRef} />
    </Box>
  )
}

export const MusketMakerButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={MusketMakerIcon}
      buildingElement={MusketMaker}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
