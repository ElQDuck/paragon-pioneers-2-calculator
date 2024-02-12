import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import WorkersHouseIcon from '../../../../assets/icons/buildings/population/WorkersHouse.png'
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
import { CIGAR_MANUFACTURE_INFO, CigarManufacture } from '../farmers/CigarManufacture'
import { COFFEE_HOUSE_INFO, CoffeeHouse } from '../farmers/CoffeeHouse'
import { DAIRY_INFO, Dairy } from '../farmers/Dairy'
import { DRYWELL_INFO, Drywell } from '../farmers/Drywell'
import { RUM_DISTILLERY_INFO, RumDistillery } from '../farmers/RumDistillery'
import { SPORTS_GROUND_INFO, SportsGround } from '../farmers/SportsGround'
import { TEA_PLANTATION_INFO, TeaPlantation } from '../farmers/TeaPlantation'
import { WHIM_HOUSE_INFO, WhimHouse } from '../farmers/WhimHouse'
import { SALMON_FISHERMANS_HUT_INFO, SalmonFishermansHut } from '../northern-islands/SalmonFishermansHut'
import { FISHERMANS_HUT_INFO, FishermansHut } from '../pioneers/FishermansHut'
import { BREWERY_INFO, Brewery } from '../townsmen/Brewery'
import { ARTISTIC_BLACKSMITH_INFO, ArtisticBlacksmith } from '../workers/ArtisticBlacksmith'
import { CEMETERY_INFO, Cemetery } from '../workers/Cemetery'
import { CHOCOLATERIE_INFO, Chocolaterie } from '../workers/Chocolaterie'
import { DANCING_SCHOOL_INFO, DancingSchool } from '../workers/DancingSchool'
import { LUTHIER_INFO, Luthier } from '../workers/Luthier'
import { MARKET_HALL_INFO, MarketHall } from '../workers/MarketHall'
import { NOBLE_TAILOR_INFO, NobleTailor } from '../workers/NobleTailor'
import { SOUP_KITCHEN_INFO, SoupKitchen } from '../workers/SoupKitchen'
import { STADIUM_INFO, Stadium } from '../workers/Stadium'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Fish', 20 / 3300],
  ['Tea', 20 / 6300],
  ['Rum', 20 / 18900],
  ['Cheese', 20 / 11300],
  ['Cigar', 20 / 9500],
  ['Water', 1],
  ['Community', 1],
  ['Sports', 1],
  ['Beer', 20 / 16400],
  ['Chocolate', 20 / 12300],
  ['Stew', 20 / 5500],
  ['Mojo', 20 / 12300],
  ['Garment', 20 / 12300],
  ['Guitar', 20 / 8200],
  ['Trading', 1],
  ['Cemetery', 1],
  ['Entertainment', 1],
])
const PRODUCE_PER_ITERATION = 1
export const POPULATION_WORKERS_HOUSE_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Fish', CONSUME_PER_ITERATION.get('Fish')! / ITERATION_TIME_IN_DECIMAL],
    ['Tea', CONSUME_PER_ITERATION.get('Tea')! / ITERATION_TIME_IN_DECIMAL],
    ['Rum', CONSUME_PER_ITERATION.get('Rum')! / ITERATION_TIME_IN_DECIMAL],
    ['Cheese', CONSUME_PER_ITERATION.get('Cheese')! / ITERATION_TIME_IN_DECIMAL],
    ['Cigar', CONSUME_PER_ITERATION.get('Cigar')! / ITERATION_TIME_IN_DECIMAL],
    ['Water', CONSUME_PER_ITERATION.get('Water')! / ITERATION_TIME_IN_DECIMAL],
    ['Community', CONSUME_PER_ITERATION.get('Community')! / ITERATION_TIME_IN_DECIMAL],
    ['Sports', CONSUME_PER_ITERATION.get('Sports')! / ITERATION_TIME_IN_DECIMAL],
    ['Beer', CONSUME_PER_ITERATION.get('Beer')! / ITERATION_TIME_IN_DECIMAL],
    ['Chocolate', CONSUME_PER_ITERATION.get('Chocolate')! / ITERATION_TIME_IN_DECIMAL],
    ['Stew', CONSUME_PER_ITERATION.get('Stew')! / ITERATION_TIME_IN_DECIMAL],
    ['Mojo', CONSUME_PER_ITERATION.get('Mojo')! / ITERATION_TIME_IN_DECIMAL],
    ['Garment', CONSUME_PER_ITERATION.get('Garment')! / ITERATION_TIME_IN_DECIMAL],
    ['Guitar', CONSUME_PER_ITERATION.get('Guitar')! / ITERATION_TIME_IN_DECIMAL],
    ['Trading', CONSUME_PER_ITERATION.get('Trading')! / ITERATION_TIME_IN_DECIMAL],
    ['Cemetery', CONSUME_PER_ITERATION.get('Cemetery')! / ITERATION_TIME_IN_DECIMAL],
    ['Entertainment', CONSUME_PER_ITERATION.get('Entertainment')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PopulationWorkersHouse = (props: { count: number }) => {
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
            src={WorkersHouseIcon}
            title={capitalCase(PopulationWorkersHouse.name)}
            alt={PopulationWorkersHouse.name}
            sx={BuildingImageSize}
          />
          {Number(props.count.toFixed(2))}
        </Box>
      </Paper>
      <Box sx={{ ...ProviderBoxStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}>
        <Box ref={providerRef1}>
          <AlternativeCombinationProvider
            combinationList={[
              <BeachFishermansHut
                count={
                  props.count *
                  (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Fish')! /
                    BEACH_FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <FishermansHut
                count={
                  props.count *
                  (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Fish')! / FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <SalmonFishermansHut
                count={
                  props.count *
                  (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Fish')! /
                    SALMON_FISHERMANS_HUT_INFO.ProducePerMinute)
                }
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
          <TeaPlantation
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Tea')! / TEA_PLANTATION_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef3}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <RumDistillery
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Rum')! / RUM_DISTILLERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef4}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Dairy
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Cheese')! / DAIRY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef5}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CigarManufacture
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Cigar')! / CIGAR_MANUFACTURE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef6}>
          <AlternativeCombinationProvider
            combinationList={[
              <WhimHouse
                count={Math.ceil(
                  props.count *
                    (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Water')! /
                      (WHIM_HOUSE_INFO.ProducePerMinute * WHIM_HOUSE_INFO.IterationTimeInSeconds))
                )}
              />,
              <Drywell
                count={Math.ceil(
                  props.count *
                    (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Water')! / DRYWELL_INFO.ProducePerMinute)
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
          <CoffeeHouse
            count={Math.ceil(
              props.count *
                (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Community')! /
                  (COFFEE_HOUSE_INFO.ProducePerMinute * COFFEE_HOUSE_INFO.IterationTimeInSeconds))
            )}
          />
        </Paper>
        AND
        <Box ref={providerRef8}>
          <AlternativeCombinationProvider
            combinationList={[
              <Stadium
                count={Math.ceil(
                  props.count *
                    (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Sports')! / STADIUM_INFO.ProducePerMinute)
                )}
              />,
              <SportsGround
                count={Math.ceil(
                  props.count *
                    (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Sports')! /
                      (SPORTS_GROUND_INFO.ProducePerMinute * SPORTS_GROUND_INFO.IterationTimeInSeconds))
                )}
              />,
            ]}
          />
        </Box>
        AND
        <Paper
          ref={providerRef9}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Brewery
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Beer')! / BREWERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef10}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Chocolaterie
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Chocolate')! / CHOCOLATERIE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef11}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <SoupKitchen
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Stew')! / SOUP_KITCHEN_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef12}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <ArtisticBlacksmith
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Mojo')! / ARTISTIC_BLACKSMITH_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef13}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <NobleTailor
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Garment')! / NOBLE_TAILOR_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef14}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Luthier
            count={
              props.count *
              (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Guitar')! / LUTHIER_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef15}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <MarketHall
            count={Math.ceil(
              props.count *
                (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Trading')! / MARKET_HALL_INFO.ProducePerMinute)
            )}
          />
        </Paper>
        AND
        <Paper
          ref={providerRef16}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Cemetery
            count={Math.ceil(
              props.count *
                (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Cemetery')! /
                  (CEMETERY_INFO.ProducePerMinute * CEMETERY_INFO.IterationTimeInSeconds))
            )}
          />
        </Paper>
        AND
        <Paper
          ref={providerRef17}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <DancingSchool
            count={Math.ceil(
              props.count *
                (POPULATION_WORKERS_HOUSE_INFO.ConsumePerMinute.get('Entertainment')! /
                  (DANCING_SCHOOL_INFO.ProducePerMinute * DANCING_SCHOOL_INFO.IterationTimeInSeconds))
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
    </Box>
  )
}

export const PopulationWorkersHouseButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={WorkersHouseIcon}
      buildingElement={PopulationWorkersHouse}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
