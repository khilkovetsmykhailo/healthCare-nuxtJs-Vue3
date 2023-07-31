import patientNoteFields from '../../fields/patientNote'

export default (
  `
  mutation (
    $patientNote: CreatePatientNoteInput!
  ) {
    createPatientNote (patientNote: $patientNote) {
      ${patientNoteFields}
    }
  }
  `
)
