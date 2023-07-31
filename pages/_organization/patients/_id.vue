<template>
  <div>
    <ex-loading v-if="loading"/>
    <ex-patient v-if="!loading"/>
  </div>
</template>
<script>
export default {
  layout: 'organization',
  data() {
    return {
      loading: true,
    }
  },
  async mounted() {
    await this.$store.dispatch('organization/patient/GET_PATIENT', parseInt(this.$route.params.id, 10))
    this.loading = false
  },
}
</script>
