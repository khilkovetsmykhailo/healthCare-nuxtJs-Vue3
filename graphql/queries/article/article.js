import articleFields from '../../fields/article'

export default (
  `
  query (
    $id: Int!,
  ) {
    article (
      id: $id,
    ) {
      ${articleFields}
    }
  }
  `
)
