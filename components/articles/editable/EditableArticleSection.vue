<template>
  <div>
    <b-form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
      <b-row>
        <b-col class="col-12 col-lg-6">
          <b-form-group
            id="type-input-group"
            label="Content Type"
            label-for="type-select"
          >
            <b-form-select
              id="type-select"
              v-model="sectionState.type"
              :options="typeOptions"
              @input="handleTypeInput"
              required
            />
          </b-form-group>
        </b-col>
        <transition name="fade">
          <b-col
            class="col-12 col-lg-6"
            v-if="['text', 'video'].includes(sectionState.type)"
          >
            <b-form-group
              id="duartion-input-group"
              label="Duration (in seconds)"
              label-for="duration-input"
            >
              <b-form-input
                id="duration-input"
                v-model="sectionState.duration"
                placeholder="Enter duration..."
                :disabled="loading"
                type="number"
                required
                autofocus
              />
            </b-form-group>
          </b-col>
        </transition>
      </b-row>
      <transition name="fade" mode="out-in">
        <b-row v-if="sectionState.type === 'text'">
          <b-col cols="12">
            <b-form-group
              id="content-input-group"
              label-for="content-input"
            >
              <template slot="label">
                Content
                <span class="small text-muted">
                  (more information on formatting <a target="_blank" href="https://www.markdownguide.org/getting-started">here</a>)
                </span>
              </template>
              <b-form-textarea
                id="content-input"
                v-model="sectionState.content"
                placeholder="Enter content here..."
                max-rows="6"
                :disabled="loading"
                rows="3"
                required
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <hr/>
            <label>
              Content Preview:
              <br/>
              <span class="small text-muted">* preview does not include styling</span>
            </label>
            <ex-article-section :section="sectionState"/>
          </b-col>
        </b-row>
        <b-row v-if="sectionState.type === 'image'">
          <b-col cols="12">
            <label>Image File:</label>
            <transition name="fade" mode="out-in">
              <ex-loading v-if="loading"/>
              <ex-file-card
                v-if="!loading && section.file && section.file.id"
                :file="section.file"
                hide-delete
                @upload="handleAddFile(section.file)"
                :deleting="section.file.id === deletingId"
                :loading="loading"
              />
              <ex-empty-label v-if="!loading && (!section.file || !section.file.id)">
                No File Specified
                <br/>
                <b-button
                  variant="outline-primary"
                  size="sm"
                  class="mt-3"
                  @click="handleAddFile()"
                >
                  Select File
                </b-button>
              </ex-empty-label>
            </transition>
          </b-col>
        </b-row>
        <b-row v-if="sectionState.type === 'video'">
          <b-col class="col-12 col-lg-6">
            <b-form-group
              id="video-content-input-group"
              label="Youtube Video Link"
              label-for="video-content-input"
            >
              <template slot="description">
                To find the embed link, <a target="_blank" href="https://help.glassdoor.com/article/Finding-the-embed-code-on-YouTube-or-Vimeo/en_US/">follow these instructions</a>
              </template>
              <b-form-input
                id="video-content-input"
                v-model="sectionState.content"
                placeholder="https://youtu.be/ (your video ID)"
                :disabled="loading"
                required
              />
            </b-form-group>
          </b-col>
          <b-col class="col-12 col-lg-6">
            <label>Youtube Video Player</label>
            <ex-article-section :section="sectionState" no-hr/>
          </b-col>
        </b-row>
        <b-row v-if="sectionState.type === 'website'">
          <b-col class="col-12 col-lg-6">
            <b-form-group
              id="website-content-input-group"
              label="URL"
              label-for="website-content-input"
            >
              <b-form-input
                id="website-content-input"
                v-model="sectionState.content"
                placeholder="https://Demohealth.com"
                :disabled="loading"
                required
                class="border"
              />
            </b-form-group>
          </b-col>
          <transition name="fade">
            <b-col class="col-12 col-lg-6" v-if="sectionState.content">
              <label>Website Preview</label>
              <b-embed
                type="iframe"
                aspect="16by9"
                :src="sectionState.content"
                allowfullscreen
                class="border"
              />
            </b-col>
          </transition>
        </b-row>
      </transition>
      <b-row class="justify-content-between mt-5">
        <b-col cols="auto">
          <b-button
            variant="link"
            type="reset"
            :disabled="loading"
          >
            Reset
          </b-button>
        </b-col>
        <b-col cols="auto">
          <b-button
            variant="primary"
            type="submit"
            :disabled="loading"
          >
            Submit
          </b-button>
        </b-col>
      </b-row>
    </b-form>
    <ex-file-modal
      id="editable-article-section-file-modal"
      v-if="sectionState.type === 'image'"
      title="Upload New File"
      description="Complete the fields below to update a new image file."
      show-description
      show-name
      :accept="imageFileTypes().map(type => `image/${type}`).toString()"
      @uploaded="handleUploaded"
    />
  </div>
</template>
<script>
import ExArticleSection from '../ArticleSection'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ex-editable-article-section',
  components: { ExArticleSection },
  data: () => ({
    editMode: false,
    deletingId: null,
    loading: false,
    sectionState: {
      id: null,
      type: 'text',
      content: null,
      order: null,
      article_id: null,
      duration: null,
      file: null,
    },
    typeOptions: [
      { text: 'Text', value: 'text' },
      { text: 'Image', value: 'image' },
      { text: 'Youtube Video', value: 'video' },
      { text: 'Website (URL)', value: 'website' },
    ]
  }),
  props: {
    section: { type: Object, required: false },
  },
  computed: {
    ...mapState('auth', ['user']),
    file() {
      return this.sectionState.file
    }
  },
  mounted() {
    this.sectionState = { ...this.section }
    this.subscribeToStore({
      'global/file/CREATE_FILE': {
        before: () => { this.loading = true },
        after: () => { this.loading = false },
      },
      'global/file/UPDATE_FILE': {
        before: () => { this.loading = true },
        after: () => { this.loading = false },
      }
    })
  },
  methods: {
    ...mapActions('activities/activity/article/section', {
      createSection: 'CREATE_SECTION',
      updateSection: 'UPDATE_SECTION',
      setSection: 'SET_SECTION',
    }),
    async handleSubmit({ noSubmit } = {}) {
      this.loading = true
      const operation = this.sectionState.id ? this.updateSection : this.createSection
      await this.wait(operation, 750, this.sectionState)
      this.$emit('change', { ...this.section })
      this.sectionState = { ...this.section }
      if (!noSubmit) this.$emit('submitted')
      this.loading = false
    },
    handleReset() {
      this.sectionState = { ...this.section }
    },
    handleTypeInput(selectedType) {
      if (this.sectionState.id) return
      switch (selectedType) {
        case 'text':
          this.sectionState.duration = 60
          break
        case 'image':
          this.sectionState.content = ''
          this.sectionState.duration = 0
          if (!this.sectionState.id) this.handleSubmit({ noSubmit: true })
          break
        case 'video':
          this.sectionState.content = ''
          this.sectionState.duration = 60
          break
        default:
          this.sectionState.duration = 0
          this.sectionState.content = ''
      }
    },
    handleAddFile(fileState) {
      this.busEmit('editable-article-section-file-modal:start', fileState || {
        owner_type: 'users',
        owner_id: this.user.id,
        parent_type: 'article_sections',
        parent_id: this.sectionState.id,
      })
    },
    handleUploaded(file) {
      this.setSection({ ...this.sectionState, file })
      this.sectionState = { ...this.section }
      this.$emit('change', this.sectionState)
    },
  }
}
</script>
