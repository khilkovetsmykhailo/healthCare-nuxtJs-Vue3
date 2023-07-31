<template>
  <b-container class="pb-5 mb-5 mt-3">
    <ex-loading v-if="loading"/>
    <template v-if="!loading">
      <b-row class="py-4 justify-content-between">
        <b-col class="col-auto mb-4">
          <b-row>
            <b-col class="d-flex col-auto align-items-center" v-if="$slots.header">
              <slot name="header"/>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="col-auto d-flex align-items-center">
          <ex-icon-button
            v-if="currentUserIsHealthCareProvider"
            class="mr-2"
            font-awesome
            icon="video"
            size="lg"
            tooltip="Virtual Appointments"
            @click="busEmit('virtual-visits')"
          />

          <slot name="actions"/>

          <ex-dropdown
            v-if="currentUser"
            icon="cog"
            tooltip="Menu"
            right
          >
            <b-dropdown-header>
              Signed in as
            </b-dropdown-header>
            <b-dropdown-item :to="`/users/${currentUser.id}`" class="text-capitalize">
              {{ currentUser.firstName }} {{ currentUser.lastName }}
              <font-awesome-icon icon="cog" class="text-primary ml-1"/>
            </b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item @click="goToSignOut">Sign Out</b-dropdown-item>
          </ex-dropdown>
          <ex-dropdown
            tooltip="Organizations"
            v-if="currentUserOrganizations || currentUserIsSystemAdministrator"
            icon="users"
            font-awesome
            class="ml-2"
            right
            @shown="maybeGetAllOrganizations"
          >
            <b-dropdown-header>
              Your Organizations
            </b-dropdown-header>

            <b-dropdown-item
              v-for="(organization, index) in currentUserOrganizations"
              :key="index"
              :to="`/${organization.slug}`"
            >
              {{ organization.name }}
            </b-dropdown-item>

            <template v-if="currentUserIsSystemAdministrator">
              <b-dropdown-divider/>
              <b-dropdown-header>
                All Organizations
              </b-dropdown-header>

              <ex-loading v-if="loadingAllOrganizations"/>
              <div v-else-if="allOrganizations">
                <b-dropdown-item
                  v-for="(organization, index) in allOrganizations"
                  :key="index"
                  :to="`/${organization.slug}`"
                >
                  {{ organization.name }}
                </b-dropdown-item>
              </div>

              <b-dropdown-divider/>
              <b-dropdown-item
                disabled
                @click="handleAddNewOrganizationClick"
              >
                <font-awesome-icon icon="plus-circle" class="mr-2"/>
                <span>Add New Organization (coming soon!)</span>
              </b-dropdown-item>
            </template>

            <b-dropdown-divider/>
            <b-dropdown-item to="/logout">
              <font-awesome-icon icon="sign-out-alt" class="mr-2"/>
              Log Out
            </b-dropdown-item>
          </ex-dropdown>
        </b-col>
      </b-row>

      <b-row v-if="$slots['side-nav']">
        <b-col :class="sideNavClass">
          <slot name="side-nav"/>
        </b-col>
        <b-col :class="sideNavMainClass">
          <slot/>
        </b-col>
      </b-row>
      <slot v-else/>
      <ex-new-organization/>
    </template>
  </b-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ExNewOrganization from '~/components/organizations/new/NewOrganization'

export default {
  name: 'ex-page',
  components: {
    ExNewOrganization,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    header: { type: String },
    sideNavClass: {
      type: String,
      default: 'col-12 col-lg-4 col-xl-3',
    },
    sideNavMainClass: {
      type: String,
      default: 'col-12 col-lg-8 col-xl-9',
    },
  },
  data() {
    return {
      loadingAllOrganizations: false,
    }
  },
  computed: {
    ...mapState('common', ['allOrganizations']),

    ...mapState('currentUser', {
      currentUser: 'user',
      currentUserOrganizations: 'organizations',
    }),
  },
  methods: {
    async maybeGetAllOrganizations() {
      if (this.allOrganizations === null) {
        this.loadingAllOrganizations = true
        await this.getAllOrganizations()
        this.loadingAllOrganizations = false
      }
    },

    goToSignOut() {
      this.$router.push('/logout')
    },

    handleAddNewOrganizationClick() {
      this.busEmit('new-organization:start')
    },

    ...mapActions('common', {
      getAllOrganizations: 'GET_ALL_ORGANIZATIONS',
    }),
  },
}
</script>
