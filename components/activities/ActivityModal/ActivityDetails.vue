<template>
  <div>
    <span v-if="activity.instructions">
      <ex-label>
        Instructions
      </ex-label>
      <p>{{ activity.instructions }}</p>
    </span>
    <span v-if="activity.purpose">
      <ex-label>Purpose</ex-label>
      <p>{{ activity.purpose }}</p>
    </span>
    <span v-if="items.length > 0">
      <b-row class="mt-2">
        <b-col
          cols="auto"
          v-for="(item, index) in items"
          :key="index"
        >
          <ex-icon-button
            tag="span"
            :icon="item.name"
            size="lg"
          />
          <br/>
          <label class="w-100 mt-2 text-center small text-muted text-capitalize">
            {{ item.name }}
          </label>
        </b-col>
      </b-row>
    </span>
  </div>
</template>
<script>
export default {
  name: 'ex-activity-details',
  props: {
    activity: { type: Object, required: true },
  },
  computed: {
    items() {
      return this.activity && this.activity.activity_items
        ? this.activity.activity_items.map(({ item }) => item)
        : []
    },
  }
}
</script>
