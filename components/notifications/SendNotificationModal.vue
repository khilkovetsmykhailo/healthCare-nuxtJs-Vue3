<template>
  <ex-modal
    :id="id"
    size="md"
    title="Send Push Notification"
    description="Enter the information below to send a push notification to ALL users on the platform."
    :no-close-on-backdrop="loading"
  >
    <transition name="fade" mode="out-in">
      <div v-if="!loading && incomplete">
        <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>
        <b-form @submit.prevent="handleSubmit">
          <b-row>
            <b-col class="col-12">
              <b-form-input
                id="title-input"
                v-model="notificationState.title"
                type="text"
                placeholder="Title..."
                class="mb-4"
                autofocus
                required
              />
            </b-col>
            <b-col class="col-12">
              <b-form-input
                id="subtitle-input"
                v-model="notificationState.subtitle"
                type="text"
                placeholder="Subtitle..."
                class="mb-4"
              />
            </b-col>
            <b-col class="col-12">
              <b-form-input
                id="body-input"
                v-model="notificationState.body"
                type="text"
                placeholder="Body..."
                class="mb-4"
                required
              />
            </b-col>
          </b-row>
          <b-row class="justify-content-end">
            <b-col cols="auto">
              <b-button variant="primary" type="submit">Send</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
      <ex-loading v-if="loading"/>
      <p class="text-center mb-0" v-if="!loading && !incomplete">
        Notification Sent!
      </p>
    </transition>
  </ex-modal>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ex-send-notification-modal',
  data: () => ({
    loading: false,
    incomplete: true,
    notificationState: {
      title: '',
      subtitle: '',
      body: '',
    }
  }),
  props: {
    id: { type: String, default: 'send-notification-modal' },
  },
  computed: {
    ...mapState('global/notifications', ['error'])
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
  },
  methods: {
    ...mapActions('global/notifications', {
      clearAll: 'CLEAR_ALL',
      sendNotification: 'SEND_NOTIFICATION',
    }),
    start() {
      this.clearAll()
      this.notificationState = {
        title: '',
        subtitle: '',
      }
      this.$bvModal.show(this.id)
    },
    stop() { this.$bvModal.hide(this.id) },
    async handleSubmit() {
      this.loading = true
      await this.wait(this.sendNotification, 1000, this.notificationState)
      if (!this.error) this.incomplete = false
      this.loading = false
      setTimeout(() => {
        this.notificationState = {
          title: '',
          subtitle: '',
        }
        this.incomplete = true
      }, 2000)
    }
  }
}
</script>
