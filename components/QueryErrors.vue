<template>
  <div v-if="errors.length">
    <b-alert
      variant="danger"
      show
    >
      <slot/>
      <template v-if="!$slots.default">There was an issue displaying this page. Please try again later.</template>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'QueryErrors',
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
}
</script>
