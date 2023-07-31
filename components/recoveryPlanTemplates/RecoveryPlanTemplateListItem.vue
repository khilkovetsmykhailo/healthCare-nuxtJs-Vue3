<template>
<ex-list-item tag="button">
  <b-row
    class="mx-0 align-items-center justify-content-between w-100"
    style="flex-wrap: nowrap"
    no-gutters
  >
    <b-col cols="auto">
      <b-row no-gutters class="align-items-center " style="height: 64px;">
        <b-col cols="auto">
          {{ templateName }}
          <p v-if="$slots.default" class="mb-0 text-muted">
            <slot/>
          </p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</ex-list-item>
</template>
<script>
import ExIconButton from '../IconButton'

export default {
  name: 'ex-recovery-plan-template-list-item',
  components: {ExIconButton},
  props: {
    template: {
      type: Object,
      required: true,
    },
  },
  computed: {
    templateName() {
      return this.template.event_assignment.event.name
    }
  }
}
</script>
