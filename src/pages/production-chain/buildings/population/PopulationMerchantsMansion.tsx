import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import MerchantsMansionIcon from '../../../../assets/icons/buildings/population/MerchantsMansion.png'
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
import { HARBOR_TAVERN_INFO, HarborTavern } from '../colonists/HarborTavern'
import { SCHOOL_INFO, School } from '../colonists/School'
import { CROCODILE_RANCH_INFO, CrocodileRanch } from '../farmers/CrocodileRanch'
import { ROAST_HOUSE_INFO, RoastHouse } from '../farmers/RoastHouse'
import { BATHHOUSE_INFO, Bathhouse } from '../merchants/Bathhouse'
import { GOLDSMITH_INFO, Goldsmith } from '../merchants/Goldsmith'
import { HATTERS_SHOP_INFO, HattersShop } from '../merchants/HattersShop'
import { HOSPITAL_INFO, Hospital } from '../merchants/Hospital'
import { PASTRY_MANUFACTURE_INFO, PastryManufacture } from '../merchants/PastryManufacture'
import { PERFUMERY_INFO, Perfumery } from '../merchants/Perfumery'
import { PIPEMAKERS_SHOP_INFO, PipemakersShop } from '../merchants/PipemakersShop'
import { TOWNHALL_INFO, Townhall } from '../merchants/Townhall'
import { CAVIAR_FACTORY_INFO, CaviarFactory } from '../northern-islands/CaviarFactory'
import { LARGE_THERMAL_BATH_INFO, LargeThermalBath } from '../paragons/LargeThermalBath'
import { SENATE_INFO, Senate } from '../paragons/Senate'
import { THEATRE_INFO, Theatre } from '../paragons/Theatre'
import { TREASURE_SEEKER_INFO, TreasureSeeker } from '../paragons/TreasureSeeker'
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

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Cauldron', 25 / 45400],
  ['Beer', 25 / 17900],
  ['Leather', 25 / 22100],
  ['Coffee', 25 / 20900],
  ['Jam', 25 / 13400],
  ['Water', 1],
  ['Community', 1],
  ['Education', 1],
  ['MedicalCare', 1],
  ['Hat', 25 / 8000],
  ['Pipe', 25 / 8800],
  ['Pastry', 25 / 8800],
  ['Caviar', 25 / 11800],
  ['GoldJewelry', 25 / 12400],
  ['Perfume', 25 / 12400],
  ['Administration', 1],
  ['Hygiene', 1],
])
const PRODUCE_PER_ITERATION = 1
export const POPULATION_MERCHANTS_MANSION_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Cauldron', CONSUME_PER_ITERATION.get('Cauldron')! / ITERATION_TIME_IN_DECIMAL],
    ['Beer', CONSUME_PER_ITERATION.get('Beer')! / ITERATION_TIME_IN_DECIMAL],
    ['Leather', CONSUME_PER_ITERATION.get('Leather')! / ITERATION_TIME_IN_DECIMAL],
    ['Coffee', CONSUME_PER_ITERATION.get('Coffee')! / ITERATION_TIME_IN_DECIMAL],
    ['Jam', CONSUME_PER_ITERATION.get('Jam')! / ITERATION_TIME_IN_DECIMAL],
    ['Water', CONSUME_PER_ITERATION.get('Water')! / ITERATION_TIME_IN_DECIMAL],
    ['Community', CONSUME_PER_ITERATION.get('Community')! / ITERATION_TIME_IN_DECIMAL],
    ['Education', CONSUME_PER_ITERATION.get('Education')! / ITERATION_TIME_IN_DECIMAL],
    ['MedicalCare', CONSUME_PER_ITERATION.get('MedicalCare')! / ITERATION_TIME_IN_DECIMAL],
    ['Hat', CONSUME_PER_ITERATION.get('Hat')! / ITERATION_TIME_IN_DECIMAL],
    ['Pipe', CONSUME_PER_ITERATION.get('Pipe')! / ITERATION_TIME_IN_DECIMAL],
    ['Pastry', CONSUME_PER_ITERATION.get('Pastry')! / ITERATION_TIME_IN_DECIMAL],
    ['Caviar', CONSUME_PER_ITERATION.get('Caviar')! / ITERATION_TIME_IN_DECIMAL],
    ['GoldJewelry', CONSUME_PER_ITERATION.get('GoldJewelry')! / ITERATION_TIME_IN_DECIMAL],
    ['Perfume', CONSUME_PER_ITERATION.get('Perfume')! / ITERATION_TIME_IN_DECIMAL],
    ['Administration', CONSUME_PER_ITERATION.get('Administration')! / ITERATION_TIME_IN_DECIMAL],
    ['Hygiene', CONSUME_PER_ITERATION.get('Hygiene')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PopulationMerchantsMansion = (props: { count: number }) => {
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
  const providerRef13 = useRef(null)
  const providerRef14 = useRef(null)
  const providerRef15 = useRef(null)
  const providerRef16 = useRef(null)
  const providerRef17 = useRef(null)
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
            src={MerchantsMansionIcon}
            title={capitalCase(PopulationMerchantsMansion.name)}
            alt={PopulationMerchantsMansion.name}
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
          <BoilerMaker
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Cauldron')! / BOILER_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Brewery
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Beer')! / BREWERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef3}>
          <AlternativeCombinationProvider
            combinationList={[
              <Tannery
                count={
                  (props.count * POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Leather')!) /
                  TANNERY_INFO.ProducePerMinute
                }
              />,
              <CrocodileRanch
                count={
                  (props.count * POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Leather')!) /
                  CROCODILE_RANCH_INFO.ProducePerMinute
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef4}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RoastHouse
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Coffee')! / ROAST_HOUSE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef5}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <JamMaker
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Jam')! / JAM_MAKER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef6}>
          <AlternativeCombinationProvider
            combinationList={[
              <Bathhouse
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Water')! /
                      (BATHHOUSE_INFO.ProducePerMinute * BATHHOUSE_INFO.IterationTimeInSeconds))
                )}
              />,
              <Cistern
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Water')! / CISTERN_INFO.ProducePerMinute)
                )}
              />,
              <Well
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Water')! / WELL_INFO.ProducePerMinute)
                )}
              />,
              <LargeThermalBath
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Water')! /
                      LARGE_THERMAL_BATH_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef7}>
          <AlternativeCombinationProvider
            combinationList={[
              <Tavern
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Community')! /
                      TAVERN_INFO.ProducePerMinute)
                )}
              />,
              <HarborTavern
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Community')! /
                      HARBOR_TAVERN_INFO.ProducePerMinute)
                )}
              />,
              <Fair
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Community')! / FAIR_INFO.ProducePerMinute)
                )}
              />,
              <Theatre
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Community')! /
                      THEATRE_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef8}>
          <AlternativeCombinationProvider
            combinationList={[
              <TownSchool
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Education')! /
                      (TOWN_SCHOOL_INFO.ProducePerMinute * TOWN_SCHOOL_INFO.IterationTimeInSeconds))
                )}
              />,
              <School
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Education')! /
                      SCHOOL_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef9}>
          <AlternativeCombinationProvider
            combinationList={[
              <Hospital
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('MedicalCare')! /
                      (HOSPITAL_INFO.ProducePerMinute * HOSPITAL_INFO.IterationTimeInSeconds))
                )}
              />,
              <Medicus
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('MedicalCare')! /
                      (MEDICUS_INFO.ProducePerMinute * MEDICUS_INFO.IterationTimeInSeconds))
                )}
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
          <HattersShop
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Hat')! / HATTERS_SHOP_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef11}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <PipemakersShop
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Pipe')! / PIPEMAKERS_SHOP_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef12}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <PastryManufacture
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Pastry')! /
                PASTRY_MANUFACTURE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef13}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CaviarFactory
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Caviar')! / CAVIAR_FACTORY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef14}>
          <AlternativeCombinationProvider
            combinationList={[
              <Goldsmith
                count={
                  props.count *
                  (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('GoldJewelry')! /
                    GOLDSMITH_INFO.ProducePerMinute)
                }
              />,
              <TreasureSeeker
                count={
                  props.count *
                  (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('GoldJewelry')! /
                    TREASURE_SEEKER_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef15}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Perfumery
            count={
              props.count *
              (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Perfume')! / PERFUMERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef16}>
          <AlternativeCombinationProvider
            combinationList={[
              <Townhall
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Administration')! /
                      (TOWNHALL_INFO.ProducePerMinute * TOWNHALL_INFO.IterationTimeInSeconds))
                )}
              />,
              <Senate
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Administration')! /
                      (SENATE_INFO.ProducePerMinute * SENATE_INFO.IterationTimeInSeconds))
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef17}>
          <AlternativeCombinationProvider
            combinationList={[
              <Bathhouse
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Hygiene')! /
                      (BATHHOUSE_INFO.ProducePerMinute * BATHHOUSE_INFO.IterationTimeInSeconds))
                )}
              />,
              <LargeThermalBath
                count={Math.ceil(
                  props.count *
                    (POPULATION_MERCHANTS_MANSION_INFO.ConsumePerMinute.get('Hygiene')! /
                      LARGE_THERMAL_BATH_INFO.ProducePerMinute)
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
      <Arrow start={providerRef13} end={consumerRef} />
      <Arrow start={providerRef14} end={consumerRef} />
      <Arrow start={providerRef15} end={consumerRef} />
      <Arrow start={providerRef16} end={consumerRef} />
      <Arrow start={providerRef17} end={consumerRef} />
    </Box>
  )
}

export const PopulationMerchantsMansionButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={MerchantsMansionIcon}
      buildingElement={PopulationMerchantsMansion}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
