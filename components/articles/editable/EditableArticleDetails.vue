<template>
  <div>
    <b-form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
      <b-row>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="title-input-group"
            label="Article Title"
            label-for="title-input"
          >
            <b-form-input
              id="title-input"
              v-model="articleState.title"
              type="text"
              required
              placeholder="Enter title here..."
              autofocus
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="duration-input-group"
            label="Duration (seconds)"
            label-for="duration-input"
          >
            <b-form-input
              id="duration-input"
              v-model="articleState.duration"
              type="number"
              required
              placeholder="Enter duration here..."
            />
          </b-form-group>
        </b-col>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="duration-text-input-group"
            label="Duration Text"
            label-for="duration-text-select"
          >
            <b-form-select
              id="duration-text-select"
              v-model="articleState.duration_text"
              :options="durationTextOptions"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row :class="hideReset ? 'justify-content-center mt-5 mb-5' : 'justify-content-between mt-2'">
        <b-col cols="auto" v-if="!hideReset">
          <b-button
            variant="link"
            type="reset"
            :size="buttonSize"
          >
            Reset
          </b-button>
        </b-col>
        <b-col cols="auto">
          <b-button
            variant="primary"
            type="submit"
            :size="buttonSize"
          >
            {{ submitText }}
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'ex-editable-article-details',
  data: () => ({
    loading: false,
    articleState: {
      title: null,
      duration: 60,
      duration_text: 'Minute Read',
    },
    durationTextOptions: [
      { text: 'Seconds / Rep (Default)', value: null },
      'Minute Read',
      'Minute Video',
    ]
  }),
  props: {
    hideReset: { type: Boolean },
    buttonSize: { type: String },
    submitText: { type: String, default: 'Submit' },
  },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapState('activities/activity/article', ['article']),
  },
  mounted() {
    if (!this.article || !this.article.id) {
      this.setArticle({
        title: this.activity.name,
        duration: this.activity.duration,
        duration_text: this.activity.duration_text,
      })
    }
    this.articleState = { ...this.article }
  },
  methods: {
    ...mapActions('activities/activity/article', {
      setArticle: 'SET_ARTICLE',
    }),
    handleSubmit() {
      this.$emit('change', this.articleState)
    },
    handleReset() {
      this.articleState = { ...this.article }
    }
  }
}
</script>
