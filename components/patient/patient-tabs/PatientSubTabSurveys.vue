<template>
  <div class="ex-patient-tab ex-patient-tab-surveys mt-4">
    <h5 class="mb-3">Surveys</h5>
    <div v-if="!loading && surveyResponses !== null">
      <ex-survey-response
        v-for="surveyResponse in surveyResponses"
        :key="`survey-response-${surveyResponse.id}`"
        :survey-response="surveyResponse"
      />
    </div>
    <ex-loading v-if="loading"/>
    <ex-empty-state
      v-if="!loading && surveyResponses !== null && !surveyResponses.length"
      icon="poll-h"
      message="No surveys completed yet"
      class="mt-4"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ExSurveyResponse from '~/components/surveyResponses/SurveyResponse'
import makeRequest from '../../../util/graphql/makeRequest'
import extractNodes from '../../../util/graphql/extractNodes'
import queryPatientSurveyResponses from '../../../graphql/queries/patient/patientSurveyResponses'

export default {
  name: 'patient-tab-surveys',
  components: { ExSurveyResponse },
  data() {
    return {
      loading: true,
      surveyResponses: null,
      page_index: 1,
    }
  },
  computed: {
    ...mapState('organization/patient', ['patient']),
  },
  mounted() {
    this.getSurveyResponses()
  },
  methods: {
    async getSurveyResponses() {
      this.loading = true
      const { data, errors } = await makeRequest(this.$axios, {
        query: queryPatientSurveyResponses,
        variables: {
          patientId: this.patient.id,
        },
      })

      if (data && !errors.length) {
        this.surveyResponses = extractNodes(data.surveyResponses);
      } else {
        this.error = 'Could not get patient surveys. Please try again later.'
      }
      this.loading = false
    },
  },
}
</script>
