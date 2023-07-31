import physicalTherapistAssignmentFields from '../../fields/physicalTherapistAssignment';

export default (
  `
  mutation (
    $physicalTherapistAssignment: CreatePhysicalTherapistAssignmentInput!,
  ) {
    createPhysicalTherapistAssignment (
      physicalTherapistAssignment: $physicalTherapistAssignment,
    ) {
      ${physicalTherapistAssignmentFields}
    }
  }
  `
)
