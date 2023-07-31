<template>
  <div>
    <b-row class="align-items-center">
      <b-col class="col-12 col-lg-6 order-lg-12 mb-2">
        <ex-label>Duration</ex-label>
        <p>{{ duration }} {{ duration_text || 'Seconds / Repetition' }}</p>
        <ex-label>Purpose</ex-label>
        <p>{{ purpose }}</p>
        <ex-label>Instructions</ex-label>
        <p>{{ instructions }}</p>
      </b-col>
      <b-col class="col-12 col-lg-6 order-lg-1">
        <ex-activity-files :files="files" class="w-100" id="physical-activity-summary-files"/>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import ExActivityFiles from '../ActivityFiles'
export default {
  name: "ex-stretching-activity-summary",
  components: { ExActivityFiles },
  props: {
    activity: { type: Object, required: true },
    // id: { type: Number, required: true },
    // organization_id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    instructions: { type: String },
    purpose: { type: String },
    duration: { type: Number },
    duration_text: { type: String, default: 'Seconds / Rep' },
    // parent_type: { type: String, required: true },
    // parent_id: { type: String, required: true },
    // activity_items: { type: String, required: true },
    // activity_resources: { type: String, required: true },
    files: { type: Array, required: true }
  }
}
</script>
