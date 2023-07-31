<template>
<ex-list-item
  class="ex-accordion p-0"
  :class="{ open }"
  tag="div"
  no-hover
>
  <b-row class="mx-0 ex-accordion-header align-items-center">
    <b-col class="ex-accordion-title px-0">
      <slot name="title"/>
    </b-col>
    <b-col class="ex-accordion-toggle d-flex align-items-center">
      <b-button
        :variant="open ? 'primary' : 'outline-primary'"
        @click="open = !open"
      >
        {{ open ? 'Close' : 'Open' }}
      </b-button>
    </b-col>
  </b-row>

  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-show="open"
      class="ex-accordion-content"
    >
      <slot/>
    </div>
  </transition>
</ex-list-item>
</template>

<script>
export default {
  name: 'ex-accordion',
  data() {
    return {
      open: false,
    }
  },
}
</script>
