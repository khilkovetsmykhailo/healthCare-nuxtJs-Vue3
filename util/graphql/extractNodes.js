/**
 * Extracts nodes from the GraphQL response to normalize the data to a flat array.
 *
 * @param {Object} data Data to process
 * @param {Array} data.nodes Nodes to process.
 * @param {Object} config
 * @param {Boolean} config.withNodeContext If true, includes node/edge fields.
 * @returns {Array}
 */
export default (
  { nodes },
  {
    withNodeContext = false,
  } = {},
) => (
  nodes.reduce((extracted, { node, ...nodeContext }) => (
    extracted.concat(
      withNodeContext
      ? { ...node, context: nodeContext }
        : node
    )
  ), [])
)
