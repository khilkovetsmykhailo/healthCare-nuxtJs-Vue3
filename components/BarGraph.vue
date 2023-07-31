<template>
<div
  class="ex-bar-graph"
  :class="{ 'has-y-axis': !!yAxis, 'has-pagination': hasPagination }"
>
  <div class="ex-bar-graph-container">
    <div
      v-if="!!yAxis"
      class="ex-bar-graph-y-axis"
    >
      <div
        v-for="(point, pointI) in yAxis"
        :key="pointI"
        class="ex-bar-graph-axis-point"
      >
        {{ point }}
      </div>
    </div>
    <div class="ex-bar-graph-plot">
      <div
        v-for="(point, i) in data"
        :key="`point-${i}-${point.value}`"
        class="ex-bar-graph-point"
      >
        <div
          v-if="point.expectedValue !== null"
          class="ex-bar-graph-point-fill-expected"
          :style="{
            height: `${mounted ? point.expectedValue : 0}%`,
          }"
        />
        <div
          class="ex-bar-graph-point-fill-actual"
          :style="{
            height: `${mounted ? point.value : 0}%`,
          }"
        />
      </div>
    </div>
  </div>
  <div class="ex-bar-graph-lower-container">
    <b-button
      v-if="hasPagination"
      class="ex-bar-graph-pagination-previous"
      variant="link"
      :disabled="paginationPreviousDisabled"
      @click="$emit('paginate-previous')"
    >
      <ex-icon icon="arrow-left"/>
    </b-button>
    <div class="ex-bar-graph-labels">
      <div
        v-for="(point, i) in data"
        :key="`label-${i}-${point.value}`"
        class="ex-bar-graph-label"
      >
        <div
          v-if="point.label.description"
          class="ex-bar-graph-label-description"
        >
          {{ point.label.description }}
        </div>
        <div
          v-if="point.label.value"
          class="ex-bar-graph-label-value"
        >
          {{ point.label.value }}
        </div>
      </div>
    </div>
    <b-button
      v-if="hasPagination"
      class="ex-bar-graph-pagination-next"
      variant="link"
      :disabled="paginationNextDisabled"
      @click="$emit('paginate-next')"
    >
      <ex-icon icon="arrow-right"/>
    </b-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ex-bar-graph',
  props: {
    data: {
      type: Array,
      required: true,
    },
    yAxis: {
      type: Array,
      default: undefined,
    },
    hasPagination: {
      type: Boolean,
      default: false,
    },
    paginationNextDisabled: {
      type: Boolean,
      default: false,
    },
    paginationPreviousDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mounted: false,
    }
  },
  async mounted() {
    // Wait next tick AND setTimeout(), so it properly renders CSS transitions
    await this.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 500))
    this.mounted = true
  },
}
</script>
