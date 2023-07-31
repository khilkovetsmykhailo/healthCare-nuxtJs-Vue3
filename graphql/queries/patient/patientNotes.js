import patientNoteFields from '../../fields/patientNote'

export default (
  `
  query (
    $patientId: Int!,
  ) {
    patientNotes(patientId: $patientId) {
      nodes {
        node {
          ${patientNoteFields}
        }
      }
    }
  }
  `
)
