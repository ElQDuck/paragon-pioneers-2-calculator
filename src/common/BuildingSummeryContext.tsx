import { createContext } from 'react'

export const BuildingSummeryContext = createContext<
  [
    Map<string, { buildingName: string; count: number }>,
    React.Dispatch<React.SetStateAction<Map<string, { buildingName: string; count: number }>>>,
  ]
>([new Map<string, { buildingName: string; count: number }>(), () => {}])
