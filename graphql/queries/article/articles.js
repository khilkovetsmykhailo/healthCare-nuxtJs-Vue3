import articleFields from '../../fields/article'

export default (
  `
  query (
    $tag: String,
  ) {
    articles (
      tag: $tag,
    ) {
      nodes {
        node {
          ${articleFields}
        }
      }
    }
  }
  `
)
