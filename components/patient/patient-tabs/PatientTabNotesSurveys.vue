<template>
  <div class="ex-patient-tab ex-patient-tab-notes-surveys">
    <h4 class="mb-3">Notes & Surveys</h4>

    <b-tabs
      class="ex-button-tabs mb-3"
      pills
      small
      fill
      @input="currentTabIndex = $event"
    >
      <b-tab title="Notes">
        <ex-patient-sub-tab-notes v-if="currentTabIndex === 0"/>
      </b-tab>
      <b-tab title="Surveys">
        <ex-patient-sub-tab-surveys v-if="currentTabIndex === 1"/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import ExPatientSubTabSurveys from './PatientSubTabSurveys'
import ExPatientSubTabNotes from './PatientSubTabNotes'

export default {
  name: 'patient-tab-pain',
  components: {
    ExPatientSubTabNotes,
    ExPatientSubTabSurveys,
  },
  data() {
    return {
      currentTabIndex: 0,
    }
  },
}
</script>
