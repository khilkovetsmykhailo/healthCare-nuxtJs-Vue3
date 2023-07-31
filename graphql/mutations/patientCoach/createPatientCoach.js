export default (
  `
  mutation (
    $patientCoach: CreatePatientCoachInput!,
  ) {
    createPatientCoach (
      patientCoach: $patientCoach,
    ) {
      id
      name
      email
      phone
      relationship
    }
  }
  `
)
