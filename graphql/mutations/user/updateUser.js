import userFields from '../../fields/user';

export default (
  `
  mutation (
    $user: UpdateUserInput!
  ) {
    updateUser (user: $user) {
      ${userFields}
    }
  }
  `
)
