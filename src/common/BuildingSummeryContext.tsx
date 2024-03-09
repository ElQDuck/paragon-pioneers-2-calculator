import { createContext } from 'react'

//export type BuildingSummeryContextType = [Function, Map<string, number>]
//const [buildingSummery, setBuildingSummery] = useState<Map<string, number>>(new Map<string, number>())

// const updateBuildingSummery = (name: string, value: number) => {
//   buildingSummery.has(name)
//     ? setBuildingSummery(new Map(buildingSummery.set(name, buildingSummery.get(name)! + value)))
//     : setBuildingSummery(new Map(buildingSummery.set(name, value)))
// }

export const BuildingSummeryContext = createContext<
  [
    Map<string, { buildingName: string; count: number }>,
    React.Dispatch<React.SetStateAction<Map<string, { buildingName: string; count: number }>>>,
  ]
>([new Map<string, { buildingName: string; count: number }>(), () => {}])

export const SimpleTestContext = createContext<string>('test')
