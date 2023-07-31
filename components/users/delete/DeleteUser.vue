<template>
<b-modal
  id="delete-user"
  modal-class="ex-new-user"
  size="md"
  variant="danger"
  color="red"
  hide-footer
  hide-header
>
  <ex-step
    title="Delete User"
    description="Once a user is deleted, their data and information will not be able to be recovered."
    step-title="Are you sure?"
    next-step-text="Delete User"
    skip-step-text="Cancel"
    @submit="$emit('confirm')"
    @skip="$emit('cancel')"
    :has-previous-step="false"
    has-skip-step
  >
  </ex-step>
</b-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'ex-delete-user',
  data() {
    return {
      currentStep: 'user-organization-role',
    }
  },
  mounted() {
    this.busOn('delete-user:start', this.start)
  },
  methods: {
    start() {
      this.clearAll()
      this.currentStep = 'user-organization-role'
      this.$bvModal.show('new-user')
    },
  },
}
</script>
