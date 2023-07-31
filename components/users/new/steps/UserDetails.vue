<template>
  <ex-step
    title="User Details"
    :step-title="`Step ${step} of ${totalSteps}`"
    description="Please enter information as it appears in common forms of identification."
    :next-step-disabled="!userStateIsComplete || loading"
    :error="error || undefined"
    @back="$emit('back')"
    @submit="handleSubmit"
  >
    <transition name="fade" mode="out-in">
      <ex-editable-user-details
        :user="user"
        hide-email
        input-class="large mb-4"
        submit-text="Next Step"
        hide-reset
        hide-gender
        hide-dob
        :disabled="loading"
        @change="handleChange"
      />
    </transition>
  </ex-step>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import ExEditableUserDetails from '../../editable/EditableUserDetails'
import makeRequest from '../../../../util/graphql/makeRequest'
import queryUserEmailIsAvailable from '../../../../graphql/queries/user/userEmailIsAvailable'

// @see https://stackoverflow.com/a/46181/2292329
const emailIsValid = (email) => (
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email,
  )
)

export default {
  name: 'ex-step-user-details',
  components: { ExEditableUserDetails },
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  data() {
    return {
      error: null,
      loading: false,
    }
  },
  computed: {
    userStateIsComplete() {
      return (
        this.user.firstName !== null &&
        this.user.lastName !== null &&
        this.user.email !== null &&
        this.user.phone !== null
      )
    },

    ...mapState('organization/newUser', ['user']),
  },
  methods: {
    async handleSubmit() {
      if (!emailIsValid(this.user.email)) {
        this.error = 'Please enter a valid email address'
        return
      }

      if (await this.checkEmailIsAvailable()) {
        this.$emit('next')
      } else {
        this.error = 'User with that email already exists.'
      }
    },

    async checkEmailIsAvailable() {
      this.loading = true
      this.error = null

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryUserEmailIsAvailable,
        variables: {
          email: this.user.email,
        },
      })

      this.loading = false

      if (data && !errors.length) {
        return data.userEmailIsAvailable
      } else {
        this.error = 'Could not check if user email is available. Please try again later.'
        return false
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
