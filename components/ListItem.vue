<template>
<component
  :is="tag"
  class="ex-list-item"
  :class="{ active, disabled, 'no-hover': noHover, flat }"
  :disabled="disabled"
>
  <slot/>
</component>
</template>

<script>
export default {
  name: 'ex-list-item',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    noHover: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
      validator: value => ['div', 'span', 'a', 'button'].includes(value),
    },
  },
}
</script>
