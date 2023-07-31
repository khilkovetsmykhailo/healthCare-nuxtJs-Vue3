<template>
  <div class="Demo-app">
    <ex-page>
      <template slot="header">
        <transition name="fade" mode="out-in">
          <ex-loading v-if="loading" size="small" loading-class="p-0 h-100"/>
          <div v-if="!loading && activity">
            <span class="h3 font-weight-light pt-1">Activities</span>
            <br/>
            <span class="small" v-if="activity">
              {{ activity.name }}
            </span>
          </div>
        </transition>
      </template>
      <template slot="side-nav">
        <transition name="fade" mode="out-in">
          <ex-loading v-if="loading"/>
          <div v-if="!loading && activity">
            <ex-files
              id="activity-files"
              :files="files"
              controls
              indicators
              class="shadow"
            />
            <div v-if="audioFile">
              <ex-label>Play Audio</ex-label>
              <audio controls class="mt-3">
                <source :src="`${config().API_URL}/files/${audioFile.id}?view=true`"/>
                <label>audio not supported in this browser</label>
              </audio>
            </div>
          </div>
        </transition>
      </template>
      <transition name="fade" mode="out-in">
        <ex-loading v-if="loading">Loading Activity</ex-loading>
        <b-row v-if="!loading && activity">
          test shit
        </b-row>
      </transition>
    </ex-page>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    loading: true,
    id: null,
  }),
  computed: {
    ...mapState('activities/activity', ['activity']),
    files() {
      return this.activity && this.activity.activity_resources
        ? this.activity.activity_resources.map(({ file }) => file)
        : []
    },
    audioFile() {
      return this.files.find(({ type }) => type === 'mp3')
    },
  },
  mounted() {
    this.id = this.$route.params.id
    this.getActivity()
  },
  methods: {
    ...mapActions('activities/activity', {
      clearAll: 'CLEAR_ALL',
      fetchActivity: 'FETCH_ACTIVITY',
    }),
    async getActivity() {
      this.loading = true
      await this.wait(this.fetchActivity, 750, this.id)
      this.loading = false
    },
  }
}
</script>
