<template>
<b-row class="Demo-header justify-content-between">
  <b-col
    class="d-flex align-items-center"
    cols="auto"
  >
    <h2 class="mb-0">
      Your Patients
    </h2>
  </b-col>
  <b-col cols="auto">
    <ex-icon-button
      icon="plus"
      class="mr-3"
      @click="busEmit('add-patient:start')"
    />
    <ex-icon-button
      icon="cog"
    />
  </b-col>
</b-row>
</template>

<script>
export default {
  name: 'ex-header',
}
</script>

<style lang="scss">
.Demo-header {
  margin-top: 3.125rem;
  margin-bottom: 3.125rem;
}
</style>
