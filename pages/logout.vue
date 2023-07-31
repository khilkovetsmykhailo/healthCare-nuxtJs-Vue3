<template>
  <h4 class="font-weight-light">
    Logging you out...
  </h4>
</template>

<script>
import {logOut} from '../services/amplify'

export default {
  name: 'page-auth-login',
  layout: 'auth',
  head: {
    htmlAttrs: {
      class: ['logout']
    }
  },
  async mounted() {
    await logOut(this.$cookies)

    setTimeout(() => {
      this.$router.push('/login')
    }, 2000)
  },
}
</script>
