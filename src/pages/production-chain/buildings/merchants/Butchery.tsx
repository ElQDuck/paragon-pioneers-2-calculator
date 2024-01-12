import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import ButcheryIcon from '../../../../assets/icons/buildings/merchants/Butchery.png'
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
import { SALTERN_TROPICAL_INFO, SalternTropical } from '../farmers/SalternTropical'
import { SALT_WORKS_NORTH_INFO, SaltWorksNorth } from '../northern-islands/SaltWorksNorth'
import { CATTLE_RANCH_INFO, CattleRanch } from '../townsmen/CattleRanch'
import { SALT_WORKS_INFO, SaltWorks } from '../townsmen/SaltWorks'

const ITERATION_TIME_IN_SECONDS = 480
const PRODUCE_PER_ITERATION = 4
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Salt', 1],
  ['Cattle', 2],
])
export const BUTCHERY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Salt', CONSUME_PER_ITERATION.get('Salt')! / ITERATION_TIME_IN_DECIMAL],
    ['Cattle', CONSUME_PER_ITERATION.get('Cattle')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Butchery = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  return (
    <Box sx={BuildingGroup}>
      <Paper ref={consumerRef} elevation={2} sx={ConsumerPaperStyle}>
        <Box sx={SingleBuildingWithCount}>
          <img src={ButcheryIcon} alt={Butchery.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={ProviderBoxStyle}>
        <Paper ref={providerRef1} elevation={2} sx={ProviderPaperStyle}>
          <SaltWorks
            count={props.count * (BUTCHERY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_INFO.ProducePerMinute)}
          />
          OR
          <>{/* TODO */} TODO: Add Paragons Saltern</>
          OR
          <SalternTropical
            count={props.count * (BUTCHERY_INFO.ConsumePerMinute.get('Salt')! / SALTERN_TROPICAL_INFO.ProducePerMinute)}
          />
          OR
          <SaltWorksNorth
            count={props.count * (BUTCHERY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_NORTH_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper ref={providerRef2} elevation={2} sx={ProviderPaperStyle}>
          <CattleRanch
            count={props.count * (BUTCHERY_INFO.ConsumePerMinute.get('Cattle')! / CATTLE_RANCH_INFO.ProducePerMinute)}
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const ButcheryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ButcheryIcon}
      buildingElement={Butchery}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
