export const UpdateBuildingSummery = (
  uuid: string,
  building: string,
  value: number,
  context: [
    Map<string, { buildingName: string; count: number }>,
    React.Dispatch<React.SetStateAction<Map<string, { buildingName: string; count: number }>>>,
  ]
) => {
  const [buildingSummery, setBuildingSummery] = context
  setBuildingSummery(new Map(buildingSummery.set(uuid, { buildingName: building, count: value })))
  console.log(buildingSummery)
}
