<template>
  <div>
    <b-form @submit.prevent="handleSubmit" @reset.prevent="setActivityState">
      <b-row>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="name-input-group"
            label="Activity Name"
            label-for="name-input"
          >
            <b-form-input
              id="name-input"
              v-model="activityState.name"
              type="text"
              required
              placeholder="Enter name here..."
              autofocus
            />
          </b-form-group>
        </b-col>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="type-input-group"
            label="Activity Type"
            label-for="type-select"
          >
            <b-form-select
              id="type-select"
              v-model="activityState.type"
              :options="types"
              :disabled="disableType"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="duration-input-group"
            label="Duration (seconds)"
            label-for="duration-input"
          >
            <b-form-input
              id="duration-input"
              v-model="activityState.duration"
              type="number"
              required
              placeholder="Enter duration here..."
            />
          </b-form-group>
        </b-col>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="duration-text-input-group"
            label="Duration Text"
            label-for="duration-text-select"
          >
            <b-form-select
              id="duration-text-select"
              v-model="activityState.duration_text"
              :options="durationTextOptions"
            />
          </b-form-group>
        </b-col>

        <hr/>

        <b-col class="col-12 col-xl-6" v-if="['physical', 'stretching'].includes(activityState.type)">
          <b-form-group
            id="instructions-textarea-group"
            label="Instructions"
            label-for="instructions-textarea"
          >
            <b-form-textarea
              id="instructions-textarea"
              v-model="activityState.instructions"
              placeholder="Enter instructions here..."
              rows="3"
              max-rows="20"
              required
            />
          </b-form-group>
        </b-col>

        <b-col class="col-12 col-xl-6" v-if="['physical', 'stretching'].includes(activityState.type)">
          <b-form-group
            id="purpose-textarea-group"
            label="Purpose"
            label-for="purpose-textarea"
          >
            <b-form-textarea
              id="purpose-textarea"
              v-model="activityState.purpose"
              placeholder="Enter purpose here..."
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
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'ex-editable-activity-details',
  data: () => ({
    activityState: {
      name: null,
      type: null,
      instructions: null,
      purpose: null,
      duration: null,
      duration_text: null,
    },
    loading: true,
    types: [
      { text: 'Walking', value: 'walking' },
      { text: 'Informational', value: 'informational' },
      { text: 'Survey', value: 'survey' },
      { text: 'Breathing', value: 'breathing' },
      { text: 'Wellness', value: 'wellness' },
      { text: 'Physical', value: 'physical' },
      { text: 'Stretching', value: 'stretching' },
    ],
    durationTextOptions: [
      { text: 'Seconds / Rep (Default)', value: null },
      'Minute Read',
      'Minute Video',
    ]
  }),
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/article', ['article']),
  },
  props: {
    id: { type: String, default: 'editable-activity-details' },
    disableType: { type: Boolean },
    hideReset: { type: Boolean },
    buttonSize: { type: String },
    submitText: { type: String, default: 'Submit' },
  },
  mounted() {
    this.setActivityState()
  },
  methods: {
    setActivityState() {
      this.activityState = {
        ...this.activity,
        duration_text: this.activity.type === 'informational' ? 'Minute Read' : this.activity.duration_text,
      }
    },
    handleSubmit() {
      this.$emit('change', this.activityState)
    },
  }
}
</script>
