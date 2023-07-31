<template>
  <b-card class="mb-3">
    <b-row class="align-items-center">
      <b-col class="col-12 col-md-6">
        <ex-file
          v-bind="file"
          v-bind:class="{ border: imageFileTypes().includes(file.type) }"
          fluid
          fluid-grow
        />
      </b-col>
      <b-col class="col-12 col-md-6">
        <ex-loading v-if="deleting" variant="danger"/>
        <div v-else>
          <ex-label>File Name</ex-label>
          <p>{{ file.name }}.{{ file.type }}</p>
          <ex-label>Description</ex-label>
          <p>{{ file.description || 'No Description'}}</p>
          <ex-icon-button
            :disabled="loading"
            icon="pencil-alt"
            font-awesome
            color="purple"
            tooltip="Upload New File"
            v-if="!hideUpdate"
            class="ml-2"
            @click.prevent="$emit('upload', file)"
            type="button"
          />
          <ex-icon-button
            :disabled="loading"
            icon="trash-alt"
            font-awesome
            color="red"
            tooltip="Delete"
            @click.prevent="tryDeleteFile"
            v-if="!hideDelete"
            class="ml-2"
          />
          <ex-icon-button
            :disabled="loading"
            icon="download"
            font-awesome
            tooltip="Download"
            tag="a"
            :href="`${config().API_URL}/files/${file.id}?download=true`"
            class="mx-2"
          />
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
export default {
  name: 'ex-file-card',
  props: {
    file: { type: Object, required: true },
    loading: { type: Boolean },
    deleting: { type: Boolean },
    hideUpdate: { type: Boolean },
    hideDelete: { type: Boolean },
  },
  methods: {
    tryDeleteFile() {
      const confirmation = confirm(`Are you sure you'd like to delete "${this.file.name}.${this.file.type}?"`)
      if (!confirmation) return
      this.$emit('delete', this.file)
    }
  }
}
</script>
