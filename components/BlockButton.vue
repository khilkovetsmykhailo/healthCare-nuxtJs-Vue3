<template>
<component
  :is="tag"
  class="ex-block-button"
  :class="[color, { active, disabled }]"
  @click="$emit('click', $event)"
>
  <ex-icon-button
    :icon="icon"
    :color="color"
    :icon-props="iconProps"
    tag="span"
    size="lg"
  />
  <span class="ex-block-button-text">
    <slot/>
  </span>
</component>
</template>

<script>
export default {
  name: 'ex-block-button',
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: undefined,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconProps: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    tag() {
      return this.link ? 'a' : 'button'
    },
  },
}
</script>
