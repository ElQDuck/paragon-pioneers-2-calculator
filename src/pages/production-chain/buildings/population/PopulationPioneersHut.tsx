import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import PioneersHutIcon from '../../../../assets/icons/buildings/population/PioneersHut.png'
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
import { BEACH_FISHERMANS_HUT_INFO, BeachFishermansHut } from '../farmers/BeachFishermansHut'
import { BATHHOUSE_INFO, Bathhouse } from '../merchants/Bathhouse'
import { LARGE_THERMAL_BATH_INFO, LargeThermalBath } from '../paragons/LargeThermalBath'
import { CISTERN_INFO, Cistern } from '../pioneers/Cistern'
import { FISHERMANS_HUT_INFO, FishermansHut } from '../pioneers/FishermansHut'
import { SAUSAGE_MAKER_INFO, SausageMaker } from '../pioneers/SausageMaker'
import { WELL_INFO, Well } from '../pioneers/Well'
import { CIDER_MAKER_INFO, CiderMaker } from '../pioneers/CiderMaker'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Fish', 10 / 3780],
  ['Water', 1],
  ['Sausage', 10 / 10800],
  ['Cider', 10 / 9450],
  ['Community', 1],
])
const PRODUCE_PER_ITERATION = 1
export const POPULATION_PIONEERS_HUT_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Fish', CONSUME_PER_ITERATION.get('Fish')! / ITERATION_TIME_IN_DECIMAL],
    ['Water', CONSUME_PER_ITERATION.get('Water')! / ITERATION_TIME_IN_DECIMAL],
    ['Sausage', CONSUME_PER_ITERATION.get('Sausage')! / ITERATION_TIME_IN_DECIMAL],
    ['Cider', CONSUME_PER_ITERATION.get('Cider')! / ITERATION_TIME_IN_DECIMAL],
    ['Community', CONSUME_PER_ITERATION.get('Community')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PopulationPioneersHut = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  const providerRef4 = useRef(null)
  const providerRef5 = useRef(null)
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
            src={PioneersHutIcon}
            title={capitalCase(PopulationPioneersHut.name)}
            alt={PopulationPioneersHut.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <FishermansHut
                count={
                  props.count *
                  (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Fish')! / FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <BeachFishermansHut
                count={
                  props.count *
                  (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Fish')! /
                    BEACH_FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <Well
                count={
                  props.count *
                  (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Water')! / WELL_INFO.ProducePerMinute)
                }
              />,
              <Cistern
                count={
                  props.count *
                  (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Water')! / CISTERN_INFO.ProducePerMinute)
                }
              />,
              <Bathhouse
                count={
                  props.count *
                  (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Water')! /
                    (BATHHOUSE_INFO.ProducePerMinute * BATHHOUSE_INFO.IterationTimeInSeconds))
                }
              />,
              <LargeThermalBath
                count={
                  props.count *
                  (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Water')! /
                    LARGE_THERMAL_BATH_INFO.ProducePerMinute)
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
          <SausageMaker
            count={
              props.count *
              (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Sausage')! / SAUSAGE_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef4}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CiderMaker
            count={
              props.count *
              (POPULATION_PIONEERS_HUT_INFO.ConsumePerMinute.get('Cider')! / CIDER_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef5}>
          <AlternativeCombinationProvider combinationList={[]} />
        </Box>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
      <Arrow start={providerRef4} end={consumerRef} />
      <Arrow start={providerRef5} end={consumerRef} />
    </Box>
  )
}

export const PopulationPioneersHutButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={PioneersHutIcon}
      buildingElement={PopulationPioneersHut}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
