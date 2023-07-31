export default (
  `
  query (
    $patientId: Int!,
    $dateStart: Date,
    $dateEnd: Date,
    $period: String,
  ) {
    patientPain(
      patientId: $patientId
      dateStart: $dateStart,
      dateEnd: $dateEnd,
      period: $period,
    ) {
      dateStart
      dateEnd
      score
    }
  }
  `
)
