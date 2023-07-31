<template>
  <ex-step
    title="Create New Article"
    stepTitle="Step 4 of 5"
    description="Creating a new informational activity also creates a new article, with its own title and content. Confirm or customize the details below and click 'Next Step' to continue."
    :has-next-step="false"
    @back="$emit('back')"
    :error="error"
    :loading="loading"
  >
    <transition name="fade" mode="out-in">

      <ex-loading v-if="loading"/>

      <ex-editable-article-details
        hide-reset
        buttonSize="lg"
        @change="handleChange"
        submit-text="Next Step"
        v-else
      />
    </transition>
  </ex-step>
</template>
<script>
import ExEditableArticleDetails from '../../../articles/editable/EditableArticleDetails'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ex-step-informational-activity-details',
  components: { ExEditableArticleDetails },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/article', ['article', 'error'])
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
      await this.wait(operation, 1000, articleState)
      if (!articleState.parent_id) await this.updateActivity({
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
