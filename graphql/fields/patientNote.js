import userFields from './user'

export default (
  `
  id
  message
  Author {
    id
    User {
      ${userFields}
    }
  }
  `
)
