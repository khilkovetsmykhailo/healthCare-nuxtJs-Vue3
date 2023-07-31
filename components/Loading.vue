<template>
<div class="Demo-loading text-center" v-bind:class="loadingClass">
  <b-spinner
    :variant="variant"
    type="grow"
    :style="style"
  />
  <div
    v-if="$slots.default"
    class="h4 my-4"
  >
    <slot/>
  </div>
</div>
</template>

<script>
export default {
  name: 'ex-loading',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value),
    },
    variant: {
      type: String,
      default: 'primary',
    },
    loadingClass: {
      type: String,
      default: 'p-4',
    },
  },
  computed: {
    style() {
      const sizeMap = {
        small: 3,
        medium: 5,
        large: 10,
      }
      return {height: `${sizeMap[this.size]}rem`, width: `${sizeMap[this.size]}rem`}
    },
  },
}
</script>
