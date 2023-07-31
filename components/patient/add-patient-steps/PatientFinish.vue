<template>
<ex-new-user-step
  title="Patient Created"
  :step-title="`${user.firstName} ${user.lastName}`"
  :description="`An email has been sent to ${user.firstName} ${user.lastName} with a temporary password and link to download/open the Demo Health application.`"
  next-step-text="View New Patient"
  :has-previous-step="false"
  has-skip-step
  skip-step-text="Add Another Patient"
  @submit="goToUser"
  @skip="addNewPatient"
>
</ex-new-user-step>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ExListItem from '../../ListItem'
import ExUserListItem from '../../UserListItem'
import { delay } from '../../../lib/utils'
export default {
  name: 'ex-new-user-step-patient-confirm',
  data: () => ({
    loading: false,
  }),
  components: { ExListItem, ExUserListItem },
  computed: {
    ...mapState('patient/new', ['user']),
    ...mapState('organization', ['organization']),
    ...mapGetters('patient/new', ['selectedClinicalUser', 'selectedEvent']),
  },
  methods: {
    ...mapActions('patient/new', {
      createUser: 'CREATE_USER',
      clearAll: 'CLEAR_ALL',
    }),
    handleGoToStep(step) {
      this.$emit('next', step)
    },
    async goToUser() {
      const userOrgRole = this.user || {}
      const path = `/${this.organization.slug}/patients/${this.user.user_organization_roles[0].id}`
      this.$bvModal.hide('add-patient')
      this.clearAll()
      this.$router.push({ path })
    },
    addNewPatient() {
      this.clearAll()
      this.$emit('next', 'patient-name')
    }
  },
}
</script>
