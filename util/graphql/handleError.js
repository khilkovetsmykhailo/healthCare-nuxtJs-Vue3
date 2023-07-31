import log from '../../lib/log'

export default (error) => {
  log.inform('Could not get response from server.', { error })
  return { data: null, errors: [error.message] }
}
