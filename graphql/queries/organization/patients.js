import patientArgs from '../../args/patient';
import patientFields from '../../fields/patient';
import pageInfo from '../../fields/pageInfo';

export default (
  `
  query (
    $after: String,
    $before: String,
    $order: String,
    $orderBy: String,
    $organizationId: Int!,
    $physicalTherapistId: Int,
    $search: String,
    $surgery: Int,
    ${patientArgs}
  ) {
    organizationPatients(
      after: $after,
      before: $before,
      order: $order,
      orderBy: $orderBy,
      organizationId: $organizationId,
      physicalTherapistId: $physicalTherapistId,
      search: $search,
      surgery: $surgery,
    ) {
      ${pageInfo}
      nodes {
        cursor
        node {
          ${patientFields}
        }
      }
    }
  }
  `
)
