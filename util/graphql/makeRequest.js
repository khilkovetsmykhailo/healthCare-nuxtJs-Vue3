import handleError from './handleError'
import logErrors from './logErrors'

export default async (ctx, { query, variables}) => {
  try {
    const response = await ctx.post('/graphql', { query, variables })

    // Handle logging of errors
    if (response.data.errors && response.data.errors.length) {
      logErrors(response.data.errors, { query, variables })
    }

    return { data: response.data.data, errors: response.data.errors || [] }
  } catch (error) {
    // Handle logging of errors
    if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length) {
      logErrors(error.response.data.errors, { query, variables })
    }

    return handleError(error)
  }
}
