import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useRef } from 'react'
import CostumierIcon from '../../../../assets/icons/buildings/workers/Costumier.png'
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
import { TEXTILE_FACTORY_INFO, TextileFactory } from '../colonists/TextileFactory'
import { WEAVER_INFO, Weaver } from '../colonists/Weaver'
import { INDIGO_PLANTATION_INFO, IndigoPlantation } from './IndigoPlantation'
import { SPINNING_MILL_INFO, SpinningMill } from './SpinningMill'

import { globalInvertBuildingChainOrder } from '../../../../App'

const ITERATION_TIME_IN_SECONDS = 120
const PRODUCE_PER_ITERATION = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Dye', 2],
  ['Fabric', 3],
])
export const COSTUMIER_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Dye', CONSUME_PER_ITERATION.get('Dye')! / ITERATION_TIME_IN_DECIMAL],
    ['Fabric', CONSUME_PER_ITERATION.get('Fabric')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const Costumier = (props: { count: number }) => {
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
          <img src={CostumierIcon} alt={Costumier.name} style={BuildingImageSize} />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Paper
          ref={providerRef1}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <IndigoPlantation
            count={
              props.count * (COSTUMIER_INFO.ConsumePerMinute.get('Dye')! / INDIGO_PLANTATION_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <SpinningMill
            count={props.count * (COSTUMIER_INFO.ConsumePerMinute.get('Fabric')! / SPINNING_MILL_INFO.ProducePerMinute)}
          />
          OR
          <Weaver
            count={props.count * (COSTUMIER_INFO.ConsumePerMinute.get('Fabric')! / WEAVER_INFO.ProducePerMinute)}
          />
          OR
          <TextileFactory
            count={
              props.count * (COSTUMIER_INFO.ConsumePerMinute.get('Fabric')! / TEXTILE_FACTORY_INFO.ProducePerMinute)
            }
          />
        </Paper>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
    </Box>
  )
}

export const CostumierButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={CostumierIcon}
      buildingElement={Costumier}
      updateProductionChanFunction={props.updateProductionChanFunction}
    ></BuildingButton>
  )
}
