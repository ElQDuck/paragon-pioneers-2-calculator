import { globalExpertMode } from '../App'

export const AlternativeCombinationProvider = (props: { combinationList: JSX.Element[] }) => {
  return globalExpertMode.value
    ? props.combinationList.map((building, index) => {
        console.log(`${index} / ${props.combinationList.length}`)
        return building
      })
    : props.combinationList[0]
}
