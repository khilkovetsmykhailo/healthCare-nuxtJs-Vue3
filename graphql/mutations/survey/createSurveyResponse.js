export default (
  `
  mutation (
    $surveyId: Int!,
    $patientId: Int!,
    $recoveryPlanId: Int,
    $answers: [CreateSurveyResponseAnswerInput!]!,
  ) {
    createSurveyResponse(
      surveyId: $surveyId,
      patientId: $patientId,
      recoveryPlanId: $recoveryPlanId,
      answers: $answers,
    ) {
      id
      surveyId
      patientId
      recoveryPlanId
      completedActivityId
      Answers {
        id
        surveyQuestionId
        answer
      }
    }
  }
  `
)
