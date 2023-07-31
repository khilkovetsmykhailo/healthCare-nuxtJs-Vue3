<template>
<ex-list-item v-bind="{ active, disabled, tag }">
  <ex-avatar>{{ initials }}</ex-avatar>
  <div class="ex-list-item-text">
    <div class="ex-li-patient-name">{{ name }}</div>
  </div>
</ex-list-item>
</template>

<script>
export default {
  name: 'ex-patient-list-item-simple',
  props: {
    name: {
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
    tag: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    initials() {
      if (!this.name) return ''
      const namePieces = this.name.split(' ')
      const initials   = []
      if (namePieces[0]) initials.push(namePieces[0][0])
      if (namePieces[1]) initials.push(namePieces[1][0])
      return initials.join('')
    },
  },
}
</script>
