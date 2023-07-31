<template>
  <component
    :is="tag"
    v-bind="{
      id,
      alt,
      width,
      height,
      fluid,
      fluidGrow,
      left,
      right,
      center,
      thumbnail
    }"
    controls
    :src="`${config().API_URL}/files/${id}/${updated_at}?view=true`"
  >
    <source v-if="type === 'mp3'" :src="`${config().API_URL}/files/${id}?view=true`"/>
    <label v-if="type === 'mp3'">audio not supported in this browser</label>
    <slot/>
  </component>
</template>
<script>
export default {
  name: 'ex-file',
  props: {
    // 'files' table model (for v-bind)
    id: { type: String },
    name: { type: String },
    type: { type: String },
    protected: { type: Boolean },
    updated_at: { type: String },
    // b-img props
    alt: { type: String },
    width: { type: [Number, String] },
    height: { type: [Number, String] },
    fluid: { type: Boolean },
    fluidGrow: { type: Boolean },
    left: { type: Boolean },
    right: { type: Boolean },
    center: { type: Boolean },
    thumbnail: { type: Boolean },
    // lazy or not
    lazy: { type: Boolean },
    blankColor: { type: String },
    // miscellaneous
    tooltip: { type: String },
  },
  computed: {
    tag() {
      if (!this.type) return 'div';
      switch (this.type.toLowerCase()) {
        case 'jpeg':
        case 'jpg':
        case 'png':
        case 'gif':
          return this.lazy ? 'b-lazy-img' : 'b-img'
          break
        case 'mp3':
          return 'audio'
          break
        default:
          return 'div'
      }
    }
  },
}
</script>
