<template>
  <ex-modal
    v-bind="{ id, title, description, dismissible }"
    size="lg"
    :no-close-on-backdrop="loading"
  >
    <ex-editable-article-section
      :section="section"
      @change="handleChange"
    />
  </ex-modal>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ExEditableArticleSection from './EditableArticleSection'
export default {
  name: 'ex-editable-article-section-modal',
  components: { ExEditableArticleSection },
  data: () => ({
    loading: false,
  }),
  props: {
    id: { type: String, default: 'edit-article-section-modal' },
    title: { type: String, default: 'Edit Section Content' },
    description: { type: String },
    dismissible: { type: Boolean, default: true },
  },
  computed: {
    ...mapState('activities/activity/article', ['article']),
    ...mapState('activities/activity/article/section', ['section']),
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
  },
  methods: {
    ...mapActions('activities/activity/article/section', {
      setSection: 'SET_SECTION',
      updateSectionState: 'UPDATE_SECTION_STATE',
    }),
    async start(sectionState) {
      this.setSection(sectionState)
      this.$bvModal.show(this.id)
    },
    handleChange(sectionState) {
      this.$emit('change', sectionState)
    },
  }
}
</script>
