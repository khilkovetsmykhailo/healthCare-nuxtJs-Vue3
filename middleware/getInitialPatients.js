import isAuthUrl from '../util/auth/isAuthUrl'
import getAuthToken from '../util/auth/getAuthToken'

export default async ({ store, route, app }) => {
  if (isAuthUrl(route.path) || !getAuthToken(app.$cookies)) return

  // Get patients for global org search, if not yet loaded (initial page view) and if an org has been retrieved
  if (store.state.organization.organization !== null && store.state.organization.patients === null) {
    const query = {}

    // If is an HCP and is of the type Physical Therapist, limit patient query to only those belonging to this HCP
    const hcp = store.getters['currentUser/healthCareProvider']
    if (hcp && hcp.organizationRole.hcpType === 'PHYSICAL_THERAPIST') {
      query.physicalTherapistId = hcp.organizationRole.id
    }

    await store.dispatch('organization/GET_PATIENTS', query)
  }
}
