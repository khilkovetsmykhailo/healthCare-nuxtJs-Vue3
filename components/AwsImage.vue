<template>
  <ex-loading v-if="loading"/>
  <img
    v-else-if="!loading && !error && imageSource"
    :alt="alt"
    :title="title"
    :src="imageSource"
    class="ex-aws-image"
  />
  <font-awesome-icon
    v-else
    icon="exclamation-triangle"
    class="text-danger"
  />
</template>

<script>
import {Storage} from '../services/amplify/service'

export default {
  name: 'AwsImage',
  props: {
    fileId: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      loading: true,
      error: null,
      imageSource: null,
    }
  },
  mounted() {
    this.getImage()
  },
  methods: {
    async getImage() {
      try {
        this.imageSource = await Storage.get(this.fileId)
        this.loading = false
      } catch (error) {
        this.error = error.message
        console.error(error)
      }
    },
  },
}
</script>
