<template>
  <ex-step
    title="Upload an Image File"
    description="The survey image will show up at the top of the patient application."
    @back="$emit('back')"
    @submit="$emit('next')"
  >
    <b-row class="justify-content-center mt-5">
      <b-col cols="auto">
        <transition name="fade" mode="out-in">
          <b-button
            v-if="!survey.file || !survey.file.id"
            variant="outline-primary"
            @click="handleAddFile()"
            class="my-0"
          >
            Add File
          </b-button>
          <ex-file-card
            v-if="survey.file && survey.file.id"
            :file="survey.file"
            :loading="loading"
            :deleting="deleting"
            class="shadow-sm"
            @upload="handleAddFile(survey.file)"
            @delete="handleDelete"
          />
        </transition>
      </b-col>
    </b-row>
    <ex-file-modal
      id="survey-activity-file-modal"
      title="Upload File"
      :accept="imageFileTypes().map(type => `image/${type}`).toString()"
      @uploaded="getSurvey"
    />
  </ex-step>
</template>
<script>
import ExEditableActivityFiles from '../../editable/EditableActivityFiles'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ex-step-physical-activity-details',
  data: () => ({
    loading: false,
    deleting: false,
  }),
  components: { ExEditableActivityFiles },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/survey', ['survey']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('global/file', {
      deleteFile: 'DELETE_FILE',
    }),
    ...mapActions('activities/activity/survey', {
      fetchSurvey: 'FETCH_SURVEY',
    }),
    handleAddFile(fileState) {
      this.busEmit('survey-activity-file-modal:start', fileState || {
        owner_type: 'users',
        owner_id: this.user.id,
        parent_type: 'surveys',
        parent_id: this.survey.id,
      })
    },
    async getSurvey() {
      this.loading = true
      await this.wait(this.fetchSurvey, 750, this.survey.id)
      this.loading = false
    },
    async handleDelete(fileState) {
      this.loading = true
      this.deleting = true
      await this.wait(this.deleteFile, 750, fileState.id)
      this.getSurvey()
      this.deleting = false
      this.loading = false
    }
  }
}
</script>
