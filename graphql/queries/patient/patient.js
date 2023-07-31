import patientArgs from '../../args/patient';
import patientFields from '../../fields/patient';

export default (
  `
  query (
    $id: Int!,
    ${patientArgs}
  ) {
    organizationPatient(
      id: $id
    ) {
      ${patientFields}
    }
  }
  `
)
