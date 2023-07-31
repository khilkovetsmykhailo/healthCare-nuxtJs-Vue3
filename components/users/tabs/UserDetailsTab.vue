<template>
  <b-tab title="Details" active>
    <h5 class="font-weight-normal">Personal Information</h5>
    <hr/>

    <b-row class="mb-3">
      <b-col cols="6">
        <ex-label>First Name</ex-label>
        {{ user.firstName }}
      </b-col>
      <b-col cols="6">
        <ex-label>Last Name</ex-label>
        {{ user.lastName }}
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col cols="6">
        <ex-label>Email Address</ex-label>
        <a :href="`mailto:${user.email}`" v-b-tooltip.hover="`email ${user.email}`">{{ user.email }}</a>
      </b-col>
      <b-col cols="6">
        <ex-label>Phone</ex-label>
        <a :href="`tel:${user.phone}`" v-b-tooltip.hover="`call ${user.phone}`">{{ user.phone }}</a>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col cols="6">
        <ex-label>Gender</ex-label>
        {{ user.gender ? `${user.gender.charAt(0).toUpperCase()}${user.gender.slice(1)}` : 'Not set' }}
      </b-col>
      <b-col cols="6">
        <ex-label>Date of Birth</ex-label>
        {{ user.dateOfBirth }}
      </b-col>
    </b-row>
  </b-tab>
</template>

<script>
export default {
  name: 'ex-user-details-tab',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
