import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import ColonistsHouseIcon from '../../../../assets/icons/buildings/population/ColonistsHouse.png'
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
import { BAKERY_INFO, Bakery } from '../colonists/Bakery'
import { HARBOR_TAVERN_INFO, HarborTavern } from '../colonists/HarborTavern'
import { SCHOOL_INFO, School } from '../colonists/School'
import { SOAP_MAKER_INFO, SoapMaker } from '../colonists/SoapMaker'
import { TEXTILE_FACTORY_INFO, TextileFactory } from '../colonists/TextileFactory'
import { WEAVER_INFO, Weaver } from '../colonists/Weaver'
import { BEACH_FISHERMANS_HUT_INFO, BeachFishermansHut } from '../farmers/BeachFishermansHut'
import { BATHHOUSE_INFO, Bathhouse } from '../merchants/Bathhouse'
import { SALMON_FISHERMANS_HUT_INFO, SalmonFishermansHut } from '../northern-islands/SalmonFishermansHut'
import { LARGE_THERMAL_BATH_INFO, LargeThermalBath } from '../paragons/LargeThermalBath'
import { THEATRE_INFO, Theatre } from '../paragons/Theatre'
import { CIDER_MAKER_INFO, CiderMaker } from '../pioneers/CiderMaker'
import { CISTERN_INFO, Cistern } from '../pioneers/Cistern'
import { FISHERMANS_HUT_INFO, FishermansHut } from '../pioneers/FishermansHut'
import { SAUSAGE_MAKER_INFO, SausageMaker } from '../pioneers/SausageMaker'
import { TAVERN_INFO, Tavern } from '../pioneers/Tavern'
import { WELL_INFO, Well } from '../pioneers/Well'
import { FAIR_INFO, Fair } from '../townsmen/Fair'
import { TOWN_SCHOOL_INFO, TownSchool } from '../townsmen/TownSchool'
import { SPINNING_MILL_INFO, SpinningMill } from '../workers/SpinningMill'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Fish', 15 / 3780],
  ['Water', 1],
  ['Sausage', 15 / 10800],
  ['Cider', 15 / 9450],
  ['Community', 1],
  ['Soap', 15 / 12600],
  ['Fabric', 15 / 20160],
  ['Bread', 15 / 16800],
  ['Education', 1],
])
const PRODUCE_PER_ITERATION = 1
export const POPULATION_COLONISTS_HOUSE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Fish', CONSUME_PER_ITERATION.get('Fish')! / ITERATION_TIME_IN_DECIMAL],
    ['Water', CONSUME_PER_ITERATION.get('Water')! / ITERATION_TIME_IN_DECIMAL],
    ['Sausage', CONSUME_PER_ITERATION.get('Sausage')! / ITERATION_TIME_IN_DECIMAL],
    ['Cider', CONSUME_PER_ITERATION.get('Cider')! / ITERATION_TIME_IN_DECIMAL],
    ['Community', CONSUME_PER_ITERATION.get('Community')! / ITERATION_TIME_IN_DECIMAL],
    ['Soap', CONSUME_PER_ITERATION.get('Soap')! / ITERATION_TIME_IN_DECIMAL],
    ['Fabric', CONSUME_PER_ITERATION.get('Fabric')! / ITERATION_TIME_IN_DECIMAL],
    ['Bread', CONSUME_PER_ITERATION.get('Bread')! / ITERATION_TIME_IN_DECIMAL],
    ['Education', CONSUME_PER_ITERATION.get('Education')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PopulationColonistsHouse = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  const providerRef4 = useRef(null)
  const providerRef5 = useRef(null)
  const providerRef6 = useRef(null)
  const providerRef7 = useRef(null)
  const providerRef8 = useRef(null)
  const providerRef9 = useRef(null)
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
            src={ColonistsHouseIcon}
            title={capitalCase(PopulationColonistsHouse.name)}
            alt={PopulationColonistsHouse.name}
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
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Fish')! / FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <BeachFishermansHut
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Fish')! /
                    BEACH_FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <SalmonFishermansHut
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Fish')! /
                    SALMON_FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <Cistern
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Water')! / CISTERN_INFO.ProducePerMinute)
                }
              />,
              <Well
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Water')! / WELL_INFO.ProducePerMinute)
                }
              />,
              <Bathhouse
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Water')! /
                    (BATHHOUSE_INFO.ProducePerMinute * BATHHOUSE_INFO.IterationTimeInSeconds))
                }
              />,
              <LargeThermalBath
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Water')! /
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
              (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Sausage')! / SAUSAGE_MAKER_INFO.ProducePerMinute)
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
              (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Cider')! / CIDER_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef5}>
          <AlternativeCombinationProvider
            combinationList={[
              <Tavern
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Community')! / TAVERN_INFO.ProducePerMinute)
                }
              />,
              <HarborTavern
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Community')! /
                    HARBOR_TAVERN_INFO.ProducePerMinute)
                }
              />,
              <Fair
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Community')! / FAIR_INFO.ProducePerMinute)
                }
              />,
              <Theatre
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Community')! / THEATRE_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef6}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <SoapMaker
            count={
              props.count *
              (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Soap')! / SOAP_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef7}>
          <AlternativeCombinationProvider
            combinationList={[
              <Weaver
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Fabric')! / WEAVER_INFO.ProducePerMinute)
                }
              />,
              <TextileFactory
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Fabric')! /
                    TEXTILE_FACTORY_INFO.ProducePerMinute)
                }
              />,
              <SpinningMill
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Fabric')! /
                    SPINNING_MILL_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef8}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Bakery
            count={
              props.count *
              (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Bread')! / BAKERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef9}>
          <AlternativeCombinationProvider
            combinationList={[
              <School
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Education')! / SCHOOL_INFO.ProducePerMinute)
                }
              />,
              <TownSchool
                count={
                  props.count *
                  (POPULATION_COLONISTS_HOUSE_INFO.ConsumePerMinute.get('Education')! /
                    (TOWN_SCHOOL_INFO.ProducePerMinute * TOWN_SCHOOL_INFO.IterationTimeInSeconds))
                }
              />,
            ]}
          />
        </Box>
      </Box>
      <Arrow start={providerRef1} end={consumerRef} />
      <Arrow start={providerRef2} end={consumerRef} />
      <Arrow start={providerRef3} end={consumerRef} />
      <Arrow start={providerRef4} end={consumerRef} />
      <Arrow start={providerRef5} end={consumerRef} />
      <Arrow start={providerRef6} end={consumerRef} />
      <Arrow start={providerRef7} end={consumerRef} />
      <Arrow start={providerRef8} end={consumerRef} />
      <Arrow start={providerRef9} end={consumerRef} />
    </Box>
  )
}

export const PopulationColonistsHouseButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ColonistsHouseIcon}
      buildingElement={PopulationColonistsHouse}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
