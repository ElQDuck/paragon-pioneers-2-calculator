import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import ColonistIcon from '../../assets/icons/population/colonist.png'
import FarmerIcon from '../../assets/icons/population/farmer.png'
import MerchantIcon from '../../assets/icons/population/merchant.png'
import NorthernIslandIcon from '../../assets/icons/population/northernIsland.png'
import ParagonIcon from '../../assets/icons/population/paragon.png'
import PioneerIcon from '../../assets/icons/population/pioneer.png'
import TownsmanIcon from '../../assets/icons/population/townsman.png'
import WorkerIcon from '../../assets/icons/population/worker.png'
import { ToolbarStyle } from '../../assets/styling/Theme'
import PopulationSelectionButton from '../../common/PopulationSelectionButtons'
import { SettingsMenu } from './SettingsMenu'
import { ArcheryRangeButton } from './buildings/colonists/ArcheryRange'
import { AshHouseButton } from './buildings/colonists/AshHouse'
import { BakeryButton } from './buildings/colonists/Bakery'
import { BarracksButton } from './buildings/colonists/Barracks'
import { BerserkerHallButton } from './buildings/colonists/BerserkerHall'
import { BowyerButton } from './buildings/colonists/Bowyer'
import { CopperArmoryButton } from './buildings/colonists/CopperArmory'
import { CopperAxesmithButton } from './buildings/colonists/CopperAxesmith'
import { CopperMineButton } from './buildings/colonists/CopperMine'
import { CopperSmelterButton } from './buildings/colonists/CopperSmelter'
import { FlourMillButton } from './buildings/colonists/FlourMill'
import { FlourWindmillButton } from './buildings/colonists/FlourWindmill'
import { LimeKilnButton } from './buildings/colonists/LimeKiln'
import { LinseedFarmButton } from './buildings/colonists/LinseedFarm'
import { MortarBatchWorksButton } from './buildings/colonists/MortarBatchWorks'
import { RenderingWorksButton } from './buildings/colonists/RenderingWorks'
import { RickyardButton } from './buildings/colonists/Rickyard'
import { RoperyButton } from './buildings/colonists/Ropery'
import { SheepFarmButton } from './buildings/colonists/SheepFarm'
import { SoapMakerButton } from './buildings/colonists/SoapMaker'
import { StonecutterButton } from './buildings/colonists/Stonecutter'
import { TextileFactoryButton } from './buildings/colonists/TextileFactory'
import { WeaverButton } from './buildings/colonists/Weaver'
import { WheatFarmButton } from './buildings/colonists/WheatFarm'
import { ApothecaryButton } from './buildings/farmers/Apothecary'
import { BallMakerButton } from './buildings/farmers/BallMaker'
import { BeachFishermansHutButton } from './buildings/farmers/BeachFishermansHut'
import { BrickyardButton } from './buildings/farmers/Brickyard'
import { CigarManufactureButton } from './buildings/farmers/CigarManufacture'
import { ClayPitButton } from './buildings/farmers/ClayPit'
import { CoalMineTropicalButton } from './buildings/farmers/CoalMineTropical'
import { CoffeeHouseButton } from './buildings/farmers/CoffeeHouse'
import { CoffeePlantationButton } from './buildings/farmers/CoffeePlantation'
import { CopperMineTropicalButton } from './buildings/farmers/CopperMineTropical'
import { CopperSmelterTropicalButton } from './buildings/farmers/CopperSmelterTropical'
import { CrocodileRanchButton } from './buildings/farmers/CrocodileRanch'
import { DairyButton } from './buildings/farmers/Dairy'
import { FarmersShackButton } from './buildings/farmers/FarmersShack'
import { FiberMakerButton } from './buildings/farmers/FiberMaker'
import { FieldSurgeonHouseButton } from './buildings/farmers/FieldSurgeonHouse'
import { GoatFarmButton } from './buildings/farmers/GoatFarm'
import { PikemenBarracksButton } from './buildings/farmers/PikemenBarracks'
import { PoleturnersWorkshopButton } from './buildings/farmers/PoleturnersWorkshop'
import { RoastHouseButton } from './buildings/farmers/RoastHouse'
import { RoperyTropicalButton } from './buildings/farmers/RoperyTropical'
import { RumDistilleryButton } from './buildings/farmers/RumDistillery'
import { SalternTropicalButton } from './buildings/farmers/SalternTropical'
import { SportsGroundButton } from './buildings/farmers/SportsGround'
import { SugarCanePlantationButton } from './buildings/farmers/SugarCanePlantation'
import { SugarMillButton } from './buildings/farmers/SugarMill'
import { SugarWindmillButton } from './buildings/farmers/SugarWindmill'
import { TeaPlantationButton } from './buildings/farmers/TeaPlantation'
import { TobaccoFarmButton } from './buildings/farmers/TobaccoFarm'
import { WaterBuffaloRanchButton } from './buildings/farmers/WaterBuffaloRanch'
import { WhimHouseButton } from './buildings/farmers/WhimHouse'
import { ApiaryButton } from './buildings/merchants/Apiary'
import { ArcherAcademyButton } from './buildings/merchants/ArcherAcademy'
import { BathhouseButton } from './buildings/merchants/Bathhouse'
import { BrandyDistilleryButton } from './buildings/merchants/BrandyDistillery'
import { ButcheryButton } from './buildings/merchants/Butchery'
import { ChickenFarmButton } from './buildings/merchants/ChickenFarm'
import { CoiningPressButton } from './buildings/merchants/CoiningPress'
import { CompositeBowyerButton } from './buildings/merchants/CompositeBowyer'
import { CrossbowMakerButton } from './buildings/merchants/CrossbowMaker'
import { CrossbowShootingRangeButton } from './buildings/merchants/CrossbowShootingRange'
import { CuringHouseButton } from './buildings/merchants/CuringHouse'
import { DeepCopperMineButton } from './buildings/merchants/DeepCopperMine'
import { EssenceDistilleryButton } from './buildings/merchants/EssenceDistillery'
import { FeltmakingMillButton } from './buildings/merchants/FeltmakingMill'
import { ForestWardensCabinButton } from './buildings/merchants/ForestWardensCabin'
import { GoldSmelterButton } from './buildings/merchants/GoldSmelter'
import { GoldsmithButton } from './buildings/merchants/Goldsmith'
import { HattersShopButton } from './buildings/merchants/HattersShop'
import { HospitalButton } from './buildings/merchants/Hospital'
import { IronArmoryButton } from './buildings/merchants/IronArmory'
import { IronMineButton } from './buildings/merchants/IronMine'
import { IronSmelterButton } from './buildings/merchants/IronSmelter'
import { KnightBarracksButton } from './buildings/merchants/KnightBarracks'
import { MarbleQuarryButton } from './buildings/merchants/MarbleQuarry'
import { PastryManufactureButton } from './buildings/merchants/PastryManufacture'
import { PerfumeryButton } from './buildings/merchants/Perfumery'
import { PipemakersShopButton } from './buildings/merchants/PipemakersShop'
import { RoseCultivationButton } from './buildings/merchants/RoseCultivation'
import { SugarBeetFarmButton } from './buildings/merchants/SugarBeetFarm'
import { ToolmakerButton } from './buildings/merchants/Toolmaker'
import { TownhallButton } from './buildings/merchants/Townhall'
import { AmbergrisProductionButton } from './buildings/northern-islands/AmbergrisProduction'
import { BrassSmelterNorthButton } from './buildings/northern-islands/BrassSmelterNorth'
import { CaviarFactoryButton } from './buildings/northern-islands/CaviarFactory'
import { CoalMineNorthButton } from './buildings/northern-islands/CoalMineNorth'
import { ConiferLumberjackButton } from './buildings/northern-islands/ConiferLumberjack'
import { CopperMineNorthButton } from './buildings/northern-islands/CopperMineNorth'
import { CopperSmelterNorthButton } from './buildings/northern-islands/CopperSmelterNorth'
import { FurTrapperButton } from './buildings/northern-islands/FurTrapper'
import { GoldMineNorthButton } from './buildings/northern-islands/GoldMineNorth'
import { GoldSmelterNorthButton } from './buildings/northern-islands/GoldSmelterNorth'
import { HeatingPlantButton } from './buildings/northern-islands/HeatingPlant'
import { IronMineNorthButton } from './buildings/northern-islands/IronMineNorth'
import { IronSmelterNorthButton } from './buildings/northern-islands/IronSmelterNorth'
import { LargeHeatingPlantButton } from './buildings/northern-islands/LargeHeatingPlant'
import { LeadMineButton } from './buildings/northern-islands/LeadMine'
import { LeadSmelterButton } from './buildings/northern-islands/LeadSmelter'
import { MarbleQuarryNorthButton } from './buildings/northern-islands/MarbleQuarryNorth'
import { RockSaltMineNorthButton } from './buildings/northern-islands/RockSaltMineNorth'
import { SalmonFishermansHutButton } from './buildings/northern-islands/SalmonFishermansHut'
import { SaltWorksNorthButton } from './buildings/northern-islands/SaltWorksNorth'
import { SturgeonFarmButton } from './buildings/northern-islands/SturgeonFarm'
import { WhalerButton } from './buildings/northern-islands/Whaler'
import { ZincMineButton } from './buildings/northern-islands/ZincMine'
import { ZincSmelterButton } from './buildings/northern-islands/ZincSmelter'
import { ArmorsmithButton } from './buildings/paragons/Armorsmith'
import { BookbinderButton } from './buildings/paragons/Bookbinder'
import { BrassSmelterButton } from './buildings/paragons/BrassSmelter'
import { BrocadeSpinningFactoryButton } from './buildings/paragons/BrocadeSpinningFactory'
import { CannonFoundryButton } from './buildings/paragons/CannonFoundry'
import { CannoneersSchoolButton } from './buildings/paragons/CannoneersSchool'
import { ChandlerButton } from './buildings/paragons/Chandler'
import { CobblersShopButton } from './buildings/paragons/CobblersShop'
import { CokeryButton } from './buildings/paragons/Cokery'
import { ConfectioneryButton } from './buildings/paragons/Confectionery'
import { CooperButton } from './buildings/paragons/Cooper'
import { CuirassierAcademyButton } from './buildings/paragons/CuirassierAcademy'
import { FireworksMakerButton } from './buildings/paragons/FireworksMaker'
import { GalziersWorkshopButton } from './buildings/paragons/GalziersWorkshop'
import { GlassworksButton } from './buildings/paragons/Glassworks'
import { HoneyDistilleryButton } from './buildings/paragons/HoneyDistillery'
import { LanceMakerButton } from './buildings/paragons/LanceMaker'
import { LensGrinderButton } from './buildings/paragons/LensGrinder'
import { MusketMakerButton } from './buildings/paragons/MusketMaker'
import { MusketeerSchoolButton } from './buildings/paragons/MusketeerSchool'
import { OrnateTailorButton } from './buildings/paragons/OrnateTailor'
import { PaperMillButton } from './buildings/paragons/PaperMill'
import { PlaningMillButton } from './buildings/paragons/PlaningMill'
import { PowderMillButton } from './buildings/paragons/PowderMill'
import { QuartzQuarryButton } from './buildings/paragons/QuartzQuarry'
import { SalternButton } from './buildings/paragons/Saltern'
import { SenateButton } from './buildings/paragons/Senate'
import { SteelFurnaceButton } from './buildings/paragons/SteelFurnace'
import { TiltyardButton } from './buildings/paragons/Tiltyard'
import { TreasureSeekerButton } from './buildings/paragons/TreasureSeeker'
import { TrumpetMakerButton } from './buildings/paragons/TrumpetMaker'
import { UniversityButton } from './buildings/paragons/University'
import { WinepressButton } from './buildings/paragons/Winepress'
import { WineryButton } from './buildings/paragons/Winery'
import { BootCampButton } from './buildings/pioneers/BootCamp'
import { CiderMakerButton } from './buildings/pioneers/CiderMaker'
import { FishermansHutButton } from './buildings/pioneers/FishermansHut'
import { LumberjackButton } from './buildings/pioneers/Lumberjack'
import { PigRanchButton } from './buildings/pioneers/PigRanch'
import { PiggeryButton } from './buildings/pioneers/Piggery'
import { SausageMakerButton } from './buildings/pioneers/SausageMaker'
import { SawWorksButton } from './buildings/pioneers/SawWorks'
import { SawmillButton } from './buildings/pioneers/Sawmill'
import { PopulationColonistsHouseButton } from './buildings/population/PopulationColonistsHouse'
import { PopulationPioneersHutButton } from './buildings/population/PopulationPioneersHut'
import { BoilerMakerButton } from './buildings/townsmen/BoilerMaker'
import { BoilingHouseButton } from './buildings/townsmen/BoilingHouse'
import { BoulderGathererButton } from './buildings/townsmen/BoulderGatherer'
import { BreweryButton } from './buildings/townsmen/Brewery'
import { CattleRanchButton } from './buildings/townsmen/CattleRanch'
import { ChalkMakerButton } from './buildings/townsmen/ChalkMaker'
import { CharcoalKilnButton } from './buildings/townsmen/CharcoalKiln'
import { CoalMineButton } from './buildings/townsmen/CoalMine'
import { DrumMakerButton } from './buildings/townsmen/DrumMaker'
import { DrummersSchoolButton } from './buildings/townsmen/DrummersSchool'
import { FurrieryButton } from './buildings/townsmen/Furriery'
import { HopFarmButton } from './buildings/townsmen/HopFarm'
import { HorseBreederButton } from './buildings/townsmen/HorseBreeder'
import { JamMakerButton } from './buildings/townsmen/JamMaker'
import { LongbowArcheryRangeButton } from './buildings/townsmen/LongbowArcheryRange'
import { LongbowyerButton } from './buildings/townsmen/Longbowyer'
import { MalthouseButton } from './buildings/townsmen/Malthouse'
import { MedicusButton } from './buildings/townsmen/Medicus'
import { PaddockButton } from './buildings/townsmen/Paddock'
import { RidingArenaButton } from './buildings/townsmen/RidingArena'
import { RockSaltMineButton } from './buildings/townsmen/RockSaltMine'
import { SailmakerButton } from './buildings/townsmen/Sailmaker'
import { SaltWorksButton } from './buildings/townsmen/SaltWorks'
import { StrawberryFarmButton } from './buildings/townsmen/StrawberryFarm'
import { TanneryButton } from './buildings/townsmen/Tannery'
import { TownSchoolButton } from './buildings/townsmen/TownSchool'
import { ArtisticBlacksmithButton } from './buildings/workers/ArtisticBlacksmith'
import { BuffaloButcheryButton } from './buildings/workers/BuffaloButchery'
import { BuffaloPastureButton } from './buildings/workers/BuffaloPasture'
import { CacaoPlantationButton } from './buildings/workers/CacaoPlantation'
import { CemeteryButton } from './buildings/workers/Cemetery'
import { ChocolaterieButton } from './buildings/workers/Chocolaterie'
import { CoconutPlantationButton } from './buildings/workers/CoconutPlantation'
import { CostumierButton } from './buildings/workers/Costumier'
import { CottonPlantationButton } from './buildings/workers/CottonPlantation'
import { DancingSchoolButton } from './buildings/workers/DancingSchool'
import { FineWoodLoggerButton } from './buildings/workers/FineWoodLogger'
import { FlowerHouseButton } from './buildings/workers/FlowerHouse'
import { GemstoneMineButton } from './buildings/workers/GemstoneMine'
import { GlaiveSmithButton } from './buildings/workers/GlaiveSmith'
import { GlaiveTempleButton } from './buildings/workers/GlaiveTemple'
import { GoldMineTropicalButton } from './buildings/workers/GoldMineTropical'
import { GoldPannerButton } from './buildings/workers/GoldPanner'
import { GoldSmelterTropicalButton } from './buildings/workers/GoldSmelterTropical'
import { HeraldicArmourerButton } from './buildings/workers/HeraldicArmourer'
import { IndigoPlantationButton } from './buildings/workers/IndigoPlantation'
import { LuthierButton } from './buildings/workers/Luthier'
import { NitrateMakerButton } from './buildings/workers/NitrateMaker'
import { NobleTailorButton } from './buildings/workers/NobleTailor'
import { RickyardTropicalButton } from './buildings/workers/RickyardTropical'
import { ShieldGuardianTempleButton } from './buildings/workers/ShieldGuardianTemple'
import { SilkPlantationButton } from './buildings/workers/SilkPlantation'
import { SilkTwineMillButton } from './buildings/workers/SilkTwineMill'
import { SoupKitchenButton } from './buildings/workers/SoupKitchen'
import { SpinningMillButton } from './buildings/workers/SpinningMill'

