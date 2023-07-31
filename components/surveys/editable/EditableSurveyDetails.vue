<template>
  <div>
    <b-form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
      <b-row>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="name-input-group"
            label="Survey Name"
            label-for="name-input"
          >
            <b-form-input
              type="text"
              id="name-input"
              v-model="surveyState.name"
              placeholder="Enter name here..."
              required
              autofocus
            />
          </b-form-group>
        </b-col>
        <b-col class="col-12">
          <b-form-group
            id="description-input-group"
            label="Survey Description"
            label-for="description-input"
          >
            <b-form-textarea
              id="description-input"
              v-model="surveyState.description"
              placeholder="Enter description here..."
              rows="3"
              max-rows="20"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row :class="hideReset ? 'justify-content-center mt-5 mb-5' : 'justify-content-between mt-2'">
        <b-col cols="auto" v-if="!hideReset">
          <b-button
            variant="link"
            type="reset"
            :size="buttonSize"
          >
            Reset
          </b-button>
        </b-col>
        <b-col cols="auto">
          <b-button
            variant="primary"
            type="submit"
            :size="buttonSize"
          >
            {{ submitText }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <ex-file-modal
      id="editable-survey-details-file-modal"
      title="Upload New File"
      description="Complete the fields below to upload a new image file."
      :accept="imageFileTypes().map(type => `image/${type}`).toString()"
      @uploaded="handleUploaded"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "ex-editable-survey-details",
  data: () => ({
    loading: true,
    surveyState: {
      name: null,
      description: null,
    },
  }),
  props: {
    submitText: { type: String, default: 'Submit' },
    hideReset: { type: Boolean },
    buttonSize: { type: String },
  },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/survey', ['survey']),
    ...mapState('auth', ['user']),
  },
  mounted() {
    if (!this.survey || !this.survey.id) {
      this.setSurvey({ name: this.activity.name })
    }
    this.surveyState = { ...this.survey }
  },
  methods: {
    ...mapActions('activities/activity/survey', {
      setSurvey: 'SET_SURVEY',
    }),
    handleSubmit() {
      this.$emit('change', this.surveyState)
    },
    handleReset() {
      this.surveyState = { ...this.survey }
    },
    handleUploaded(file) {
      this.setSurve({ ...this.surveyState, file })
      this.surveyState = { ...this.section }
      this.$emit('change', this.surveyState)
    },
    handleAddFile(fileState) {
      this.busEmit('editable-survey-details-file-modal:start', fileState || {
        owner_type: 'users',
        owner_id: this.user.id,
        parent_type: 'surveys',
        parent_id: this.survey.id,
      })
    }
  }
}
</script>
