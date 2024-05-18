import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { capitalCase } from 'change-case'
import { useRef } from 'react'
import { globalInvertBuildingChainOrder } from '../../../../App'
import FarmersShackIcon from '../../../../assets/icons/buildings/population/FarmersShack.png'
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
import { STADIUM_INFO, Stadium } from '../workers/Stadium'

const ITERATION_TIME_IN_SECONDS = 1
const ITERATION_TIME_IN_DECIMAL = ITERATION_TIME_IN_SECONDS / 60
const CONSUME_PER_ITERATION = new Map<string, number>([
  ['Fish', 10 / 3300],
  ['Tea', 10 / 7000],
  ['Water', 1],
  ['Rum', 10 / 18900],
  ['Cheese', 10 / 11300],
  ['Cigar', 10 / 9500],
  ['Community', 1],
  ['Sports', 1],
])
const PRODUCE_PER_ITERATION = 1
export const POPULATION_FARMERS_SHACK_INFO: Building = {
  IterationTimeInSeconds: ITERATION_TIME_IN_SECONDS,
  IterationTimeInDecimal: ITERATION_TIME_IN_SECONDS / 60,
  ConsumePerIteration: CONSUME_PER_ITERATION,
  ConsumePerMinute: new Map<string, number>([
    ['Fish', CONSUME_PER_ITERATION.get('Fish')! / ITERATION_TIME_IN_DECIMAL],
    ['Tea', CONSUME_PER_ITERATION.get('Tea')! / ITERATION_TIME_IN_DECIMAL],
    ['Water', CONSUME_PER_ITERATION.get('Water')! / ITERATION_TIME_IN_DECIMAL],
    ['Rum', CONSUME_PER_ITERATION.get('Rum')! / ITERATION_TIME_IN_DECIMAL],
    ['Cheese', CONSUME_PER_ITERATION.get('Cheese')! / ITERATION_TIME_IN_DECIMAL],
    ['Cigar', CONSUME_PER_ITERATION.get('Cigar')! / ITERATION_TIME_IN_DECIMAL],
    ['Community', CONSUME_PER_ITERATION.get('Community')! / ITERATION_TIME_IN_DECIMAL],
    ['Sports', CONSUME_PER_ITERATION.get('Sports')! / ITERATION_TIME_IN_DECIMAL],
  ]),
  ProducePerIteration: PRODUCE_PER_ITERATION,
  ProducePerMinute: PRODUCE_PER_ITERATION / ITERATION_TIME_IN_DECIMAL,
}

export const PopulationFarmersShack = (props: { count: number }) => {
  const consumerRef = useRef(null)
  const providerRef1 = useRef(null)
  const providerRef2 = useRef(null)
  const providerRef3 = useRef(null)
  const providerRef4 = useRef(null)
  const providerRef5 = useRef(null)
  const providerRef6 = useRef(null)
  const providerRef7 = useRef(null)
  const providerRef8 = useRef(null)
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
            src={FarmersShackIcon}
            title={capitalCase(PopulationFarmersShack.name)}
            alt={PopulationFarmersShack.name}
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
                  (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Fish')! /
                    BEACH_FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <FishermansHut
                count={
                  props.count *
                  (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Fish')! / FISHERMANS_HUT_INFO.ProducePerMinute)
                }
              />,
              <SalmonFishermansHut
                count={
                  props.count *
                  (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Fish')! /
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
              (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Tea')! / TEA_PLANTATION_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Box ref={providerRef3}>
          <AlternativeCombinationProvider
            combinationList={[
              <Drywell
                count={Math.ceil(
                  props.count *
                    (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Water')! / DRYWELL_INFO.ProducePerMinute)
                )}
              />,
              <WhimHouse
                count={Math.ceil(
                  props.count *
                    (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Water')! /
                      (WHIM_HOUSE_INFO.ProducePerMinute * WHIM_HOUSE_INFO.IterationTimeInSeconds))
                )}
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
          <RumDistillery
            count={
              props.count *
              (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Rum')! / RUM_DISTILLERY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef5}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <Dairy
            count={
              props.count *
              (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Cheese')! / DAIRY_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef6}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CigarManufacture
            count={
              props.count *
              (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Cigar')! / CIGAR_MANUFACTURE_INFO.ProducePerMinute)
            }
          />
        </Paper>
        AND
        <Paper
          ref={providerRef7}
          elevation={2}
          sx={{ ...ProviderPaperStyle, alignItems: globalInvertBuildingChainOrder.value ? 'end' : 'start' }}
        >
          <CoffeeHouse
            count={Math.ceil(
              props.count *
                (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Community')! /
                  (COFFEE_HOUSE_INFO.ProducePerMinute * COFFEE_HOUSE_INFO.IterationTimeInSeconds))
            )}
          />
        </Paper>
        AND
        <Box ref={providerRef8}>
          <AlternativeCombinationProvider
            combinationList={[
              <SportsGround
                count={Math.ceil(
                  props.count *
                    (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Sports')! /
                      (SPORTS_GROUND_INFO.ProducePerMinute * SPORTS_GROUND_INFO.IterationTimeInSeconds))
                )}
              />,
              <Stadium
                count={Math.ceil(
                  props.count *
                    (POPULATION_FARMERS_SHACK_INFO.ConsumePerMinute.get('Sports')! / STADIUM_INFO.ProducePerMinute)
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
    </Box>
  )
}

export const PopulationFarmersShackButton = (props: { updateProductionChanFunction: Function }) => {
  return (
    <BuildingButton
      buttonIcon={FarmersShackIcon}
      buildingElement={PopulationFarmersShack}
      updateProductionChanFunction={props.updateProductionChanFunction}
    />
  )
}