export const ProductionChainPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pioneersVisible, setPioneersVisible] = useState(
    localStorage.getItem('pioneersVisible') === 'false' ? false : true
  )
  const [colonistsVisible, setColonistsVisible] = useState(
    localStorage.getItem('colonistsVisible') === 'true' ? true : false
  )
  const [townsmenVisible, setTownsmenVisible] = useState(
    localStorage.getItem('townsmenVisible') === 'true' ? true : false
  )
  const [merchantsVisible, setMerchantsVisible] = useState(
    localStorage.getItem('merchantsVisible') === 'true' ? true : false
  )
  const [paragonsVisible, setParagonsVisible] = useState(
    localStorage.getItem('paragonsVisible') === 'true' ? true : false
  )
  const [farmersVisible, setFarmersVisible] = useState(localStorage.getItem('farmersVisible') === 'true' ? true : false)
  const [workersVisible, setWorkersVisible] = useState(localStorage.getItem('workersVisible') === 'true' ? true : false)
  const [northernIslandsVisible, setNorthernIslandsVisible] = useState(
    localStorage.getItem('northernIslandsVisible') === 'true' ? true : false
  )

  const [productionChainMap, setProductionChainMap] = useState<Map<string, JSX.Element>>(new Map<string, JSX.Element>())

  const updateProductionChainMap = (name: string, prodChain: JSX.Element) => {
    setProductionChainMap(new Map(productionChainMap.set(name, prodChain)))
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setMenuOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={ToolbarStyle}>
            <PopulationSelectionButton
              iconPath={PioneerIcon}
              onClick={() => {
                setPioneersVisible(!pioneersVisible)
                localStorage.setItem('pioneersVisible', String(!pioneersVisible))
              }}
              enabled={pioneersVisible}
            />
            <PopulationSelectionButton
              iconPath={ColonistIcon}
              onClick={() => {
                setColonistsVisible(!colonistsVisible)
                localStorage.setItem('colonistsVisible', String(!colonistsVisible))
              }}
              enabled={colonistsVisible}
            />
            <PopulationSelectionButton
              iconPath={TownsmanIcon}
              onClick={() => {
                setTownsmenVisible(!townsmenVisible)
                localStorage.setItem('townsmenVisible', String(!townsmenVisible))
              }}
              enabled={townsmenVisible}
            />
            <PopulationSelectionButton
              iconPath={MerchantIcon}
              onClick={() => {
                setMerchantsVisible(!merchantsVisible)
                localStorage.setItem('merchantsVisible', String(!merchantsVisible))
              }}
              enabled={merchantsVisible}
            />
            <PopulationSelectionButton
              iconPath={ParagonIcon}
              onClick={() => {
                setParagonsVisible(!paragonsVisible)
                localStorage.setItem('paragonsVisible', String(!paragonsVisible))
              }}
              enabled={paragonsVisible}
            />
            <PopulationSelectionButton
              iconPath={FarmerIcon}
              onClick={() => {
                setFarmersVisible(!farmersVisible)
                localStorage.setItem('farmersVisible', String(!farmersVisible))
              }}
              enabled={farmersVisible}
            />
            <PopulationSelectionButton
              iconPath={WorkerIcon}
              onClick={() => {
                setWorkersVisible(!workersVisible)
                localStorage.setItem('workersVisible', String(!workersVisible))
              }}
              enabled={workersVisible}
            />
            <PopulationSelectionButton
              iconPath={NorthernIslandIcon}
              onClick={() => {
                setNorthernIslandsVisible(!northernIslandsVisible)
                localStorage.setItem('northernIslandsVisible', String(!northernIslandsVisible))
              }}
              enabled={northernIslandsVisible}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <SettingsMenu drawerOpen={menuOpen} setDrawerOpen={setMenuOpen} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Pioneers */}
        {pioneersVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <PopulationPioneersHutButton updateProductionChanFunction={updateProductionChainMap} />
            <LumberjackButton updateProductionChanFunction={updateProductionChainMap} />
            <FishermansHutButton updateProductionChanFunction={updateProductionChainMap} />
            <PiggeryButton updateProductionChanFunction={updateProductionChainMap} />
            <SausageMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <SawWorksButton updateProductionChanFunction={updateProductionChainMap} />
            <CiderMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <SawmillButton updateProductionChanFunction={updateProductionChainMap} />
            <BootCampButton updateProductionChanFunction={updateProductionChainMap} />
            <PigRanchButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}

        {/* Colonists */}
        {colonistsVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <PopulationColonistsHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <RenderingWorksButton updateProductionChanFunction={updateProductionChainMap} />
            <AshHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <SoapMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <SheepFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <WeaverButton updateProductionChanFunction={updateProductionChainMap} />
            <LinseedFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <BowyerButton updateProductionChanFunction={updateProductionChainMap} />
            <ArcheryRangeButton updateProductionChanFunction={updateProductionChainMap} />
            <RoperyButton updateProductionChanFunction={updateProductionChainMap} />
            <WheatFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <FlourMillButton updateProductionChanFunction={updateProductionChainMap} />
            <BakeryButton updateProductionChanFunction={updateProductionChainMap} />
            <StonecutterButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperMineButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperSmelterButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperArmoryButton updateProductionChanFunction={updateProductionChainMap} />
            <BarracksButton updateProductionChanFunction={updateProductionChainMap} />
            <LimeKilnButton updateProductionChanFunction={updateProductionChainMap} />
            <MortarBatchWorksButton updateProductionChanFunction={updateProductionChainMap} />
            <TextileFactoryButton updateProductionChanFunction={updateProductionChainMap} />
            <FlourWindmillButton updateProductionChanFunction={updateProductionChainMap} />
            <RickyardButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperAxesmithButton updateProductionChanFunction={updateProductionChainMap} />
            <BerserkerHallButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}

        {/* Townsmen */}
        {townsmenVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <BoilerMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <SailmakerButton updateProductionChanFunction={updateProductionChainMap} />
            <HopFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <MalthouseButton updateProductionChanFunction={updateProductionChainMap} />
            <BreweryButton updateProductionChanFunction={updateProductionChainMap} />
            <HorseBreederButton updateProductionChanFunction={updateProductionChainMap} />
            <RidingArenaButton updateProductionChanFunction={updateProductionChainMap} />
            <LongbowyerButton updateProductionChanFunction={updateProductionChainMap} />
            <LongbowArcheryRangeButton updateProductionChanFunction={updateProductionChainMap} />
            <CoalMineButton updateProductionChanFunction={updateProductionChainMap} />
            <BoilingHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <MedicusButton updateProductionChanFunction={updateProductionChainMap} />
            <CattleRanchButton updateProductionChanFunction={updateProductionChainMap} />
            <FurrieryButton updateProductionChanFunction={updateProductionChainMap} />
            <RockSaltMineButton updateProductionChanFunction={updateProductionChainMap} />
            <SaltWorksButton updateProductionChanFunction={updateProductionChainMap} />
            <TanneryButton updateProductionChanFunction={updateProductionChainMap} />
            <StrawberryFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <JamMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <BoulderGathererButton updateProductionChanFunction={updateProductionChainMap} />
            <CharcoalKilnButton updateProductionChanFunction={updateProductionChainMap} />
            <DrumMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <DrummersSchoolButton updateProductionChanFunction={updateProductionChainMap} />
            <ChalkMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <TownSchoolButton updateProductionChanFunction={updateProductionChainMap} />
            <PaddockButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}

        {/* Merchants */}
        {merchantsVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FeltmakingMillButton updateProductionChanFunction={updateProductionChainMap} />
            <HattersShopButton updateProductionChanFunction={updateProductionChainMap} />
            <ApiaryButton updateProductionChanFunction={updateProductionChainMap} />
            <TownhallButton updateProductionChanFunction={updateProductionChainMap} />
            <CuringHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <PipemakersShopButton updateProductionChanFunction={updateProductionChainMap} />
            <ChickenFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <ButcheryButton updateProductionChanFunction={updateProductionChainMap} />
            <PastryManufactureButton updateProductionChanFunction={updateProductionChainMap} />
            <IronMineButton updateProductionChanFunction={updateProductionChainMap} />
            <IronSmelterButton updateProductionChanFunction={updateProductionChainMap} />
            <ToolmakerButton updateProductionChanFunction={updateProductionChainMap} />
            <IronArmoryButton updateProductionChanFunction={updateProductionChainMap} />
            <KnightBarracksButton updateProductionChanFunction={updateProductionChainMap} />
            <CrossbowMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <CrossbowShootingRangeButton updateProductionChanFunction={updateProductionChainMap} />
            <GoldSmelterButton updateProductionChanFunction={updateProductionChainMap} />
            <GoldsmithButton updateProductionChanFunction={updateProductionChainMap} />
            <BathhouseButton updateProductionChanFunction={updateProductionChainMap} />
            <RoseCultivationButton updateProductionChanFunction={updateProductionChainMap} />
            <BrandyDistilleryButton updateProductionChanFunction={updateProductionChainMap} />
            <EssenceDistilleryButton updateProductionChanFunction={updateProductionChainMap} />
            <PerfumeryButton updateProductionChanFunction={updateProductionChainMap} />
            <MarbleQuarryButton updateProductionChanFunction={updateProductionChainMap} />
            <CompositeBowyerButton updateProductionChanFunction={updateProductionChainMap} />
            <ArcherAcademyButton updateProductionChanFunction={updateProductionChainMap} />
            <CoiningPressButton updateProductionChanFunction={updateProductionChainMap} />
            <SugarBeetFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <ForestWardensCabinButton updateProductionChanFunction={updateProductionChainMap} />
            <HospitalButton updateProductionChanFunction={updateProductionChainMap} />
            <DeepCopperMineButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}

        {/* Paragons */}
        {paragonsVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <BrassSmelterButton updateProductionChanFunction={updateProductionChainMap} />
            <CobblersShopButton updateProductionChanFunction={updateProductionChainMap} />
            <QuartzQuarryButton updateProductionChanFunction={updateProductionChainMap} />
            <GlassworksButton updateProductionChanFunction={updateProductionChainMap} />
            <LensGrinderButton updateProductionChanFunction={updateProductionChainMap} />
            <GalziersWorkshopButton updateProductionChanFunction={updateProductionChainMap} />
            <LanceMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <TiltyardButton updateProductionChanFunction={updateProductionChainMap} />
            <CokeryButton updateProductionChanFunction={updateProductionChainMap} />
            <SteelFurnaceButton updateProductionChanFunction={updateProductionChainMap} />
            <ArmorsmithButton updateProductionChanFunction={updateProductionChainMap} />
            <CuirassierAcademyButton updateProductionChanFunction={updateProductionChainMap} />
            <PaperMillButton updateProductionChanFunction={updateProductionChainMap} />
            <BookbinderButton updateProductionChanFunction={updateProductionChainMap} />
            <HoneyDistilleryButton updateProductionChanFunction={updateProductionChainMap} />
            <ConfectioneryButton updateProductionChanFunction={updateProductionChainMap} />
            <PowderMillButton updateProductionChanFunction={updateProductionChainMap} />
            <CannonFoundryButton updateProductionChanFunction={updateProductionChainMap} />
            <CannoneersSchoolButton updateProductionChanFunction={updateProductionChainMap} />
            <BrocadeSpinningFactoryButton updateProductionChanFunction={updateProductionChainMap} />
            <OrnateTailorButton updateProductionChanFunction={updateProductionChainMap} />
            <ChandlerButton updateProductionChanFunction={updateProductionChainMap} />
            <UniversityButton updateProductionChanFunction={updateProductionChainMap} />
            <WineryButton updateProductionChanFunction={updateProductionChainMap} />
            <CooperButton updateProductionChanFunction={updateProductionChainMap} />
            <WinepressButton updateProductionChanFunction={updateProductionChainMap} />
            <PlaningMillButton updateProductionChanFunction={updateProductionChainMap} />
            <FireworksMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <MusketMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <MusketeerSchoolButton updateProductionChanFunction={updateProductionChainMap} />
            <TrumpetMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <SenateButton updateProductionChanFunction={updateProductionChainMap} />
            <SalternButton updateProductionChanFunction={updateProductionChainMap} />
            <TreasureSeekerButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}

        {/* Farmers */}
        {farmersVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FiberMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <FarmersShackButton updateProductionChanFunction={updateProductionChainMap} />
            <BeachFishermansHutButton updateProductionChanFunction={updateProductionChainMap} />
            <TeaPlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <SugarCanePlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <RumDistilleryButton updateProductionChanFunction={updateProductionChainMap} />
            <SugarMillButton updateProductionChanFunction={updateProductionChainMap} />
            <CoffeePlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <RoastHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <CoffeeHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <RoperyTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <GoatFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <DairyButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperMineTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <CoalMineTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperSmelterTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <PoleturnersWorkshopButton updateProductionChanFunction={updateProductionChainMap} />
            <PikemenBarracksButton updateProductionChanFunction={updateProductionChainMap} />
            <TobaccoFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <CigarManufactureButton updateProductionChanFunction={updateProductionChainMap} />
            <BallMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <SportsGroundButton updateProductionChanFunction={updateProductionChainMap} />
            <ClayPitButton updateProductionChanFunction={updateProductionChainMap} />
            <BrickyardButton updateProductionChanFunction={updateProductionChainMap} />
            <SugarWindmillButton updateProductionChanFunction={updateProductionChainMap} />
            <CrocodileRanchButton updateProductionChanFunction={updateProductionChainMap} />
            <SalternTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <ApothecaryButton updateProductionChanFunction={updateProductionChainMap} />
            <FieldSurgeonHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <WaterBuffaloRanchButton updateProductionChanFunction={updateProductionChainMap} />
            <WhimHouseButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}

        {/* Workers */}
        {workersVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <CacaoPlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <ChocolaterieButton updateProductionChanFunction={updateProductionChainMap} />
            <FineWoodLoggerButton updateProductionChanFunction={updateProductionChainMap} />
            <CoconutPlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <SoupKitchenButton updateProductionChanFunction={updateProductionChainMap} />
            <GemstoneMineButton updateProductionChanFunction={updateProductionChainMap} />
            <GoldMineTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <GoldSmelterTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <ArtisticBlacksmithButton updateProductionChanFunction={updateProductionChainMap} />
            <GlaiveSmithButton updateProductionChanFunction={updateProductionChainMap} />
            <GlaiveTempleButton updateProductionChanFunction={updateProductionChainMap} />
            <FlowerHouseButton updateProductionChanFunction={updateProductionChainMap} />
            <CemeteryButton updateProductionChanFunction={updateProductionChainMap} />
            <SilkPlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <SilkTwineMillButton updateProductionChanFunction={updateProductionChainMap} />
            <NobleTailorButton updateProductionChanFunction={updateProductionChainMap} />
            <IndigoPlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <CostumierButton updateProductionChanFunction={updateProductionChainMap} />
            <DancingSchoolButton updateProductionChanFunction={updateProductionChainMap} />
            <LuthierButton updateProductionChanFunction={updateProductionChainMap} />
            <NitrateMakerButton updateProductionChanFunction={updateProductionChainMap} />
            <CottonPlantationButton updateProductionChanFunction={updateProductionChainMap} />
            <SpinningMillButton updateProductionChanFunction={updateProductionChainMap} />
            <RickyardTropicalButton updateProductionChanFunction={updateProductionChainMap} />
            <BuffaloPastureButton updateProductionChanFunction={updateProductionChainMap} />
            <HeraldicArmourerButton updateProductionChanFunction={updateProductionChainMap} />
            <ShieldGuardianTempleButton updateProductionChanFunction={updateProductionChainMap} />
            <BuffaloButcheryButton updateProductionChanFunction={updateProductionChainMap} />
            <GoldPannerButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}

        {/* Northern Islands */}
        {northernIslandsVisible ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <HeatingPlantButton updateProductionChanFunction={updateProductionChainMap} />
            <ConiferLumberjackButton updateProductionChanFunction={updateProductionChainMap} />
            <SalmonFishermansHutButton updateProductionChanFunction={updateProductionChainMap} />
            <CoalMineNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <LargeHeatingPlantButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperMineNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <CopperSmelterNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <SturgeonFarmButton updateProductionChanFunction={updateProductionChainMap} />
            <RockSaltMineNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <SaltWorksNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <CaviarFactoryButton updateProductionChanFunction={updateProductionChainMap} />
            <IronMineNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <IronSmelterNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <GoldMineNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <GoldSmelterNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <WhalerButton updateProductionChanFunction={updateProductionChainMap} />
            <AmbergrisProductionButton updateProductionChanFunction={updateProductionChainMap} />
            <MarbleQuarryNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <ZincMineButton updateProductionChanFunction={updateProductionChainMap} />
            <ZincSmelterButton updateProductionChanFunction={updateProductionChainMap} />
            <BrassSmelterNorthButton updateProductionChanFunction={updateProductionChainMap} />
            <LeadMineButton updateProductionChanFunction={updateProductionChainMap} />
            <LeadSmelterButton updateProductionChanFunction={updateProductionChainMap} />
            <FurTrapperButton updateProductionChanFunction={updateProductionChainMap} />
          </Box>
        ) : null}
      </Box>
      <Box>
        {productionChainMap.map((value) => {
          return value
        })}
      </Box>
    </>
  )
}
