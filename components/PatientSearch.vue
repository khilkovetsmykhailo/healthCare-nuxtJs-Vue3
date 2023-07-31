<template>
<div class="ex-patient-search">
  <ex-search
    :placeholder="placeholder"
    @search="$emit('search', $event)"
  />
  <ex-patient-list
    v-if="!loading"
    :patients="patients"
    :selected="selected"
    :item-template="itemTemplate"
    @select="$emit('select', $event)"
  />
  <ex-loading v-if="loading"/>
  <div
    v-if="noResults"
    class="no-patients"
  >
    <slot/>
    <template v-if="!$slots.default">No patients found</template>
  </div>
</div>
</template>

<script>
export default {
  name: 'patient-search',
  props: {
    patients: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Search for a patient by name or D.O.B.',
    },
    noResults: {
      type: Boolean,
      default: false,
    },
    itemTemplate: {
      type: String,
      default: 'ex-patient-list-item',
    },
  },
}
</script>
