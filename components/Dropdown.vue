<template>
  <b-dropdown
    class="ex-dropdown"
    :left="!right"
    :right="right"
    @shown="$emit('shown')"
  >
    <template v-slot:button-content>
      <ex-icon-button
        :size="size"
        :icon="icon"
        :tooltip="tooltip"
        :color="color"
        :font-awesome="fontAwesome"
        tag="span"
      />
    </template>
    <slot/>
  </b-dropdown>
</template>
<script>
export default {
  name: 'ex-dropdown',
  props: {
    size: { type: String, default: 'lg' },
    icon: { type: String, default: 'menu' },
    tooltip: { type: String },
    right: { type: Boolean },
    fontAwesome: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
  }
}
</script>
