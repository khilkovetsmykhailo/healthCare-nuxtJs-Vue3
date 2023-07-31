<template>
<component
  :is="tag"
  class="ex-icon-button"
  :class="[color, size, { circle, disabled }]"
  @click="$emit('click', $event)"
  v-b-tooltip.hover="tooltip"
  :title="tooltip"
  :disabled="disabled"
>
  <span class="ex-icon-button-container">
    <ex-icon
      v-if="!fontAwesome && !iconProps.fontAwesome"
      v-bind="{ icon, ...iconProps }"
    />
    <font-awesome-icon
      v-if="fontAwesome || iconProps.fontAwesome"
      v-bind="{ icon, size, ...iconProps }"
    />
    <slot/>
  </span>
</component>
</template>

<script>
export default {
  name: 'ex-icon-button',
  props: {
    icon: {
      type: [String, Array],
      required: false,
    },
    fontAwesome: {
      type: Boolean,
      required: false,
    },
    color: {
      type: String,
      default: undefined,
      validate: color => ['lavender', 'red', 'yellow', 'purple'].includes(color),
    },
    circle: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'lg',
      validator: value => ['sm', 'md', 'lg', '1x', '2x', '3x', '4x', '5x'].includes(value),
    },
    tag: {
      type: String,
      default: 'button',
      validator: value => ['span', 'button', 'a'].includes(value),
    },
    tooltip: {
      type: String,
      required: false,
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
}
</script>
