<template>
  <div>
    <transition name="fade" mode="out-in">
      <ex-empty-label v-if="sections.length <= 0" class="mb-5">No Content Exists</ex-empty-label>
      <div v-if="sections.length > 0">
        <ex-editable-article-section-list-item
          v-for="(sectionObject, index) in sections"
          :key="index"
          :section="sectionObject"
          @edit="handleEdit(sectionObject)"
        />
      </div>
    </transition>
    <b-row class="justify-content-center mt-5">
      <b-col cols="auto">
        <b-button
          variant="outline-primary"
          @click.prevent="handleEdit()"
        >
          Add New Section
        </b-button>
      </b-col>
    </b-row>
    <ex-editable-article-section-modal
      id="new-article-editable-article-section-modal"
      @change="handleChange"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ExEditableArticleSectionListItem from './EditableArticleSectionListItem'
import ExEditableArticleSectionModal from './EditableArticleSectionModal'
export default {
  name: 'ex-editable-article-sections',
  components: { ExEditableArticleSectionListItem, ExEditableArticleSectionModal },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState('activities/activity/article', ['article']),
    ...mapGetters('activities/activity/article', ['sections']),
    ...mapState('activities/activity/article/section', ['section']),
  },
  methods: {
    ...mapActions('activities/activity/article', {
      setArticle: 'SET_ARTICLE',
    }),
    ...mapActions('activities/activity/article/section', {
      clearAll: 'CLEAR_ALL',
    }),
    handleEdit(sectionState = {}) {
      this.busEmit('new-article-editable-article-section-modal:start', {
        ...sectionState,
        article_id: this.article.id,
      })
    },
    handleChange(sectionState) {
      // put this section in
      let sections = [...this.sections]
      const existingSectionIndex = this.sections.findIndex(({ id }) => id === sectionState.id)
      if (existingSectionIndex < 0) { sections = [...sections, sectionState] }
      else sections[existingSectionIndex] = sectionState

      this.setArticle({
        ...this.article,
        article_sections: sections,
      })
    }
  }
}
</script>
