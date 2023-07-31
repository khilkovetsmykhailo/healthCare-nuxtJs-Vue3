<template>
  <ex-page :loading="loading">
    <template slot="header">
      <span class="h3 font-weight-normal pt-1">
        {{ userFullName }}
      </span>
    </template>
    <template slot="side-nav">
      <b-row>
        <b-col class="col-12 col-sm-6 col-md-4 col-lg-12">
          <ex-profile-picture
            :user="user"
            class="mb-3"
            thumbnail
            fluid-grow
            shadow
            :editable="false"
          />
        </b-col>
        <b-col class="col-12 col-sm-6 col-md-8 col-lg-12">
          <h4 class="font-weight-normal mb-0">{{ userFullName }}</h4>
          <span class="small text-muted" v-if="user">
            <font-awesome-icon icon="envelope" class="mr-1 text-warning"/>
            <a :href="`mailto:${user.email}`" v-b-tooltip.hover="`Email ${user.email}`">{{ user.email }}</a>
          </span>
          <ex-editable-user-profile
            v-if="user"
            :user="justUser"
            @submit="updateUser"
          />
          <template v-if="user&&(currentUserIsSystemAdministrator && currentUser.id !== user.id)">
            <hr/>
            <b-button
              variant="outline-danger"
              size="sm"
              class="w-100"
              @click="handleDeleteUser"
            >
              Delete User
            </b-button>
          </template>
        </b-col>
      </b-row>
    </template>

    <b-alert
      v-if="error"
      variant="danger"
      show
      class="mb-3"
    >
      {{ error }}
    </b-alert>

    <b-alert
      v-if="success"
      variant="success"
      show
      class="mb-3"
    >
      User successfully updated.
    </b-alert>

    <div class="d-flex justify-content-end">
      <ex-icon-button
        icon="chevron-left"
        font-awesome
        tooltip="Go back"
        @click="$router.go(-1)"
      />
    </div>

    <b-tabs
      class="ex-tabs"
      content-class="mt-3"
      v-if="user"
    >
      <ex-user-details-tab :user="justUser"/>
      <ex-user-organization-roles-tab :user="user"/>
    </b-tabs>
  </ex-page>
</template>
<script>
import {mapState} from 'vuex'
import ExEditableUserProfile from '~/components/users/EditableUserProfile'
import ExUserDetailsTab from '~/components/users/tabs/UserDetailsTab'
import ExUserOrganizationRolesTab from '~/components/users/tabs/UserOrganizationRolesTab'
import ExDeleteUser from '~/components/users/delete/DeleteUser'
import makeRequest from '../../util/graphql/makeRequest'
import queryUser from '../../graphql/queries/user/user'
import mutationUpdateUser from '../../graphql/mutations/user/updateUser'
import mutationDeleteUser from '../../graphql/mutations/user/deleteUser'

export default {
  name: 'page-user',
  components: {
    ExEditableUserProfile,
    ExUserDetailsTab,
    ExUserOrganizationRolesTab,
    ExDeleteUser,
  },
  data() {
    return {
      loading: true,
      error: null,
      success: false,
      user:null
    }
  },
  computed: {
    userFullName() {
      return this.user ? `${this.user.firstName} ${this.user.lastName}` : ''
    },
    justUser() {
      const {
        OrganizationAdministrators,
        OrganizationHealthCareProviders,
        OrganizationPatients,
        Roles,
        ...user
      } = this.user
      return user
    },

    ...mapState('currentUser', {
      currentUser: 'user',
    }),
  },
  async mounted() {
    const { data, errors } = await makeRequest(this.$axios, {
      query: queryUser,
      variables: {
        id: this.$route.params.id,
        withOrganizationRoles: true,
      },
    })

    if (data && !errors.length) {
      this.user = data.user
      this.loading = false
    } else {
      this.$router.push('/error')
    }
  },
  methods: {
    async updateUser(userState) {
      this.loading = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationUpdateUser,
        variables: {
          user: userState,
        },
      })

      if (data && !errors.length) {
        this.user = {
          ...this.user,
          ...data.updateUser,
        }
        this.error = null
        this.success = true
      } else {
        this.error = 'Could not update user.'
      }

      this.loading = false
      if (!process.server) window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },

    async handleDeleteUser() {
      this.deleting = true
      this.error = null
      const confirmation = confirm('Are you sure you want to delete this user? All of their data will be lost.')
      if (confirmation==true){
        // await this.wait(this.deleteUser, 1500, this.user.id)
      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationDeleteUser,
        variables: { id: this.user.id }
      })

      if (!data && errors.length) {
        this.error = 'Could not delete user.'
        this.deleting = false
      } else {
        this.$toast.success('User Deleted')
        this.deleting = false
        this.$router.push(`/${this.user.OrganizationPatients[0]?.Organization.slug}`)
      }
        // alert('User deleted. You will be directed to the home page.')
        // this.$router.push({ path: '/' })
      }
    },
  },
}
</script>
