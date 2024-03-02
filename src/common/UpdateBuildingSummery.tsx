export const UpdateBuildingSummery = (
  building: string,
  value: number,
  context: [Map<string, number>, React.Dispatch<React.SetStateAction<Map<string, number>>>],
  oldValueState: [number, React.Dispatch<React.SetStateAction<number>>]
) => {
  const [buildingSummery, setBuildingSummery] = context
  const [oldValue, setOldValue] = oldValueState

  buildingSummery.has(building)
    ? setBuildingSummery(new Map(buildingSummery.set(building, buildingSummery.get(building)! + (value - oldValue))))
    : setBuildingSummery(new Map(buildingSummery.set(building, value)))

  setBuildingSummery(new Map<string, number>(buildingSummery.set(building, buildingSummery.get(building)!)))
  console.log(building + ': ' + buildingSummery.get(building))
  setOldValue(value)
}
