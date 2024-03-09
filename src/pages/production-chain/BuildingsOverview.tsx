import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

export const BuildingsOverview = (props: { buildingSummery: Map<string, { buildingName: string; count: number }> }) => {
  const [productionChainMap, setProductionChainMap] = useState<Map<string, number>>(new Map<string, number>())

  useEffect(() => {
    productionChainMap.clear()
    props.buildingSummery.map((building) => {
      productionChainMap.has(building.buildingName)
        ? setProductionChainMap(
            new Map(
              productionChainMap.set(
                building.buildingName,
                productionChainMap.get(building.buildingName)! + building.count
              )
            )
          )
        : setProductionChainMap(new Map(productionChainMap.set(building.buildingName, building.count)))
    })
  }, [props.buildingSummery])

  return (
    <Box>
      {' '}
      {productionChainMap.map((buildingCount, buildingName) => {
        return (
          <Box>
            {buildingName}: {buildingCount}
          </Box>
        )
      })}{' '}
    </Box>
  )
}
