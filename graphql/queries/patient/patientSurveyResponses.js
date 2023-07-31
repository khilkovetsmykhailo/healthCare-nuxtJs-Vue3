export default (
  `
  query (
    $patientId: Int!,
  ) {
    surveyResponses(patientId: $patientId) {
      nodes {
        node {
          id
          createdAt
          Survey {
            id
            title
            description
            createdAt
          }
          Answers {
            id
            answer
            Question {
              id
              content
              type
            }
          }
        }
      }
    }
  }
  `
)
