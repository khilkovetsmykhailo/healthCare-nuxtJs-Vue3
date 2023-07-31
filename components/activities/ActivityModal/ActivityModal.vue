<template>
  <ex-modal
    :id="id"
    size="lg"
    :no-close-on-backdrop="false"
    :title="activity.name || 'Activity'"
  >
    <template slot="description" v-if="activity && activity.type">
      <ex-activity-descriptor
        :activity="activity"
        :duration="activity.type === 'informational'"
      >
        <ex-icon-button
          v-if="currentUserIsSystemAdministrator"
          icon="pencil-alt"
          font-awesome
          color="purple"
          tooltip="Edit Activity"
          class="shadow-sm mx-2 p-0 my-0"
          @click.native="busEmit('new-activity:start', activity)"
        />
      </ex-activity-descriptor>
    </template>
    <transition name="fade" mode="out-in">
      <ex-loading v-if="loading"/>
      <component
        v-if="!loading && activity"
        :is="`ex-${activity.type}-activity-summary`"
        :activity="activity"
        :article="article"
        :survey="survey"
        :files="files"
        v-bind="activity"
      />
    </transition>
  </ex-modal>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ExPhysicalActivitySummary from './summaries/PhysicalActivitySummary'
import ExWellnessActivitySummary from './summaries/WellnessActivitySummary'
import ExInformationalActivitySummary from './summaries/InformationalActivitySummary'
import ExStretchingActivitySummary from './summaries/StretchingActivitySummary'
import ExSurveyActivitySummary from './summaries/SurveyActivitySummary'
import ExWalkingActivitySummary from './summaries/WalkingActivitySummary'

export default {
  name: 'ex-activity-modal',
  data: () => ({
    editing: false,
    loading: true,
  }),
  components: {
    ExPhysicalActivitySummary,
    ExWellnessActivitySummary,
    ExInformationalActivitySummary,
    ExStretchingActivitySummary,
    ExSurveyActivitySummary,
    ExWalkingActivitySummary,
  },
  props: {
    id: { type: String, required: true },
    editable: { type: Boolean },
  },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/article', ['article']),
    ...mapGetters('activities/activity', ['files']),
    ...mapState('activities/activity/survey', ['survey']),
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
  },
  methods: {
    ...mapActions('activities/activity', {
      setActivity: 'SET_ACTIVITY',
      fetchActivity: 'FETCH_ACTIVITY',
    }),
    ...mapActions('activities/activity/article', {
      fetchArticle: 'FETCH_ARTICLE',
      clearArticle: 'CLEAR_ALL',
    }),
    ...mapActions('activities/activity/survey', {
      fetchSurvey: 'FETCH_SURVEY',
    }),
    start(activityState) {
      this.loading = true
      this.editing = false
      this.$bvModal.show(this.id)
      this.setActivity(activityState)
      if (activityState.parent_type === 'articles') this.getArticle()
      else if (activityState.parent_type === 'surveys') this.getSurvey()
      else this.loading = false
    },
    async getActivity() {
      this.loading = true
      await this.wait(this.fetchActivity, 750, this.activity.id)
      this.loading = false
    },
    async getArticle() {
      this.loading = true
      await this.wait(this.fetchArticle, 750, this.activity.parent_id)
      this.loading = false
    },
    async getSurvey() {
      this.loading = true
      await this.wait(this.fetchSurvey, 750, this.activity.parent_id)
      this.loading = false
    }
  }
}
</script>
