<template>
  <ex-step
    title="User Gender"
    :step-title="`Step ${step} of ${totalSteps}`"
    :description="`Please enter ${user.firstName} ${user.lastName}'s gender below.`"
    :next-step-disabled="!user.gender"
    @submit="handleGoToStep"
    @back="$emit('back')"
  >
    <div class="text-center">
      <b-button
        :variant="user.gender === 'MALE' ? 'primary' : 'outline-light'"
        class="mb-4"
        @click="setUserField(['gender', 'MALE'])"
      >
        Male
      </b-button>
      <b-button
        :variant="user.gender === 'FEMALE' ? 'primary' : 'outline-light'"
        class="mb-4"
        @click="setUserField(['gender', 'FEMALE'])"
      >
        Female
      </b-button>
      <b-button
        :variant="user.gender === 'OTHER' ? 'primary' : 'outline-light'"
        @click="setUserField(['gender', 'OTHER'])"
      >
        Other
      </b-button>
    </div>
  </ex-step>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'ex-step-user-gender',
  props: {
    step: { type: [String, Number], required: true },
    totalSteps: { type: [String, Number], required: true },
  },
  computed: {
    ...mapState('organization/newUser', ['user']),
  },
  methods: {
    handleGoToStep() {
      this.$emit('next')
    },

    ...mapMutations('organization/newUser', {
      setUserField: 'SET_USER_FIELD',
    }),
  },
}
</script>
