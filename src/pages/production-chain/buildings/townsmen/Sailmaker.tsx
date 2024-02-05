import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import SailmakerIcon from '../../../../assets/icons/buildings/townsmen/Sailmaker.png'
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
import { ROPERY_INFO, Ropery } from '../colonists/Ropery'

import { globalInvertBuildingChainOrder } from '../../../../App'
import { AlternativeCombinationProvider } from '../../../../common/AlternativeCombinationProvider'
import { TEXTILE_FACTORY_INFO, TextileFactory } from '../colonists/TextileFactory'
import { WEAVER_INFO, Weaver } from '../colonists/Weaver'
import { ROPERY_TROPICAL_INFO, RoperyTropical } from '../farmers/RoperyTropical'
import { SPINNING_MILL_INFO, SpinningMill } from '../workers/SpinningMill'

const ITERATION_TIME_IN_SECONDS = 240
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Rope', 1],
  ['Fabric', 2],
])
export const SAILMAKER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Rope', CONSUME_PER_ITERATION.get('Rope')! / ITERATION_TIME_IN_DECIMAL],
    ['Fabric', CONSUME_PER_ITERATION.get('Fabric')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Sailmaker = (props: { count: number }) => {
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
            src={SailmakerIcon}
            title={capitalCase(Sailmaker.name)}
            alt={Sailmaker.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <Ropery
                count={props.count * (SAILMAKER_INFO.ConsumePerMinute.get('Rope')! / ROPERY_INFO.ProducePerMinute)}
              />,
              <RoperyTropical
                count={
                  props.count * (SAILMAKER_INFO.ConsumePerMinute.get('Rope')! / ROPERY_TROPICAL_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <Weaver
                count={props.count * (SAILMAKER_INFO.ConsumePerMinute.get('Fabric')! / WEAVER_INFO.ProducePerMinute)}
              />,
              <TextileFactory
                count={
                  props.count * (SAILMAKER_INFO.ConsumePerMinute.get('Fabric')! / TEXTILE_FACTORY_INFO.ProducePerMinute)
                }
              />,
              <SpinningMill
                count={
                  props.count * (SAILMAKER_INFO.ConsumePerMinute.get('Fabric')! / SPINNING_MILL_INFO.ProducePerMinute)
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

export const SailmakerButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={SailmakerIcon}
      buildingElement={Sailmaker}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
