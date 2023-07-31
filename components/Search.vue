<template>
<div class="ex-search">
  <ex-icon icon="search"/>
  <b-form-input
    class="mb-3"
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    @input="handleInput"
    @change="handleChange"
    autofocus
  />
</div>
</template>

<script>
export default {
  name: 'ex-search',
  model: {
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange(query) {
      if (this.searchTimeout) clearTimeout(this.searchTimeout)
      this.$emit('change', query)
      this.$emit('search', query)
    },

    handleInput(query) {
      this.$emit('input', query)
      if (this.searchTimeout) clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.$emit('search', query)
      }, 1500)
    },
  },
}
</script>
