<template>
  <div>
    <b-container>
      <b-row class="mt-5 pt-5 justify-content-center">
        <b-col class="text-center col-12 col-md-10 col-lg-8 col-xl-6">
          <h2 class="text-warning my-0 font-weight-normal">{{ title }}</h2>
          <p v-if="message" class="mt-2 mb-0">{{ message }}</p>
          <b-img src="/images/error.png" fluid class="mt-5"/>
        </b-col>
      </b-row>
      <b-row class="mt-5 justify-content-center align-items-center">
        <b-col cols="auto" class="text-muted">
          <p>This could have happened because:</p>
          <ul class="small ml-0 pl-4">
            <li>The page has moved</li>
            <li>The page no longer exists</li>
            <li>You are not authorized to view this page</li>
            <li>Demo Health is experiencing service degradation</li>
          </ul>
        </b-col>
        <b-col cols="auto" class="px-5">
          <b-button
            variant="outline-primary"
            class="my-3"
            to="/"
          >
            Return to Homepage
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'page-error',
  layout: 'empty',
  data: () => ({
    title: 'An Error Occurred',
    message: null,
  }),
  mounted() {
    this.message = this.$route.query.message
    this.title = this.$route.query.title || 'An Error Occurred'
  }
}
</script>
