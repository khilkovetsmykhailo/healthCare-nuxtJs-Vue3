<template>
  <b-modal
    :id="id"
    modal-class="ex-new-user"
    size="lg"
    hide-footer
    hide-header
  >
    <transition name="fade" mode="out-in">
      <ex-step-activity-organization
        v-if="currentStep === 'activity-organization'"
        @next="currentStep = 'activity-type'"
      />
      <ex-step-activity-type
        v-if="currentStep === 'activity-type'"
        @back="currentStep = 'activity-organization'"
        @next="currentStep = 'activity-details'"
      />
      <ex-step-activity-details
        v-if="currentStep === 'activity-details'"
        @back="currentStep = 'activity-type'"
        @next="currentStep = `${activity.type}-activity-details`"
      />
      <ex-step-physical-activity-details
        v-if="currentStep === 'physical-activity-details'"
        @back="currentStep = 'activity-details'"
        @next="handleViewActivity"
        @skip="start"
      />
      <ex-step-wellness-activity-details
        v-if="currentStep === 'wellness-activity-details'"
        @back="currentStep = 'activity-details'"
        @next="handleViewActivity"
        @skip="start"
      />
      <ex-step-informational-activity-details
        v-if="currentStep === 'informational-activity-details'"
        @back="currentStep = 'activity-details'"
        @next="currentStep = 'informational-activity-content'"
      />
      <ex-step-informational-activity-content
        v-if="currentStep === 'informational-activity-content'"
        @back="currentStep = 'informational-activity-details'"
        @next="handleViewActivity"
        @skip="start"
      />
      <ex-step-stretching-activity-details
        v-if="currentStep === 'stretching-activity-details'"
        @back="currentStep = 'activity-details'"
        @next="handleViewActivity"
        @skip="start"
      />
      <ex-step-survey-activity-details
        v-if="currentStep === 'survey-activity-details'"
        @back="currentStep = 'activity-details'"
        @next="currentStep = 'survey-activity-files'"
      />
      <ex-step-survey-activity-files
        v-if="currentStep === 'survey-activity-files'"
        @back="currentStep = 'survey-activity-details'"
        @next="currentStep = 'survey-activity-content'"
      />
      <ex-step-survey-activity-content
        v-if="currentStep === 'survey-activity-content'"
        @back="currentStep = 'survey-activity-files'"
        @next="handleViewActivity"
        @skip="start"
      />
    </transition>
  </b-modal>
</template>
<script>
import ExStepActivityOrganization from './steps/ActivityOrganization'
import ExStepActivityType from './steps/ActivitiyType'
import ExStepActivityDetails from './steps/ActivityDetails'
import ExStepPhysicalActivityDetails from './steps/PhysicalActivityDetails'
import ExStepWellnessActivityDetails from './steps/WellnessActivityDetails'
import ExStepInformationalActivityDetails from './steps/InformationalActivityDetails'
import ExStepInformationalActivityContent from './steps/InformationalActivityContent'
import ExStepStretchingActivityDetails from './steps/StretchingActivityDetails'
import ExStepSurveyActivityDetails from './steps/SurveyActivityDetails'
import ExStepSurveyActivityFiles from './steps/SurveyActivityFiles'
import ExStepSurveyActivityContent from './steps/SurveyActivityContent'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ex-new-activity',
  components: {
    ExStepActivityOrganization,
    ExStepActivityType,
    ExStepActivityDetails,
    ExStepPhysicalActivityDetails,
    ExStepWellnessActivityDetails,
    ExStepInformationalActivityDetails,
    ExStepInformationalActivityContent,
    ExStepStretchingActivityDetails,
    ExStepSurveyActivityDetails,
    ExStepSurveyActivityFiles,
    ExStepSurveyActivityContent,
  },
  data: () => ({
    currentStep: 'activity-organization',
  }),
  props: {
    id: { type: String, default: 'new-activity' },
  },
  computed: {
    ...mapState('activities/activity', ['activity']),
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
  },
  methods: {
    ...mapActions('activities/activity', { clearActivity: 'CLEAR_ALL' }),
    ...mapActions('activities/activity/article', { clearArticle: 'CLEAR_ALL' }),
    ...mapActions('activities/activity/article/section', { clearArticleSection: 'CLEAR_ALL' }),
    async start(activityState) {

      if (!activityState || !activityState.id) {
        // clear editable states
        this.clearActivity()
        this.clearArticle()
        this.clearArticleSection()
      }

      // start new process
      // this.currentStep = 'activity-organization'
      this.currentStep = 'activity-details'
      this.$bvModal.show(this.id)
    },
    handleViewActivity() {
      this.$bvModal.hide(this.id)
      this.busEmit('activity-modal:start', this.activity)
    }
  }
}
</script>
