import activityFields from '../../fields/activity'

export default (
  `
  query (
    $type: String,
    $search: String,
  ) {
    activities (
      type: $type,
      search: $search,
    ) {
      nodes {
        node {
          ${activityFields}
        }
      }
    }
  }
  `
)
