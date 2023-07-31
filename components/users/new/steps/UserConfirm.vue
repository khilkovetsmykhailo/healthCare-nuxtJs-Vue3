<template>
  <ex-step
    title="Confirm Details"
    description="Please confirm all details below."
    :step-title="`Step ${step} of ${totalSteps}`"
    :next-step-text="confirming ? 'Confirm Create User' : 'Create User'"
    @submit="handleSubmit"
    @back="handleBack"
  >
    <b-alert
      v-if="confirming"
      variant="warning"
      show
      class="mb-5"
    >
      Please note: If you need to change the surgery details later, the user will need to be deleted and created
      again. Ability to edit surgery details coming soon. Please verify these details carefully before confirming.
      Otherwise, press "Back" to modify details.
    </b-alert>

    <b-alert
      v-if="error"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    <p class="mb-0 text-capitalize">New {{ organizationRoleType }}</p>
    <hr class="mt-1 mb-3"/>

    <ex-user-list-item
      :user="user"
      class="border-primary"
      :disabled="confirming"
    >
      <template slot="subtitle">
        <span class="text-primary" v-if="user.dateOfBirth">
          {{ $moment().diff(user.dateOfBirth, 'years') }}
        </span>
        Years Old
        &bull;
        <span class="text-warning">
          {{ user.email }}
        </span>
      </template>
    </ex-user-list-item>

    <template v-if="organizationRoleType === 'patient'">
      <p class="mt-4 mb-0">Surgery Information</p>
      <hr class="mt-1 mb-3"/>
      <p
        v-if="surgery.surgery === null"
        class="small text-center text-muted py-4 border"
      >
        No Surgery Specified
      </p>
      <ex-list-item
        v-if="surgery.surgery !== null"
        class="border-primary"
        :disabled="confirming"
      >
        <div class="ex-list-item-text">
          <div class="capitalize">
            {{ surgery.surgery.name }}
          </div>
          <div class="small text-muted text-capitalize">
            {{ surgery.date | formatDate }}
            &bull;
            {{ $moment(surgery.date).fromNow() }}
            <br/>
            <span class="text-primary text-capitalize">
              {{ surgery.specification.name }}
            </span>
          </div>
        </div>
      </ex-list-item>
    </template>

    <template v-if="careTeam !== null">
      <p class="mt-4 mb-0">Care Team</p>
      <hr class="mt-1 mb-3"/>
      <ex-list-item
        class="border-primary"
        :disabled="confirming"
      >
        <div class="ex-list-item-text">
          <div class="capitalize">
            {{ careTeam.name }}
          </div>
          <div class="small text-muted text-capitalize">
            {{ careTeam.description }}
          </div>
        </div>
      </ex-list-item>
    </template>

    <ex-loading v-if="loading"/>
  </ex-step>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import ExListItem from '../../../ListItem'
import ExLoading from '../../../Loading'
import ExUserListItem from '../../../UserListItem'
import makeRequest from '../../../../util/graphql/makeRequest'
import mutationCreateUser from '../../../../graphql/mutations/user/createUser'
import mutationCreateRecoveryPlan from '../../../../graphql/mutations/recoveryPlan/createRecoveryPlan'

export default {
  name: 'ex-step-user-confirm',
  data() {
    return {
      confirming: false,
      loading: false,
      error: null,
    }
  },
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  components: { ExLoading, ExListItem, ExUserListItem },
  computed: {
    ...mapState('organization/newUser', [
      'user',
      'surgery',
      'careTeam',
      'organizationRoleType',
      'organizationRoleMeta',
    ]),
    ...mapState('organization', ['organization']),
  },
  methods: {
    handleSubmit() {
      if (this.organizationRoleType === 'patient' && !this.confirming) {
        this.confirming = true
        return
      }

      this.error = null
      this.handleCreateEverything()
    },

    async handleCreateEverything() {
      this.loading = true

      // Create new user
      const createdUser = await this.createUser()
      if (!createdUser) {
        // Don't continue, failed
        this.loading = false
        this.confirming = false
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        return
      }

      // Create Recovery Plan, if user is a patient
      if (this.organizationRoleType === 'patient') {
        if (!(await this.createRecoveryPlan(createdUser))) {
          // Don't continue, failed
          this.loading = false
          this.confirming = false
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          return
        }
      }

      this.setCreatedUser(createdUser)
      this.loading = false
      this.handleGoToStep()
    },

    async createUser() {
      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationCreateUser,
        variables: {
          careTeamId: this.careTeam ? this.careTeam.id : null,
          organizationId: this.organization.id,
          organizationRoleType: this.organizationRoleType,
          organizationRoleMeta: this.organizationRoleMeta,
          user: this.user,
        },
      })

      // Errors
      if (!data || errors.length) {
        this.error = 'Could not create user. Please try again later.'
        return null
      }

      return data.createUser
    },

    async createRecoveryPlan(createdUser) {
      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationCreateRecoveryPlan,
        variables: {
          patientId: createdUser.patientId,
          surgeryId: this.surgery.surgery ? this.surgery.surgery.id : null,
          surgeonId: this.surgery.surgeon ? this.surgery.surgeon.id : null,
          surgerySpecificationId: this.surgery.specification ? this.surgery.specification.id : null,
        },
      })

      // Errors
      if (!data || errors.length) {
        this.error = 'Could not create recovery plan. Please try again later.'
        return false
      }

      return true
    },

    handleBack() {
      this.confirming = false
      this.$emit('back')
    },

    handleGoToStep() {
      this.$emit('next')
    },

    ...mapMutations('organization/newUser', {
      setCreatedUser: 'SET_CREATED_USER',
    }),
  },
}
</script>
