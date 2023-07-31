import userFields from '../../fields/user'

export default (
  `
  query (
    $includeEmails: [String!],
  ) {
    users(
      includeEmails: $includeEmails,
    ) {
      nodes {
        node {
          ${userFields}
        }
      }
    }
  }
  `
)
