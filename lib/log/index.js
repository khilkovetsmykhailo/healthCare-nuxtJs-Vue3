export default {
  inform: (message, { error = undefined } = {}) => {
    console.log(message)
    if (error) {
      console.log(error)
    }
  },
  error: (message, { error = undefined } = {}) => {
    console.error(message)
    if (error) {
      console.log(error)
    }
  },
}

