<template>
  <div
    v-if="hasPrevious || hasNext"
    class="ex-pagination d-flex justify-content-between"
  >
    <b-button
      :variant="!hasPrevious ? 'outline-secondary' : 'outline-primary'"
      :disabled="!hasPrevious"
      @click="$emit('previous')"
    >
      <span class="d-flex align-items-center">
        <font-awesome-icon icon="angle-double-left"/>
        &nbsp;Previous
      </span>
    </b-button>
    <b-button
      :variant="!hasNext ? 'outline-secondary' : 'outline-primary'"
      :disabled="!hasNext"
      @click="$emit('next')"
    >
      <span class="d-flex align-items-center">
        Next&nbsp;
        <font-awesome-icon icon="angle-double-right"/>
      </span>
    </b-button>
  </div>
</template>
<script>
export default {
  name: 'ex-pagination',
  props: {
    hasNext: {
      type: Boolean,
      default: true,
    },
    hasPrevious: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
