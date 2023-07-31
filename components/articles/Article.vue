<template>
  <div>
      <h4 class="text-primary font-weight-normal">{{ article.title }}</h4>
      <hr/>
      <ex-article-section
        v-for="(section, index) in article.article_sections"
        :key="index"
        :section="section"
        :no-hr="index >= article.article_sections.length - 1"
      />
  </div>
</template>
<script>
import ExArticleSection from './sections/ArticleSection'
export default {
  name: 'ex-article',
  components: { ExArticleSection },
  props: {
    article: { type: Object, required: true }
  },
}
</script>
