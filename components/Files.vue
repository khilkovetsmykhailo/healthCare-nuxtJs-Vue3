<template>
  <b-carousel
    v-bind="{ id, interval, controls, indicators }"
    :img-height="height"
  >
    <b-carousel-slide
      v-for="(file, index) in imageFiles"
      :key="index"
    >
      <template v-slot:img>
        <div :style="`height: ${height}; width: ${height}`" class="position-relative">
          <img
            :height="height"
            class="centered-image"
            :src="`${config().API_URL}/files/${file.id}?view=true`"
            :alt="file.name"
          />
        </div>
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>
<script>
export default {
  name: 'ex-files',
  props: {
    files: { type: Array, required: true },
    id: { type: String, required: true },
    interval: { type: Number, default: 2000 },
    controls: { type: Boolean },
    indicators: { type: Boolean },
    height: { type: [Number, String], default: 250 },
  },
  computed: {
    imageFiles() {
      return this.files && this.files.length > 0
        ? this.files.filter(({ type }) => this.imageFileTypes().includes(type))
        : []
    }
  }
}
</script>
