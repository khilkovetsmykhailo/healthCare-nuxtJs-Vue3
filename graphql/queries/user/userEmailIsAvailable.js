export default (
  `
  query ($email: String!) {
    userEmailIsAvailable(email: $email)
  }
  `
)
