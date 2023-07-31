<template>
  <div>
    <div
      v-for="(section, index) in article.article_sections"
      :key="index"
    >
      <ex-editable-article-section :section="section"/>
      <hr v-if="index < article.article_sections.length - 1"/>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ExEditableArticleSection from './sections/EditableArticleSection'
export default {
  name: "ex-editable-article",
  components: { ExEditableArticleSection },
  data: () => ({
    loading: false,
  }),
  mounted() {
    this.subscribeToStore({
      'activities/activity/article/articleSection/UPDATE_ARTICLE_SECTION': {
        after: () => { this.getArticle() }
      },
    })
  },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/article', ['article']),
  },
  methods: {
    ...mapActions('activities/activity/article', {
      fetchArticle: 'FETCH_ARTICLE',
      clearArticle: 'CLEAR',
    }),
    async getArticle() {
      this.loading = true
      await this.wait(this.fetchArticle, 750, this.activity.parent_id)
      this.loading = false
    },
  }
}
</script>
