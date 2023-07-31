<template>
  <ex-step
    title="User Type"
    :step-title="step && totalSteps ? `Step ${step} of ${totalSteps}` : 'Step 1'"
    description="What type of user would you like to add?"
    :has-previous-step="false"
    :next-step-disabled="!organizationRoleType"
    @submit="$emit('next')"
    @back="$emit('back')"
  >
    <div class="text-center">
      <ex-button-select
        :options="organizationRoleTypeOptions"
        :selected="organizationRoleTypeSelected"
        @change="handleSelectOrganizationRoleType"
      />
    </div>
  </ex-step>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'ex-step-user-organization-role',
  props: {
    step: { type: [String, Number], default: undefined },
    totalSteps: { type: [String, Number], default: undefined },
  },
  data() {
    const highestRoleIndex = this.$store.getters['currentUser/highestRoleIndex']
    return {
      organizationRoleTypeOptions: [
        { value: 'patient', label: 'Patient' },
        ...(highestRoleIndex >= 4 ? [{ value: 'physicalTherapist', label: 'Physical Therapist' }] : []),
        ...(highestRoleIndex >= 4 ? [{ value: 'healthCareProvider', label: 'Health Care Provider' }] : []),
        ...(highestRoleIndex >= 4 ? [{ value: 'administrator', label: 'Administrator' }] : []),
      ],
      organizationRoleTypeSelected: null,
    }
  },
  computed: {
    ...mapState('organization/newUser', ['organizationRoleType']),
  },
  methods: {
    handleSelectOrganizationRoleType(type) {
      this.organizationRoleTypeSelected = type.value

      const orgRoleType = type.value === 'physicalTherapist' ? 'healthCareProvider' : type.value
      this.setOrganizationRoleType(orgRoleType)

      // Denote HCP org role as a PT
      if (type.value === 'physicalTherapist') {
        this.setOrganizationRoleMeta({
          hcpType: 'PHYSICAL_THERAPIST',
        })
      } else {
        this.setOrganizationRoleMeta({})
      }
    },

    async handleGoToNextStep() {
      this.$emit('next')
    },

    ...mapMutations('organization/newUser', {
      setOrganizationRoleType: 'SET_ORGANIZATION_ROLE_TYPE',
      setOrganizationRoleMeta: 'SET_ORGANIZATION_ROLE_META',
    }),
  },
}
</script>
