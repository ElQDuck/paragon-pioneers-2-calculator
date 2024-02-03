import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import TanneryIcon from '../../../../assets/icons/buildings/townsmen/Tannery.png'
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
import { SALTERN_INFO, Saltern } from '../paragons/Saltern'
import { FURRIERY_INFO, Furriery } from './Furriery'
import { SALT_WORKS_INFO, SaltWorks } from './SaltWorks'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { RiverField } from '../../tiles/RiverField'
import { SALT_WORKS_NORTH_INFO, SaltWorksNorth } from '../northern-islands/SaltWorksNorth'

const ITERATION_TIME_IN_SECONDS = 1080
const PRODUCE_PER_ITERATION = 3
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Salt', 1],
  ['Leather', 3],
  ['RiverField', 1],
])
export const TANNERY_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Salt', CONSUME_PER_ITERATION.get('Salt')! / ITERATION_TIME_IN_DECIMAL],
    ['Leather', CONSUME_PER_ITERATION.get('Leather')! / ITERATION_TIME_IN_DECIMAL],
    ['RiverField', CONSUME_PER_ITERATION.get('RiverField')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Tannery = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
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
            src={TanneryIcon}
            title={capitalCase(Tannery.name)}
            alt={Tannery.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <SaltWorks
                count={props.count * (TANNERY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_INFO.ProducePerMinute)}
              />,
              <SalternTropical
                count={
                  props.count * (TANNERY_INFO.ConsumePerMinute.get('Salt')! / SALTERN_TROPICAL_INFO.ProducePerMinute)
                }
              />,
              <SaltWorksNorth
                count={
                  props.count * (TANNERY_INFO.ConsumePerMinute.get('Salt')! / SALT_WORKS_NORTH_INFO.ProducePerMinute)
                }
              />,
              <Saltern
                count={props.count * (TANNERY_INFO.ConsumePerMinute.get('Salt')! / SALTERN_INFO.ProducePerMinute)}
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Furriery
            count={props.count * (TANNERY_INFO.ConsumePerMinute.get('Leather')! / FURRIERY_INFO.ProducePerMinute)}
          />
        </Paper>
        AND
        <Paper
          ref={providerRef3}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RiverField count={props.count * TANNERY_INFO.ConsumePerIteration.get('RiverField')!} />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
    </Box>
  )
}

export const TanneryButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={TanneryIcon}
      buildingElement={Tannery}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
