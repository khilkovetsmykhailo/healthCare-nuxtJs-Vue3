import surveyFields from '../../fields/survey'

export default (
  `
  query (
    $id: Int,
    $surveyId: Int,
  ) {
    surveyResponse (
      id: $id,
      surveyId: $surveyId,
    ) {
      id
      recoveryPlanId
      completedActivityId
      createdAt
      Survey {
        ${surveyFields}
      }
    }
  }
  `
)
