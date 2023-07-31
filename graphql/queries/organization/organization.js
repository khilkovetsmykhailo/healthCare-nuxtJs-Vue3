import organizationFields from '../../fields/organization';

export default (
  `
  query ($id: Int, $slug: String) {
    organization(id: $id, slug: $slug) {
      ${organizationFields}
    }
  }
  `
)
