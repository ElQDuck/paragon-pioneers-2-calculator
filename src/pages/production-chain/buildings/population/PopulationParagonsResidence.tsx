import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import ParagonsResidenceIcon from '../../../../assets/icons/buildings/population/ParagonsResidence.png'
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
import { BATHHOUSE_INFO, Bathhouse } from '../merchants/Bathhouse'
import { GOLDSMITH_INFO, Goldsmith } from '../merchants/Goldsmith'
import { HOSPITAL_INFO, Hospital } from '../merchants/Hospital'
import { PASTRY_MANUFACTURE_INFO, PastryManufacture } from '../merchants/PastryManufacture'
import { PERFUMERY_INFO, Perfumery } from '../merchants/Perfumery'
import { PIPEMAKERS_SHOP_INFO, PipemakersShop } from '../merchants/PipemakersShop'
import { TOWNHALL_INFO, Townhall } from '../merchants/Townhall'
import { CAVIAR_FACTORY_INFO, CaviarFactory } from '../northern-islands/CaviarFactory'
import { BOOKBINDER_INFO, Bookbinder } from '../paragons/Bookbinder'
import { COBBLERS_SHOP_INFO, CobblersShop } from '../paragons/CobblersShop'
import { COIFFEUR_INFO, Coiffeur } from '../paragons/Coiffeur'
import { CONFECTIONERY_INFO, Confectionery } from '../paragons/Confectionery'
import { LARGE_THERMAL_BATH_INFO, LargeThermalBath } from '../paragons/LargeThermalBath'
import { LENS_GRINDER_INFO, LensGrinder } from '../paragons/LensGrinder'
import { ORNATE_TAILOR_INFO, OrnateTailor } from '../paragons/OrnateTailor'
import { SENATE_INFO, Senate } from '../paragons/Senate'
import { THEATRE_INFO, Theatre } from '../paragons/Theatre'
import { TILTYARD_INFO, Tiltyard } from '../paragons/Tiltyard'
import { TREASURE_SEEKER_INFO, TreasureSeeker } from '../paragons/TreasureSeeker'
import { UNIVERSITY_INFO, University } from '../paragons/University'
import { WINEPRESS_INFO, Winepress } from '../paragons/Winepress'
import { TAVERN_INFO, Tavern } from '../pioneers/Tavern'
import { FAIR_INFO, Fair } from '../townsmen/Fair'
import { MEDICUS_INFO, Medicus } from '../townsmen/Medicus'
import { TOWN_SCHOOL_INFO, TownSchool } from '../townsmen/TownSchool'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Pastry', 30 / 8800],
  ['Pipe', 30 / 8800],
  ['Caviar', 30 / 11800],
  ['GoldJewelry', 30 / 12400],
  ['Perfume', 30 / 12400],
  ['Community', 1],
  ['Education', 1],
  ['MedicalCare', 1],
  ['Administration', 1],
  ['Hygiene', 1],
  ['Shoe', 30 / 6800],
  ['Glasses', 30 / 5600],
  ['Book', 30 / 16200],
  ['ChocolateCandy', 30 / 8100],
  ['NobleGarment', 30 / 16200],
  ['Wine', 30 / 4120],
  ['Coiffeur', 1],
  ['Entertainment', 1],
  ['HigherEducation', 1],
  ['Gambling', 1],
])
const PRODUCE_PER_ITERATION = 1
export const POPULATION_PARAGONS_RESIDENCE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Pastry', CONSUME_PER_ITERATION.get('Pastry')! / ITERATION_TIME_IN_DECIMAL],
    ['Pipe', CONSUME_PER_ITERATION.get('Pipe')! / ITERATION_TIME_IN_DECIMAL],
    ['Caviar', CONSUME_PER_ITERATION.get('Caviar')! / ITERATION_TIME_IN_DECIMAL],
    ['GoldJewelry', CONSUME_PER_ITERATION.get('GoldJewelry')! / ITERATION_TIME_IN_DECIMAL],
    ['Perfume', CONSUME_PER_ITERATION.get('Perfume')! / ITERATION_TIME_IN_DECIMAL],
    ['Community', CONSUME_PER_ITERATION.get('Community')! / ITERATION_TIME_IN_DECIMAL],
    ['Education', CONSUME_PER_ITERATION.get('Education')! / ITERATION_TIME_IN_DECIMAL],
    ['MedicalCare', CONSUME_PER_ITERATION.get('MedicalCare')! / ITERATION_TIME_IN_DECIMAL],
    ['Administration', CONSUME_PER_ITERATION.get('Administration')! / ITERATION_TIME_IN_DECIMAL],
    ['Hygiene', CONSUME_PER_ITERATION.get('Hygiene')! / ITERATION_TIME_IN_DECIMAL],
    ['Shoe', CONSUME_PER_ITERATION.get('Shoe')! / ITERATION_TIME_IN_DECIMAL],
    ['Glasses', CONSUME_PER_ITERATION.get('Glasses')! / ITERATION_TIME_IN_DECIMAL],
    ['Book', CONSUME_PER_ITERATION.get('Book')! / ITERATION_TIME_IN_DECIMAL],
    ['ChocolateCandy', CONSUME_PER_ITERATION.get('ChocolateCandy')! / ITERATION_TIME_IN_DECIMAL],
    ['NobleGarment', CONSUME_PER_ITERATION.get('NobleGarment')! / ITERATION_TIME_IN_DECIMAL],
    ['Wine', CONSUME_PER_ITERATION.get('Wine')! / ITERATION_TIME_IN_DECIMAL],
    ['Coiffeur', CONSUME_PER_ITERATION.get('Coiffeur')! / ITERATION_TIME_IN_DECIMAL],
    ['Entertainment', CONSUME_PER_ITERATION.get('Entertainment')! / ITERATION_TIME_IN_DECIMAL],
    ['HigherEducation', CONSUME_PER_ITERATION.get('HigherEducation')! / ITERATION_TIME_IN_DECIMAL],
    ['Gambling', CONSUME_PER_ITERATION.get('Gambling')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PopulationParagonsResidence = (props: { count: number }) => {
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
  const providerRef18 = useRef(null)
  const providerRef19 = useRef(null)
  const providerRef20 = useRef(null)
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
            src={ParagonsResidenceIcon}
            title={capitalCase(PopulationParagonsResidence.name)}
            alt={PopulationParagonsResidence.name}
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
          <PastryManufacture
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Pastry')! /
                PASTRY_MANUFACTURE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef2}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <PipemakersShop
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Pipe')! / PIPEMAKERS_SHOP_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef3}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CaviarFactory
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Caviar')! /
                CAVIAR_FACTORY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef4}>
          <AlternativeCombinationProvider
            combinationList={[
              <Goldsmith
                count={
                  props.count *
                  (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('GoldJewelry')! /
                    GOLDSMITH_INFO.ProducePerMinute)
                }
              />,
              <TreasureSeeker
                count={
                  props.count *
                  (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('GoldJewelry')! /
                    TREASURE_SEEKER_INFO.ProducePerMinute)
                }
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef5}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Perfumery
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Perfume')! / PERFUMERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef6}>
          <AlternativeCombinationProvider
            combinationList={[
              <Theatre
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Community')! /
                      THEATRE_INFO.ProducePerMinute)
                )}
              />,
              <Tavern
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Community')! /
                      TAVERN_INFO.ProducePerMinute)
                )}
              />,
              <HarborTavern
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Community')! /
                      HARBOR_TAVERN_INFO.ProducePerMinute)
                )}
              />,
              <Fair
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Community')! / FAIR_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef7}>
          <AlternativeCombinationProvider
            combinationList={[
              <TownSchool
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Education')! /
                      (TOWN_SCHOOL_INFO.ProducePerMinute * TOWN_SCHOOL_INFO.IterationTimeInSeconds))
                )}
              />,
              <School
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Education')! /
                      SCHOOL_INFO.ProducePerMinute)
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef8}>
          <AlternativeCombinationProvider
            combinationList={[
              <Hospital
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('MedicalCare')! /
                      (HOSPITAL_INFO.ProducePerMinute * HOSPITAL_INFO.IterationTimeInSeconds))
                )}
              />,
              <Medicus
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('MedicalCare')! /
                      (MEDICUS_INFO.ProducePerMinute * MEDICUS_INFO.IterationTimeInSeconds))
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef9}>
          <AlternativeCombinationProvider
            combinationList={[
              <Senate
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Administration')! /
                      (SENATE_INFO.ProducePerMinute * SENATE_INFO.IterationTimeInSeconds))
                )}
              />,
              <Townhall
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Administration')! /
                      (TOWNHALL_INFO.ProducePerMinute * TOWNHALL_INFO.IterationTimeInSeconds))
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Box ref={providerRef10}>
          <AlternativeCombinationProvider
            combinationList={[
              <LargeThermalBath
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Hygiene')! /
                      LARGE_THERMAL_BATH_INFO.ProducePerMinute)
                )}
              />,
              <Bathhouse
                count={Math.ceil(
                  props.count *
                    (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Hygiene')! /
                      (BATHHOUSE_INFO.ProducePerMinute * BATHHOUSE_INFO.IterationTimeInSeconds))
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef11}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CobblersShop
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Shoe')! / COBBLERS_SHOP_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef12}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <LensGrinder
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Glasses')! / LENS_GRINDER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef13}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Bookbinder
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Book')! / BOOKBINDER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef14}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Confectionery
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('ChocolateCandy')! /
                CONFECTIONERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef15}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <OrnateTailor
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('NobleGarment')! /
                ORNATE_TAILOR_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef16}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Winepress
            count={
              props.count *
              (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Wine')! / WINEPRESS_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef17}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Coiffeur
            count={Math.ceil(
              props.count *
                (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Coiffeur')! / COIFFEUR_INFO.ProducePerMinute)
            )}
          />
        </Paper>
        AND
        <Paper
          ref={providerRef18}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Theatre
            count={Math.ceil(
              props.count *
                (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Entertainment')! /
                  THEATRE_INFO.ProducePerMinute)
            )}
          />
        </Paper>
        AND
        <Paper
          ref={providerRef19}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <University
            count={Math.ceil(
              props.count *
                (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('HigherEducation')! /
                  (UNIVERSITY_INFO.ProducePerMinute * UNIVERSITY_INFO.IterationTimeInSeconds))
            )}
          />
        </Paper>
        AND
        <Paper
          ref={providerRef20}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Tiltyard
            count={Math.ceil(
              props.count *
                (POPULATION_PARAGONS_RESIDENCE_INFO.ConsumePerMinute.get('Gambling')! /
                  (TILTYARD_INFO.ProducePerMinute * TILTYARD_INFO.IterationTimeInSeconds))
            )}
          />
        </Paper>
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
      <Arrow start={providerRef18} end={consumerRef} />
      <Arrow start={providerRef19} end={consumerRef} />
      <Arrow start={providerRef20} end={consumerRef} />
    </Box>
  )
}

export const PopulationParagonsResidenceButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={ParagonsResidenceIcon}
      buildingElement={PopulationParagonsResidence}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
