<template>
  <ex-modal
    v-bind="{ id }"
    :size="activity.type === 'wellness' ? 'md' : 'lg'"
    :no-close-on-backdrop="false"
    :title="activity.name || 'Activity'"
  >
    <template slot="description" v-if="activity.type">
      <p class="mb-0 text-muted">
        <font-awesome-icon :icon="icon" class="text-warning mr-2"/>
        <span class="text-capitalize" v-if="activity.type !== 'survey'">{{ activity.type }} Activity</span>
        <span v-if="activity.type === 'physical' || activity.type === 'stretching'">
          <span class="mx-1">&bull;</span>
          <span class="text-primary">{{ activity.activity_items.length }}</span>
          Items Needed
        </span>
        <span v-if="activity.type === 'survey' && survey">{{ survey.description }}</span>
      </p>
    </template>
    <transition name="fade" mode="out-in">
      <ex-loading v-if="loading"/>
      <b-row
        v-if="!loading && !article && !survey"
        class="align-items-center justify-content-center"
      >

      </b-row>
      <div v-if="!loading && article">
        <ex-article :article="article"/>
      </div>
      <div v-if="!loading && survey">
        <ex-survey :survey="survey"/>
      </div>
    </transition>
  </ex-modal>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ex-editable-activity-modal',
  data: () => ({
    loading: true,
  }),
  props: {
    id: { type: String, required: true },
    activity: { type: Object, required: true }
  },
  computed: {
    ...mapState('activities/activity', ['survey']),
    ...mapState('activities/activity/article', ['article']),
    files() {
      return this.activity && this.activity.activity_resources
        ? this.activity.activity_resources.map(({ file }) => file)
        : []
    },
    icon() {
      const icons = {
        walking: 'walking',
        informational: 'info-circle',
        survey: 'clipboard-list',
        breathing: 'spa',
        wellness: 'spa',
        physical: 'running',
        stretching: 'child',
      }
      return icons[this.activity.type]
    },
    items() {
      return this.activity && this.activity.activity_items
        ? this.activity.activity_items.map(({ item }) => item)
        : []
    },
    audioFile() {
      return this.files.find(({ type }) => type === 'mp3')
    }
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === this.id) {
        this.loading = true
        this.clearAll()
        this.clearArticle()
      }
    })
    this.$root.$on('bv::modal::shown', (bvEvent, modalId) => {
      if (modalId === this.id) {
        const parentType = this.activity.parent_type
        if (parentType === 'articles') this.getArticle()
        else if (parentType === 'surveys') this.getSurvey()
        else this.loading = false
      }
    })
  },
  methods: {
    ...mapActions('activities/activity', {
      clearAll: 'CLEAR_ALL',
      fetchSurvey: 'FETCH_SURVEY',
    }),
    ...mapActions('activities/activity/article', {
      fetchArticle: 'FETCH_ARTICLE',
      clearArticle: 'CLEAR',
    }),
    async getArticle() {
      this.loading = true
      await this.wait(this.fetchArticle, 750, this.activity.parent_id)
      this.loading = false
    },
    async getSurvey() {
      this.loading = true
      await this.wait(this.fetchSurvey, 750, this.activity.parent_id)
      this.loading = false
    }
  }
}
</script>
