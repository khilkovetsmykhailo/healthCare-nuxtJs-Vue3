<template>
  <b-tab title="Surgeon">
    Surgeon
  </b-tab>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'ex-user-surgeon-tab',
  data: () => ({
    loading: false,
  }),
  props: {
  },
  computed: {
    ...mapState('users/user', ['user']),
  },
  methods: {
    ...mapActions('users/user', {
    }),
  }
}
</script>
