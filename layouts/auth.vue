<template>
  <div id="Demo-app">
    <b-container>
      <b-row class="justify-content-center mt-5 pt-5">
        <b-col class="col-7 col-md-6 col-lg-5 col-xl-4">
          <b-img
            src="/images/logo.png"
            alt="Demo Health"
            fluid-grow
          />
        </b-col>
      </b-row>
      <b-row class="justify-content-center mt-4 text-primary text-center">
        <b-col class="col-12 col-md-8 col-lg-6">
          <nuxt/>
          <ex-loading/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'layout-auth',
}
</script>
