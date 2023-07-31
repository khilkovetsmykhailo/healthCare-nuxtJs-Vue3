<template>
  <b-card class="ex-activity-card shadow-sm mb-3" no-body>
    <b-row>
      <b-col class="col-12 col-md-12 col-lg-6">
        {{ images.length }}
      </b-col>
      <b-col class="col-12 col-md-12 col-lg-6">
        <b-card-body>
          <h6 class="font-weight-normal">{{ name }}</h6>
          <hr class="my-1"/>
          <p
            class="text-truncate text-muted small"
            v-b-tooltip.hover="instructions"
            style="max-height: 3rem;"
          >
            {{ instructions || 'no description listed' }}
          </p>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
export default {
  name: 'ex-activity-card',
  props: {
    // activities table model
    id: { type: [String, Number] },
    organization_id: { type: String },
    name: { type: String },
    type: { type: String },
    instructions: { type: String },
    instructions_audio_file_id: { type: [String, Number] },
    purpose: { type: String },
    duration: { type: [String, Number] },
    duration_text: { type: String },
    // related fields
    activity_items: { type: Array },
    activity_resources: { type: Array },
  },
  computed: {
    images() {
      if (!this.activity_resources) return []
      const imageFileTypes = ['png', 'jpg', 'jpeg', 'gif']
      return this.activity_resources.filter(({ file }) => imageFileTypes.includes(file.type))
    },
  },
}
</script>
