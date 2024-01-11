import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import ShieldGuardianTempleIcon from '../../../../assets/icons/buildings/workers/ShieldGuardianTemple.png'
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
import { FARMERS_SHACK_INFO, FarmersShack } from '../farmers/FarmersShack'
import { HERALDIC_ARMOURER_INFO, HeraldicArmourer } from './HeraldicArmourer'

const ITERATION_TIME_IN_SECONDS = 1200
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Slinger', 4],
  ['Shield', 1],
])
export const SHIELD_GUARDIAN_TEMPLE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Slinger', CONSUME_PER_ITERATION.get('Slinger')! / ITERATION_TIME_IN_DECIMAL],
    ['Shield', CONSUME_PER_ITERATION.get('Shield')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const ShieldGuardianTemple = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={ShieldGuardianTempleIcon} alt={ShieldGuardianTemple.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <FarmersShack
            count={
              props.count *
              (SHIELD_GUARDIAN_TEMPLE_INFO.ConsumePerMinute.get('Slinger')! / FARMERS_SHACK_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <HeraldicArmourer
            count={
              props.count *
              (SHIELD_GUARDIAN_TEMPLE_INFO.ConsumePerMinute.get('Shield')! / HERALDIC_ARMOURER_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const ShieldGuardianTempleButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ShieldGuardianTempleIcon}
      buildingElement={ShieldGuardianTemple}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
