<template>
  <div id="Demo-app">
    <ex-loading v-if="loading"/>
    <nuxt v-if="!loading"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'layout-default',
  computed: {
    loading() {
      return this.user === null && this.errors === null
    },

    ...mapState('currentUser', ['user', 'errors'])
  }
}
</script>
