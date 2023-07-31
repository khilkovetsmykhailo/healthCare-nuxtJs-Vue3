export default (
  `
  mutation (
    $id: String!
  ) {
    deleteUser (
      id: $id,
    ) {
      id
    }
  }
  `
)
