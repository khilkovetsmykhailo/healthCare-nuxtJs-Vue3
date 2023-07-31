<template>
  <label :class="`ex-label my-0 small d-block ${primary ? 'text-primary': 'text-muted'}`">
    <slot/>
  </label>
</template>
<script>
export default {
  name: 'ex-label',
  props: {
    primary: { type: Boolean }
  },
}
</script>
