import patientArgs from '../../args/patient';
import patientFields from '../../fields/patient';

export default (
  `
  mutation (
    $organizationPatient: UpdateOrganizationPatientInput!,
    ${patientArgs}
  ) {
    updatePatient (organizationPatient: $organizationPatient) {
      ${patientFields}
    }
  }
  `
)
