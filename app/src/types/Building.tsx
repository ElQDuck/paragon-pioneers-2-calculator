export type Building = {
  ConsumePerIteration: Map<string, number>
  ConsumePerMinute: Map<string, number>
  ProducePerIteration: number
  ProducePerMinute: number
  IterationTimeInSeconds: number
  IterationTimeInDecimal: number
}
