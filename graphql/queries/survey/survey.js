import surveyFields from '../../fields/survey'

export default (
  `
  query (
    $id: Int!,
  ) {
    survey (
      id: $id,
    ) {
      ${surveyFields}
      Sections {
        id
        title
        description
        Questions {
          id
          content
          helpText
          required
          choices
          type
        }
      }
    }
  }
  `
)
