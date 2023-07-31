import physicalTherapistAssignmentFields from '../../fields/physicalTherapistAssignment';

export default (
  `
  mutation (
    $physicalTherapistAssignment: UpdatePhysicalTherapistAssignmentInput!,
  ) {
    updatePhysicalTherapistAssignment (
      physicalTherapistAssignment: $physicalTherapistAssignment,
    ) {
      ${physicalTherapistAssignmentFields}
    }
  }
  `
)
