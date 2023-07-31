<template>
<span
  class="ex-graph-key"
  :class="[ which ]"
>
  <span class="ex-graph-key-container">
    <span class="ex-graph-key-dot"/>
    <slot/>
  </span>
</span>
</template>

<script>
export default {
  name: 'ex-graph-key',
  props: {
    which: {
      type: String,
      default: 'empty',
      validator: value => ['fill', 'empty'].includes(value),
    },
  },
}
</script>
