<template>
<ex-transition-list>
  <component
    :is="itemTemplate"
    v-for="(patient, patientI) in patients"
    :key="patient.id"
    :data-index="patientI"
    :pain="Math.round(Math.random() * 10)"
    :compliance="Math.round(Math.random() * 100)"
    :name="`${patient.firstName} ${patient.lastName}`"
    :active="selected === patient.id"
    tag="button"
    class="ex-transition-list-item"
    @click.native="$emit('select', patient)"
  />
</ex-transition-list>
</template>

<script>
// TODO get transitions working
export default {
  name: 'patient-list',
  props: {
    patients: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      default: undefined,
    },
    itemTemplate: {
      type: String,
      default: 'ex-patient-list-item',
    },
  },
}
</script>
