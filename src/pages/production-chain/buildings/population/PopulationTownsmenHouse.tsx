import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import TownsmenHouseIcon from '../../../../assets/icons/buildings/population/TownsmenHouse.png'
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
import { CROCODILE_RANCH_INFO, CrocodileRanch } from '../farmers/CrocodileRanch'
import { ROAST_HOUSE_INFO, RoastHouse } from '../farmers/RoastHouse'
import { BATHHOUSE_INFO, Bathhouse } from '../merchants/Bathhouse'
import { HOSPITAL_INFO, Hospital } from '../merchants/Hospital'
import { LARGE_THERMAL_BATH_INFO, LargeThermalBath } from '../paragons/LargeThermalBath'
import { THEATRE_INFO, Theatre } from '../paragons/Theatre'
import { CISTERN_INFO, Cistern } from '../pioneers/Cistern'
import { TAVERN_INFO, Tavern } from '../pioneers/Tavern'
import { WELL_INFO, Well } from '../pioneers/Well'
import { BOILER_MAKER_INFO, BoilerMaker } from '../townsmen/BoilerMaker'
import { BREWERY_INFO, Brewery } from '../townsmen/Brewery'
import { FAIR_INFO, Fair } from '../townsmen/Fair'
import { JAM_MAKER_INFO, JamMaker } from '../townsmen/JamMaker'
import { MEDICUS_INFO, Medicus } from '../townsmen/Medicus'
import { TANNERY_INFO, Tannery } from '../townsmen/Tannery'
import { TOWN_SCHOOL_INFO, TownSchool } from '../townsmen/TownSchool'
import { SPINNING_MILL_INFO, SpinningMill } from '../workers/SpinningMill'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Soap', 20 / 12600],
  ['Fabric', 20 / 20160],
  ['Bread', 20 / 16800],
  ['Water', 1],
  ['Community', 1],
  ['Education', 1],
  ['Cauldron', 20 / 45400],
  ['Beer', 20 / 17900],
  ['Leather', 20 / 22100],
  ['Coffee', 20 / 20900],
  ['Jam', 20 / 13400],
  ['MedicalCare', 1],
])
const PRODUCE_PER_ITERATION = 1
export const POPULATION_TOWNSMEN_HOUSE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Soap', CONSUME_PER_ITERATION.get('Soap')! / ITERATION_TIME_IN_DECIMAL],
    ['Fabric', CONSUME_PER_ITERATION.get('Fabric')! / ITERATION_TIME_IN_DECIMAL],
    ['Bread', CONSUME_PER_ITERATION.get('Bread')! / ITERATION_TIME_IN_DECIMAL],
    ['Water', CONSUME_PER_ITERATION.get('Water')! / ITERATION_TIME_IN_DECIMAL],
    ['Community', CONSUME_PER_ITERATION.get('Community')! / ITERATION_TIME_IN_DECIMAL],
    ['Education', CONSUME_PER_ITERATION.get('Education')! / ITERATION_TIME_IN_DECIMAL],
    ['Cauldron', CONSUME_PER_ITERATION.get('Cauldron')! / ITERATION_TIME_IN_DECIMAL],
    ['Beer', CONSUME_PER_ITERATION.get('Beer')! / ITERATION_TIME_IN_DECIMAL],
    ['Leather', CONSUME_PER_ITERATION.get('Leather')! / ITERATION_TIME_IN_DECIMAL],
    ['Coffee', CONSUME_PER_ITERATION.get('Coffee')! / ITERATION_TIME_IN_DECIMAL],
    ['Jam', CONSUME_PER_ITERATION.get('Jam')! / ITERATION_TIME_IN_DECIMAL],
    ['MedicalCare', CONSUME_PER_ITERATION.get('MedicalCare')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PopulationTownsmenHouse = (props: { count: number }) => {
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
  const providerRef10 = useRef(null)
  const providerRef11 = useRef(null)
  const providerRef12 = useRef(null)
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
            src={TownsmenHouseIcon}
            title={capitalCase(PopulationTownsmenHouse.name)}
            alt={PopulationTownsmenHouse.name}
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
          <SoapMaker
            count={
              props.count *
              (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Soap')! / SOAP_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef2}>
          <AlternativeCombinationProvider
            combinationList={[
              <Weaver
                count={
                  props.count *
                  (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Fabric')! / WEAVER_INFO.ProducePerMinute)
                }
              />,
              <TextileFactory
                count={
                  props.count *
                  (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Fabric')! /
                    TEXTILE_FACTORY_INFO.ProducePerMinute)
                }
              />,
              <SpinningMill
                count={
                  props.count *
                  (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Fabric')! / SPINNING_MILL_INFO.ProducePerMinute)
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
          <Bakery
            count={
              props.count *
              (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Bread')! / BAKERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef4}>
          <AlternativeCombinationProvider
            combinationList={[
              <Cistern
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Water')! / CISTERN_INFO.ProducePerMinute)
                )}
              />,
              <Well
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Water')! / WELL_INFO.ProducePerMinute)
                )}
              />,
              <Bathhouse
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Water')! /
                      (BATHHOUSE_INFO.ProducePerMinute * BATHHOUSE_INFO.IterationTimeInSeconds))
                )}
              />,
              <LargeThermalBath
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Water')! /
                      LARGE_THERMAL_BATH_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef5}>
          <AlternativeCombinationProvider
            combinationList={[
              <Tavern
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Community')! / TAVERN_INFO.ProducePerMinute)
                )}
              />,
              <HarborTavern
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Community')! /
                      HARBOR_TAVERN_INFO.ProducePerMinute)
                )}
              />,
              <Fair
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Community')! / FAIR_INFO.ProducePerMinute)
                )}
              />,
              <Theatre
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Community')! / THEATRE_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef6}>
          <AlternativeCombinationProvider
            combinationList={[
              <TownSchool
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Education')! /
                      (TOWN_SCHOOL_INFO.ProducePerMinute * TOWN_SCHOOL_INFO.IterationTimeInSeconds))
                )}
              />,
              <School
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Education')! / SCHOOL_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef7}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <BoilerMaker
            count={
              props.count *
              (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Cauldron')! / BOILER_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef8}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Brewery
            count={
              props.count *
              (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Beer')! / BREWERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef9}>
          <AlternativeCombinationProvider
            combinationList={[
              <Tannery
                count={
                  (props.count * POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Leather')!) /
                  TANNERY_INFO.ProducePerMinute
                }
              />,
              <CrocodileRanch
                count={
                  (props.count * POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Leather')!) /
                  CROCODILE_RANCH_INFO.ProducePerMinute
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef10}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RoastHouse
            count={
              props.count *
              (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Coffee')! / ROAST_HOUSE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef11}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <JamMaker
            count={
              props.count *
              (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('Jam')! / JAM_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef12}>
          <AlternativeCombinationProvider
            combinationList={[
              <Medicus
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('MedicalCare')! /
                      (MEDICUS_INFO.ProducePerMinute * MEDICUS_INFO.IterationTimeInSeconds))
                )}
              />,
              <Hospital
                count={Math.ceil(
                  props.count *
                    (POPULATION_TOWNSMEN_HOUSE_INFO.ConsumePerMinute.get('MedicalCare')! /
                      (HOSPITAL_INFO.ProducePerMinute * HOSPITAL_INFO.IterationTimeInSeconds))
                )}
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
      <Arrow start={providerRef10} end={consumerRef} />
      <Arrow start={providerRef11} end={consumerRef} />
      <Arrow start={providerRef12} end={consumerRef} />
    </Box>
  )
}

export const PopulationTownsmenHouseButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={TownsmenHouseIcon}
      buildingElement={PopulationTownsmenHouse}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
