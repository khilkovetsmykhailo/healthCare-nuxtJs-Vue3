<template>
  <component
    :is="tag"
    class="small text-center text-muted py-4 border"
  >
    <slot/>
  </component>
</template>
<script>
export default {
  name: 'ex-empty-label',
  props: {
    tag: { type: String, default: 'p' },
  },
}
</script>
