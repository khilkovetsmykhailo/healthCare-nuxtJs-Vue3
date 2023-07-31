<template>
  <ex-modal
    :dismissible="!loading"
    v-bind="{ id, title, description }"
    @close="$emit('close')"
    size="md"
    :no-close-on-backdrop="loading"
  >
    <transition name="fade" mode="out-in">
      <ex-loading v-if="loading">
        <p class="lg">Uploading File. This may take up to a few minutes, especially for large audio files.</p>
        <p class="small">
          Please do not leave or refresh the page.
        </p>
      </ex-loading>
      <b-alert
        v-if="!loading && error"
        show
        variant="danger"
      >
        {{ error }}
      </b-alert>
    </transition>
    <b-form
      v-if="!loading"
      :id="`${this.id}-form`"
      @submit.prevent="handleSubmit"
      @reset.prevent="handleReset"
    >
      <b-form-group
        :id="`${this.id}-name-input-group`"
        label="File Name"
        :label-for="`${this.id}-name-input`"
        v-if="showName"
      >
        <b-form-input
          autofocus
          :id="`${this.id}-name-input`"
          v-model="fileState.name"
          required
        />
      </b-form-group>
      <b-form-group
        :id="`${this.id}-description-input-group`"
        label="Description"
        :label-for="`${this.id}-description-input`"
        v-if="showDescription"
      >
        <b-form-input
          :id="`${this.id}-description-input`"
          v-model="fileState.description"
          placeholder="Enter description here..."
          required
        />
      </b-form-group>
      <b-form-group
        :id="`${this.id}-file-input-group`"
        :label-for="`${this.id}-file-input`"
        label="Select a File"
      >
        <b-form-file
          :id="`${this.id}-file-input`"
          v-model="fileState.data"
          :accept="accept"
          :placeholder="fileState.id ? 'Choose a New File...' : placeholder"
          drop-placeholder="Drop file here..."
          :required="!fileState.id"
        />
      </b-form-group>
      <b-row class="justify-content-between mt-5 mb-3">
        <b-col cols="auto">
          <b-button variant="link" type="reset" >Reset</b-button>
        </b-col>
        <b-col cols="auto">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
      </b-row>
    </b-form>
  </ex-modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ex-file-modal',
  data: () => ({
    loading: false,
    fileState: {
      data: null,
      name: null,
      description: null,
    },
  }),
  props: {
    accept: { type: String }, // comma-delimited acceptable file types
    id: { type: String, required: true },
    title: { type: String, default: 'Upload New File' },
    description: { type: String, default: 'Complete the fields below.' },
    placeholder: { type: String, default: 'Select file...' },
    showName: { type: Boolean },
    showDescription: { type: Boolean },
  },
  computed: {
    ...mapState('global/file', ['error', 'file']),
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
  },
  methods: {
    ...mapActions('global/file', {
      clearError: 'CLEAR_ERROR',
      setFile: 'SET_FILE',
      updateFile: 'UPDATE_FILE',
      createFile: 'CREATE_FILE',
    }),
    start(fileState) {
      this.clearError()
      this.setFile(fileState)
      this.fileState = { ...this.file }
      this.$bvModal.show(this.id)
    },
    async handleSubmit() {
      this.loading = true
      const operation = this.fileState.id ? this.updateFile : this.createFile
      await this.wait(operation, 750, this.fileState)
      if (this.file?.id && !this.error) {
        this.$bvModal.hide(this.id)
        this.$emit('uploaded', this.file)
      }
      this.loading = false
    },
    handleReset() {
      this.fileState = { ...this.file }
    }
  },
}
</script>
