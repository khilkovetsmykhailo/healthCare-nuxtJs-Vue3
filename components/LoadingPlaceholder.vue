<template>
<div
  class="ex-loading-placeholder"
  :style="{ height: `${height}rem` }"
/>
</template>

<script>
export default {
  name: 'ex-loading-placeholder',
  props: {
    height: {
      type: Number,
      default: 1,
    },
  },
}
</script>
