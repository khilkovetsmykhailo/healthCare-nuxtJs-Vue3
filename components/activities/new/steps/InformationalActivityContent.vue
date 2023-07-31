<template>
  <ex-step
    title="Create New Article"
    stepTitle="Step 5 of 5"
    description="Add sections of content below."
    @back="$emit('back')"
    @submit="$emit('next')"
    :error="error"
    :loading="loading"
    has-skip-step
    skip-step-text="Create Another Activity"
    :skip-step-disabled="sections.length <= 0"
    next-step-text="View Activity"
    :next-step-disabled="sections.length <= 0"
  >
    <transition name="fade" mode="out-in">

      <ex-loading v-if="loading"/>

      <ex-editable-article-sections />

    </transition>
  </ex-step>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ExEditableArticleSections from '../../../articles/editable/EditableArticleSections'
export default {
  name: 'ex-step-informational-activity-content',
  data: () => ({
    loading: false,
  }),
  components: { ExEditableArticleSections },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/article', ['article', 'error']),
    ...mapGetters('activities/activity/article', ['sections']),
  },
  methods: {
    ...mapActions('activities/activity/article', {
      createArticle: 'CREATE_ARTICLE',
      updateArticle: 'UPDATE_ARTICLE',
    }),
    ...mapActions('activities/activity', {
      updateActivity: 'UPDATE_ACTIVITY',
    }),
    async handleChange(articleState) {
      this.loading = true
      const operation = this.article.id ? this.updateArticle : this.createArticle
      await this.wait(operation, 1000, this.article)
      if (!this.article.parent_id) await this.updateActivity({
        id: this.activity.id,
        parent_type: 'articles',
        parent_id: this.article.id,
      })
      if (!this.error && this.article.id) this.$emit('next')
      this.loading = false
    }
  }
}
</script>
