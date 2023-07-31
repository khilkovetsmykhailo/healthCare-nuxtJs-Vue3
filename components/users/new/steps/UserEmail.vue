<template>
  <ex-step
    title="User Email"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please enter the email address you wish to use for this user."
    :next-step-disabled="!email || loading"
    :error="error || undefined"
    @back="$emit('back')"
    @submit="handleSubmit"
  >
    <template v-if="foundUser">
      <p>
        User with this email already exists. To continue with existing user, click "Next Step"
      </p>

      <ex-user-list-item
        :user="foundUser"
        class="border-primary"
      >
        <template slot="subtitle">
        <span class="text-primary" v-if="foundUser.dateOfBirth">
          {{ $moment().diff(foundUser.dateOfBirth, 'years') }}
        </span>
          Years Old
          &bull;
          <span class="text-warning">
          {{ foundUser.email }}
        </span>
        </template>
      </ex-user-list-item>
    </template>

    <b-form
      v-if="!foundUser"
      @submit.prevent="handleSubmit"
    >
      <ex-label class="mb-2" for="user_firstName">Email</ex-label>
      <b-form-input
        v-model="email"
        id="user_email"
        placeholder="Email Address"
        :formatter="forceLowercase"
        class="mb-3"
        :disabled="loading"
        required
        type="email"
      />
    </b-form>
  </ex-step>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import makeRequest from '../../../../util/graphql/makeRequest'
import queryUser from '../../../../graphql/queries/user/user'

// @see https://stackoverflow.com/a/46181/2292329
const emailIsValid = (email) => (
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email,
  )
)

export default {
  name: 'ex-step-user-details',
  props: {
    organizationRoleType: {
      type: String,
      required: true,
    },
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  data() {
    return {
      email: '',
      error: null,
      foundUser: null,
      loading: false,
    }
  },
  computed: {
    ...mapState('organization/newUser', ['user']),
  },
  methods: {
    forceLowercase(value) {
      return `${value}`.toLowerCase()
    },

    async handleSubmit() {
      if (this.foundUser) {
        this.setUserField(['firstName', this.foundUser.firstName])
        this.setUserField(['lastName', this.foundUser.lastName])
        this.setUserField(['email', this.foundUser.email])
        this.setUserField(['phone', this.foundUser.phone])
        this.setUserField(['dateOfBirth', this.foundUser.dateOfBirth])
        this.setUserField(['gender', this.foundUser.gender])
        this.$emit('skip-to-step', this.organizationRoleType === 'patient' ? 'user-has-surgery' : 'user-confirm')
        return
      }

      if (!emailIsValid(this.email)) {
        this.error = 'Please enter a valid email address'
        return
      }

      await this.findExistingUser()
      if (!this.foundUser) {
        // email exists, continue on
        this.setUserField(['email', this.email])
        this.$emit('next')
      }
    },

    async findExistingUser() {
      this.loading = true
      this.error = null

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryUser,
        variables: {
          email: this.email,
        },
      })

      this.loading = false

      if (data && !errors.length) {
        this.foundUser = data.user
      } else {
        this.error = 'Could not check if user email is available. Please try again later.'
      }
    },

    handleChange({ field, value }) {
      this.setUserField([field, value])
    },

    ...mapMutations('organization/newUser', {
      setUserField: 'SET_USER_FIELD',
    }),
  },
}
</script>
