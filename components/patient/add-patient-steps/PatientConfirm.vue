<template>
<ex-new-user-step
  title="Confirm Details"
  description="Please confirm all details below"
  step-title="Confirmation"
  next-step-text="Create New Patient"
  :has-next-step="!loading"
  :previous-step-disabled="loading"
  @submit="saveUser"
  @back="handleGoToStep(event.type_secondary ? 'patient-surgery-date' : 'patient-surgery-type')"
>
  <p class="mb-0">New Patient Summary</p>
  <hr class="mt-1 mb-3"/>
  <ex-user-list-item
    v-bind="user"
    class="border-primary"
  >
    <template slot="subtitle">
      {{ user.email }}
      &bull;
      <span class="text-primary" v-if="user.date_of_birth">
        {{ $moment().diff(user.date_of_birth.toString(), 'years') }}
      </span>
      years old
    </template>
  </ex-user-list-item>

  <p class="mt-4 mb-0">Surgery Information</p>
  <hr class="mt-1 mb-3"/>

  <p
    v-if="!event.event_id"
    class="small text-center text-muted py-4 border"
  >
    No Surgery Specified
  </p>

  <ex-list-item class="border-primary" v-if="event.event_id">
    <ex-avatar>
      <ex-icon
        :icon="`${event.type}-${event.type_secondary}`"
        class="w-100 h-100 p-2"
      />
    </ex-avatar>
    <div class="ex-list-item-text">
      <div class="capitalize">
        {{ selectedEvent.name }}
      </div>
      <div class="small text-muted text-capitalize">
        <span class="text-primary">
          Left
        </span>
        {{ event.type_secondary }}
        &bull;
        {{ $moment(event.date).fromNow() }}
        <span v-if="selectedClinicalUser">
          &bull;
          <span class="text-warning">
            {{ selectedClinicalUser.user.firstName }}
            {{ selectedClinicalUser.user.lastName }}
          </span>
        </span>
      </div>
    </div>
  </ex-list-item>

  <b-alert
    :show="!!error"
    variant="danger"
    v-if="!loading"
  >
    {{ error }}
  </b-alert>

  <ex-loading v-if="loading"/>
</ex-new-user-step>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import ExListItem from '../../ListItem'
import ExUserListItem from '../../UserListItem'
import { delay } from '../../../lib/utils'
export default {
  name: 'ex-new-user-step-patient-confirm',
  data: () => ({
    loading: false,
  }),
  components: { ExListItem, ExUserListItem },
  computed: {
    ...mapState('patient/new', ['user', 'profile', 'event', 'error']),
    ...mapGetters('patient/new', ['selectedClinicalUser', 'selectedEvent']),
  },
  methods: {
    ...mapActions('patient/new', {
      createUser: 'CREATE_USER',
    }),
    handleGoToStep(step) {
      this.$emit('next', step)
    },
    async saveUser() {
      this.loading = true
      await delay(this.createUser, 2000)
      if (this.user && this.user.id) this.handleGoToStep('patient-finish')
      else this.loading = false
    },
  },
}
</script>
