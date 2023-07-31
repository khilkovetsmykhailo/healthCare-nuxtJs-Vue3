<template>
<div>
  <transition
    name="fade"
    mode="out-in"
  >
    <div class="text-center" v-if="loading">
      <ex-loading/>
    </div>
    <b-card class="shadow-sm" v-if="!loading && user">
      <b-row>
        <b-col class="col-12">
          <h1 class="h4 font-weight-normal mb-0">
            {{ user.user.firstName }}
            {{ user.user.lastName }}
            <a
              :href="`tel:${user.user.phone}`"
              v-if="user.user.phone"
            >
              <ex-icon-button
                icon="phone"
                tag="span"
                size="sm"
                class="ml-3"
                tooltip="Call Phone Number"
              />
            </a>
            <a
              :href="`mailto:${user.user.email}`"
              v-if="user.user.email"
            >
              <ex-icon-button
                icon="mail"
                tag="span"
                size="sm"
                class="ml-3"
                tooltip="Send Email"
              />
            </a>
            <!-- <ex-icon-button
              v-if="currentUserIsSystemAdministrator"
              icon="trash-alt"
              tag="span"
              size="sm"
              class="float-right text-danger"
              color="red"
              tooltip="Delete User"
              @click="tryDeleteUser"
              font-awesome
            /> -->
            <ex-icon-button
              icon="folder-open"
              class="float-right"
              tooltip="See All User Information"
              @click="goTo(`/users/${user.user.id}`)"
              font-awesome
            />
          </h1>
          <hr/>
        </b-col>
      </b-row>
      <b-row class="justify-content-center my-5">
        <b-col class="col-auto text-center">
          <h1 class="font-weight-light">Under Construction</h1>
          <p>Clinical User information is in progress.</p>
        </b-col>
      </b-row>
    </b-card>
  </transition>
  <ex-delete-user
    @confirm="handleConfirmDeleteUser"
    @cancel="handleCancelDeleteUser"
  />
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { delay } from '../../../lib/utils'
import ExDeleteUser from '~/components/users/delete/DeleteUser'
export default {
  layout: 'organization',
  components: { ExDeleteUser },
  data: () => ({
    loading: true,
    slug: null,
    id: null,
  }),
  computed: {
    ...mapState('organization', ['organization']),
    ...mapState('organization/user', ['user']),
  },
  async mounted() {
    this.clearErrors()
    this.clearPatient()
    this.id = this.$route.params.id
    this.slug = this.$route.params.organization
    if (!this.organization) await this.fetchOrganization(this.slug)
    this.getUser()
  },
  methods: {
    ...mapActions({
      clearErrors:
      'CLEAR_ERRORS'
    }),
    ...mapActions('organization/patient', {
      clearPatient: 'CLEAR_PATIENT',
    }),
    ...mapActions('organization', {
      fetchOrganization: 'FETCH_ORGANIZATION',
    }),
    ...mapActions('organization/user', {
      fetchUser: 'FETCH_USER',
      deleteUser: 'DELETE_USER',
    }),
    async getUser() {
      this.loading = true
      await delay(this.fetchUser, 1000, {
        organizationId: this.organization.id,
        userOrganizationRoleId: this.id,
      })
      this.loading = false
    },
    tryDeleteUser() {
      this.loading = true
      this.$bvModal.show('delete-user')
    },
    async handleConfirmDeleteUser() {
      this.loading = true
      this.$bvModal.hide('delete-user')
      await delay(this.deleteUser, 750, this.user.user.id)
      this.$router.push(`/${this.slug}`)
    },
    handleCancelDeleteUser() {
      this.loading = false
      this.$bvModal.hide('delete-user')
    },
    goTo(path) { this.$router.push({ path }); },
  }
}
</script>
