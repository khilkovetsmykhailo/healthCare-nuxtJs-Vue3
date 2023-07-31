<template>
  <div class="ex-patient-tab ex-patient-tab-movement">
    <h4 class="mb-3">Movement</h4>
    <b-tabs
      class="ex-button-tabs mb-3"
      pills
      small
      fill
      @input="currentTabIndex = $event"
    >
      <b-tab title="Steps">
        <h5 class="my-4">Steps</h5>

        <img
          :src="require('../../../assets/images/demo-movement-tab.png')"
          alt="demo movement tab"
        />
      </b-tab>
      <b-tab title="Exercises">
        <h5 class="my-4">Exercises</h5>

        <img
          :src="require('../../../assets/images/demo-movement-tab.png')"
          alt="demo movement tab"
        />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'patient-tab-movement',
}
</script>
