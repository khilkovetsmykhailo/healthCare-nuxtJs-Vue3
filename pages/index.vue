<template>
  <div>
    <b-row class="justify-content-center mt-5 pt-5">
      <b-col class="col-7 col-md-6 col-lg-5 col-xl-4">
        <b-img
          src="/images/logo.png"
          alt="Demo Health"
          fluid-grow
        />
      </b-col>
    </b-row>

    <ex-modal
      id="auth-callback-modal"
      title="Welcome to Demo Health!"
      description="Please select one of the options below."
      size="md"
      :dismissible="false"
    >
<!--      <div v-if="user && highestRole === 'user'">-->
<!--        <ex-label class="text-center mb-1">Patient Application</ex-label>-->
<!--        <b-row class="justify-content-center">-->
<!--          <b-col cols="auto" class="p-2">-->
<!--            <a-->
<!--              :href="config().APP_LINK_IOS"-->
<!--              :disabled="!config().APP_LINK_IOS"-->
<!--              target="_blank"-->
<!--            >-->
<!--              <b-img-->
<!--                src="/images/badges/app-store-badge.png"-->
<!--                style="height: 54px;"-->
<!--                v-bind:class="{ 'disabled-opacity': !config().APP_LINK_IOS }"-->
<!--                v-b-tooltip:hover-->
<!--                :title="config().APP_LINK_IOS.includes('testflight')-->
<!--                  ? 'Open in TestFlight'-->
<!--                  : 'Open in App Store'"-->
<!--              />-->
<!--            </a>-->
<!--          </b-col>-->
<!--          <b-col cols="auto" class="p-2">-->
<!--            <a-->
<!--              :href="config().APP_LINK_ANDROID"-->
<!--              :disabled="!config().APP_LINK_ANDROID"-->
<!--              target="_blank"-->
<!--            >-->
<!--              <b-img-->
<!--                src="/images/badges/google-play-badge.png"-->
<!--                style="height: 54px;"-->
<!--                v-bind:class="{ 'disabled-opacity': !config().APP_LINK_ANDROID }"-->
<!--                v-b-tooltip:hover-->
<!--                title="Open Google Play Store"-->
<!--              />-->
<!--            </a>-->
<!--          </b-col>-->
<!--        </b-row>-->
<!--        <hr/>-->
<!--      </div>-->
      <div v-if="user">
        <ex-label class="text-center mb-1">Your Organizations</ex-label>
        <b-button
          v-for="(organization, index) in organizations"
          :key="index"
          size="lg"
          variant="outline-primary"
          class="w-100 my-2"
          :to="`/${unsluggify(organization.slug)}`"
        >
          {{ organization.name }}
        </b-button>
      </div>
    </ex-modal>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'page-index',
  layout: 'welcome',
  computed: {
    ...mapState('currentUser', ['user', 'organizations']),
    ...mapGetters('currentUser', ['highestRole']),
  },
  mounted() {
    this.$bvModal.show('auth-callback-modal')
  },
}
</script>
