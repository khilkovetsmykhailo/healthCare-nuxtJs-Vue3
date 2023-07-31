<template>
  <ex-list-item
    v-bind="{ active, tag, disabled }"
    v-b-tooltip.hover="careTeam.description"
  >
    <ex-avatar>
      <font-awesome-icon icon="users" size="lg"/>
    </ex-avatar>
    <div class="ex-list-item-text">
      <div class="capitalize">{{ careTeam.name }}</div>
<!--      <div class="small text-muted">-->
<!--        {{ subtitle }}-->
<!--        <span class="text-warning">-->
<!--          {{ clinicalUsersCount }}-->
<!--        </span>-->
<!--        Clinical Users-->
<!--        <span v-if="!hidePatients">-->
<!--          <span class="mx-1">&bull;</span>-->
<!--          <span class="text-primary">-->
<!--            {{ patientsCount }}-->
<!--          </span>-->
<!--          Patients-->
<!--        </span>-->
<!--      </div>-->
    </div>
  </ex-list-item>
</template>
<script>
export default {
  name: 'ex-user-list-item',
  props: {
    careTeam: {
      type: Object,
      required: true,
    },
    subtitle: {
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
    hidePatients: {
      type: Boolean,
      default: false,
    },
    noHover: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
