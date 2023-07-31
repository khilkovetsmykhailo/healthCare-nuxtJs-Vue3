<template>
  <div>
    <div v-if="audioFile" class="mb-3">
      <audio controls class="w-100">
        <source :src="`${config().API_URL}/files/${audioFile.id}?view=true`"/>
        <label>audio not supported in this browser</label>
      </audio>
    </div>
    <ex-files
      id="activity-modal-files"
      :files="files"
      class="shadow-sm"
      controls
      indicators
    />
  </div>
</template>
<script>
export default {
  name: 'ex-activity-files',
  props: {
    files: { type: Array, required: true },
  },
  computed: {
    audioFile() {
      return this.files.find(({ type }) => type === 'mp3')
    },
  }
}
</script>
