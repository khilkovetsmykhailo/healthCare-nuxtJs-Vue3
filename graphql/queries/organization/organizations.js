import organizationFields from '../../fields/organization';

export default (
  `
  {
    organizations {
      nodes {
        node {
          ${organizationFields}
        }
      }
    }
  }
  `
)
