<template>
  <div>
    <query-errors
      v-if="errors !== null"
      :errors="errors"
    >
      There was an issue displaying this organization. Please try again later.
    </query-errors>
    <ex-user-search-system/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ExUserSearchSystem from '../../components/UserSearchSystem'
import QueryErrors from '../../components/QueryErrors'

export default {
  name: 'Index',
  transition: 'fade',
  components: { QueryErrors, ExUserSearchSystem },
  layout: 'full-width',
  computed: {
    ...mapState('organization', [
      'errors',
    ]),
  },
}
</script>
