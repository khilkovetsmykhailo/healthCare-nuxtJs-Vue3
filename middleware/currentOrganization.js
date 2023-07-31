import isAuthUrl from '../util/auth/isAuthUrl'
import getAuthToken from '../util/auth/getAuthToken'

export default async ({ store, route, params, redirect, app }) => {
  if (isAuthUrl(route.path) || !getAuthToken(app.$cookies)) return

  // Pre-fetch current org
  if (
    // ...if org is in url params
    params.organization
    && (
      // ...and no org has been pre-fetched yet
      store.state.organization.organization === null
      // ...or the org param is different than pre-fetched (navigated between orgs)
      || store.state.organization.organization.slug !== params.organization
    )
  ) {
    // Redirect to org loading screen
    if (route.name !== 'organization-loading') {
      await redirect(`/${params.organization}/loading?return-to=${route.path}`)
    }
  }
}
