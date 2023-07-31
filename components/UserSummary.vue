<template>
  <div>
    <b-spinner
      v-if="!organization || !user"
      style="width: 3rem; height: 3rem;"
      variant="primary"
      type="grow"
      class="my-1"
    />
    <transition name="fade">
      <div v-if="organization && user">
        <span class="h3 font-weight-light pt-1">{{ organization.name }}</span>
        <br/>
        <span class="small" v-if="user">
          {{ user.firstName }}
          {{ user.lastName }}
          &bull;
          {{ role }}
        </span>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'ex-user-summary',
  computed: {
    ...mapGetters('auth', ['role']),
    ...mapState('auth', ['user']),
    ...mapState('organization', ['organization']),
  }
}
</script>
