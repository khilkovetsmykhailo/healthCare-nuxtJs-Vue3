<template>
  <div>
    <ex-file-card
      v-for="(file, index) in files"
      :key="index"
      :file="file"
      @upload="handleAddFile(file)"
      @delete="handleDeleteFile"
      :loading="loading"
      :deleting="file.id === deletingId"
      class="shadow-sm"
    />
    <p
      v-if="files.length <= 0"
      class="text-center text-muted py-4 border"
    >
      No Files
    </p>
    <b-row class="justify-content-center" v-if="!limit || files.length < limit">
      <b-col cols="auto">
        <b-button
          @click="handleAddFile()"
          variant="outline-primary"
          size="sm"
        >
          Add File
        </b-button>
      </b-col>
    </b-row>
    <ex-file-modal
      id="editable-activity-files-modal"
      title="Upload Activity Resource"
      description="Complete the fields below to update a new image or audio file."
      :accept="accept"
      show-name
      show-description
      @uploaded="getActivity"
    />
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  name: 'ex-editable-activity-files',
  data: () => ({
    loading: false,
    deletingId: null,
  }),
  props: {
    accept: { type: String, default: [...['png', 'jpg', 'jpeg', 'gif'].map(type => `image/${type}`), 'audio/*'].toString() },
    limit: { type: Number },
  },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapGetters('activities/activity', ['files']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('activities/activity', {
      deleteFile: 'DELETE_FILE',
      fetchActivity: 'FETCH_ACTIVITY',
    }),
    async handleDeleteFile(file) {
      this.loading = true
      this.deletingId = file.id
      await this.wait(this.deleteFile, 1000, file.id)
      await this.getActivity()
    },
    async getActivity() {
      this.loading = true
      await this.wait(this.fetchActivity, 750, this.activity.id)
      this.loading = false
    },
    handleAddFile(fileState) {
      this.busEmit('editable-activity-files-modal:start', fileState || {
        name: this.activity.name,
        owner_type: 'users',
        owner_id: this.user.id,
        activity_id: this.activity.id,
      })
    }
  }
}
</script>
