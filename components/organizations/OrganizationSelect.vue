<template>
  <div class="ex-organization-select">
    <b-button
      v-for="(org, index) in organizations"
      :key="index"
      @click="$emit('change', org)"
      :variant="selectedOrganizations.find(({ id }) => id === org.id) ? 'warning' : 'outline-light'"
      size="sm"
      class="w-100"
      v-bind:class="{ 'mt-3': index > 0 }"
      :disabled="disabled"
    >
      {{ org.name }}
    </b-button>
  </div>
</template>
<script>
export default {
  name: 'ex-organization-select',
  props: {
    organizations: { type: Array, required: true },
    selectedOrganizations: { type: Array, required: true },
    disabled: { type: Boolean },
  },
}
</script>
