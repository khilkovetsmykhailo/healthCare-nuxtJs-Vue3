import log from '../../lib/log'

export default (errors, { query, variables } = {}) => {
  // GraphQL Context
  if (query) log.inform(`GraphQL query:\n\n${query}`)
  if (variables) {
    log.inform('GraphQL variables:\n')
    Object.keys(variables).forEach((variable) => {
      log.inform(`${variable}: ${variables[variable]}`)
    })
  }

  log.error('Could not get valid GraphQL response. Context above, errors from GraphQL below:')

  // GraphQL Errors
  errors.forEach(({ message, locations }) => {
    log.error(`Message: ${message}`)
    log.inform('Locations:')
    locations.forEach((location) => {
      log.inform(location)
    })
  })
}
