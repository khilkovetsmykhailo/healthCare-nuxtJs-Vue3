<template>
  <ex-step
    title="Date of Birth"
    :step-title="`Step ${step} of ${totalSteps}`"
    :description="`Please enter ${user.firstName} ${user.lastName}'s date of birth below`"
    :next-step-disabled="!user.dateOfBirth"
    @submit="handleGoToStep"
    @back="$emit('back')"
  >
    <ex-datepicker
      :value="user.dateOfBirth"
      past
      @input="handleUpdateDateOfBirth"
    />
  </ex-step>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'ex-step-user-date-of-birth',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    ...mapState('organization/newUser', ['user']),
  },
  methods: {
    handleUpdateDateOfBirth(dateOfBirth) {
      this.setUserField(['dateOfBirth', dateOfBirth])
    },

    handleGoToStep() {
      this.$emit('next')
    },

    ...mapMutations('organization/newUser', {
      setUserField: 'SET_USER_FIELD',
    }),
  },
}
</script>
