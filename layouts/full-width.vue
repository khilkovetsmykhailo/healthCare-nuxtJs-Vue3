<template>
  <div class="Demo-app">
    <ex-page
      side-nav-class="col-12 col-lg-4 col-xl-5"
      side-nav-main-class="col-12 col-lg-8 col-xl-7"
    >
      <template slot="header">
        <h1 class="ex-site-title display-5 font-weight-light py-0 my-0">
          {{ organization.name }}
        </h1>
      </template>
      <template slot="actions">
        <ex-icon-button
          class="mr-2"
          size="lg"
          icon="add-team"
          tooltip="Add New Team"
          @click="busEmit('new-care-team:start')"
          v-if="highestRoleIndex >= 4"
        />
        <ex-icon-button
          class="mr-2"
          size="lg"
          icon="add-user"
          tooltip="Add New User"
          @click="busEmit('new-user:start')"
          v-if="highestRoleIndex >= 3"
        />
      </template>

      <nuxt/>

      <ex-new-user/>
      <ex-new-care-team/>
      <ex-virtual-visits/>
    </ex-page>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import ExNewUser from '~/components/users/new/NewUser'
import ExVirtualVisits from '~/components/VirtualVisits'
import ExNewCareTeam from '~/components/teams/new/NewCareTeam'
import ExChat from '~/components/chat/Chat'
import ExUserSearchSystem from '../components/UserSearchSystem'

export default {
  name: 'page-admin-index',
  components: {
    ExUserSearchSystem,
    ExNewCareTeam,
    ExNewUser,
    ExChat,
    ExVirtualVisits,
  },
  computed: {
    ...mapState('organization', ['organization']),
    ...mapGetters('currentUser', ['highestRoleIndex']),
  },

  data() {
    return {
      chatActive: false,
    }
  },
}
</script>
