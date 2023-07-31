<template>
  <div>
    <ex-article :article="article"/>
  </div>
</template>
<script>
import ExArticle from '../../../articles/Article'
export default {
  name: "ex-physical-activity-summary",
  components: { ExArticle },
  props: {
    activity: { type: Object, required: true },
    article: { type: Object, required: true },
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
  },
  methods: {
    minutes(seconds) {
      if (!seconds) return
      return Math.ceil(seconds / 60)
    }
  }
}
</script>
