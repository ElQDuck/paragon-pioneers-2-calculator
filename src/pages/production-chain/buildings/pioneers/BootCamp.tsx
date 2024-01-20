import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import BootCampIcon from '../../../../assets/icons/buildings/pioneers/BootCamp.png'
import {
  BuildingGroup,
  BuildingImageSize,
  ConsumerPaperStyle,
  ProviderBoxStyle,
  ProviderPaperStyle,
  SingleBuildingWithCount,
} from '../../../../assets/styling/BuildingStyle'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { Arrow } from '../../../../common/Arrow'
import { BuildingButton } from '../../../../common/BuildingButton'
import { Building } from '../../../../types/Building'
import { PIONEERS_HUT_INFO, PioneersHut } from './PioneersHut'
import { SAW_WORKS_INFO, SawWorks } from './SawWorks'
import { SAWMILL_INFO, Sawmill } from './Sawmill'

const ITERATION_TIME_IN_SECONDS = 300
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Militia', 1],
  ['Plank', 1],
])
const PRODUCE_PER_ITERATION = 1
export const BOOT_CAMP_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Militia', CONSUME_PER_ITERATION.get('Militia')! / ITERATION_TIME_IN_DECIMAL],
    ['Plank', CONSUME_PER_ITERATION.get('Plank')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const BootCamp = (props: { count: number }) => {
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
          <img src={BootCampIcon} alt={BootCamp.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Paper
          ref={providerRef1}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <PioneersHut
            count={props.count * (BOOT_CAMP_INFO.ConsumePerMinute.get('Militia')! / PIONEERS_HUT_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <SawWorks
                count={props.count * (BOOT_CAMP_INFO.ConsumePerMinute.get('Plank')! / SAW_WORKS_INFO.ProducePerMinute)}
              />,
              <Sawmill
                count={props.count * (BOOT_CAMP_INFO.ConsumePerMinute.get('Plank')! / SAWMILL_INFO.ProducePerMinute)}
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

export const BootCampButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={BootCampIcon}
      buildingElement={BootCamp}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
