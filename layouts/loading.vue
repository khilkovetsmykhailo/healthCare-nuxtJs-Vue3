<template>
  <div id="Demo-app">
    <ex-loading-page>
      <nuxt/>
      {{ loadingMessage }}
    </ex-loading-page>
  </div>
</template>

<script>
import ExLoadingPage from '../components/LoadingPage'

export default {
  name: 'layout-loading',
  components: { ExLoadingPage },
  data() {
    return {
      loadingMessage: this.$route.params.loadingMessage || '',
    }
  },
}
</script>
