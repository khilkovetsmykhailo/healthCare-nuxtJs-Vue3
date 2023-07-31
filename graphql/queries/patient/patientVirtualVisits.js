export default (
  `
  query (
    $patientId: Int,
    $healthCareProviderId: Int,
  ) {
    virtualVisits(
      patientId: $patientId,
      healthCareProviderId: $healthCareProviderId,
    ) {
      nodes {
        node {
          id
          appointmentDate
          appointmentTime
          latePointLocation
          latePointService
          patientId
          healthCareProviderId
        }
      }
    }
  }
  `
)
