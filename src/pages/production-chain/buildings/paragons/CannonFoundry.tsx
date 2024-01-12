import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import CannonFoundryIcon from '../../../../assets/icons/buildings/paragons/CannonFoundry.png'
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

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Gunpowder', 1],
  ['Steel', 1],
  ['RiverField', 1],
])
export const CANNON_FOUNDRY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Gunpowder', CONSUME_PER_ITERATION.get('Gunpowder')! / ITERATION_TIME_IN_DECIMAL],
    ['Steel', CONSUME_PER_ITERATION.get('Steel')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const CannonFoundry = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={CannonFoundryIcon} alt={CannonFoundry.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <PowderMill
            count={
              props.count * (CANNON_FOUNDRY_INFO.ConsumePerMinute.get('Gunpowder')! / POWDER_MILL_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <SteelFurnace
            count={
              props.count * (CANNON_FOUNDRY_INFO.ConsumePerMinute.get('Steel')! / STEEL_FURNACE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        {/* TODO: Add river field to all buildings which need to be build on top of*/}
        <Paper ref={providerRef3} elevation={2} sx={ProviderPaperStyle}>
          <RiverField count={props.count * CANNON_FOUNDRY_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
    </Box>
  )
}

export const CannonFoundryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CannonFoundryIcon}
      buildingElement={CannonFoundry}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
