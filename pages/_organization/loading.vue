<template>
  <div class="text-center my-5">
    <h2 class="mb-0">Loading Organization...</h2>
    <img
      src="/images/loading-organization.svg"
      alt="Loading organization..."
    >
    <ex-loading/>
  </div>
</template>

<script>
export default {
  name: 'OrganizationLoading',
  transition: 'fade',
  async mounted() {
    // Clear out store (from any previous org)
    this.$store.commit('organization/CLEAR')

    const { organization: organizationSlug } = this.$route.params

    // Clear out org store
    this.$store.commit('organization/CLEAR')

    // Reset search tab to default (patients)
    this.$store.commit('page/SET_USER_SEARCH_SYSTEM_TAB_INDEX', 2)

    // "Smooth out" transition between organizations (client only)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const { data } = await this.$store.dispatch('organization/GET_ORGANIZATION', organizationSlug)

    if (data.organization === null) {
      // Could not find org. Redirect user
      console.error(`404 - Organization not found for slug: ${organizationSlug}.`)
      await this.$router.push('/error')
    } else {
      await this.$router.push(this.$route.query['return-to'] || `/${organizationSlug}`)
    }
  },
}
</script>
