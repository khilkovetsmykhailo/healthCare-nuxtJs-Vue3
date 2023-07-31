<template>
<ex-patient-search
  :patients="patients"
  :loading="loading"
  :selected="patient ? patient.id : undefined"
  @select="handleSelectPatient"
  @search="handleSearchPatients"
/>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'patient-search-integrated',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState('patient', ['patient']),
    ...mapState('patients', ['patients']),
  },
  mounted() {
    this.subscribeToStore({
      'patients/FETCH_PATIENTS': {
        before: () => {
          this.loading = true
        },
        after: () => {
          this.loading = false
        },
      }
    })
  },
  methods: {
    /**
     * Handles selection of a patient.
     *
     * @param {Object} patient
     */
    handleSelectPatient(patient) {
      this.$router.push(`/patient/${patient.id}`)
    },

    /**
     * Searches patients for the dashboard list.
     *
     * @param {String} search Search text query.
     */
    handleSearchPatients(search) {
      this.fetchPatients({search})
    },

    ...mapActions('patients', {
      fetchPatients: 'FETCH_PATIENTS',
    }),
  },
}
</script>
