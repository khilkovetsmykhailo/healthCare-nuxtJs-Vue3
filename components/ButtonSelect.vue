<template>
  <div class="ex-button-select text-center">
    <b-button
      v-for="(option, index) in options"
      :key="index"
      :variant="isSelected(option) ? color : 'outline-light'"
      size="sm"
      :class="`${index > 0 ? 'mt-3' : ''} ${buttonClass} text-capitalize`"
      :disabled="disabled"
      @click="$emit('change', option)"
    >
      {{ option.label }}
      <span v-if="option.icon">
        <font-awesome-icon
          v-if="option.icon.fontAwesome"
          :icon="option.icon.name"
          class="ex-icon p-2"
          size="lg"
          font-awesome
          inline
        />
        <ex-icon
          v-else
          :icon="option.icon.name"
          class="p-2"
          inline
        />
      </span>
    </b-button>
  </div>
</template>
<script>
export default {
  name: 'ex-button-select',
  props: {
    options: { type: Array, required: true },
    selected: { type: [Array, Object, String, Number, Boolean] },
    disabled: { type: Boolean },
    color: { type: String, default: 'primary' },
    buttonClass: { type: String },
  },
  methods: {
    isSelected(option) {
      if (this.selected === undefined || this.selected === null) return false
      if (Array.isArray(this.selected)) return this.selected.find(({ value }) => value === option.value)
      return typeof this.selected === 'object'
        ? this.selected.value === option.value
        : this.selected === option.value
    },
  },
}
</script>
