import Vue from 'vue'
import {sluggify, unsluggify} from '../lib/utils'

Vue.mixin({
  beforeDestroy() {
    // Unsubscribe when destroying component
    if (this.storeSubscriptions) {
      this.storeSubscriptions.forEach((unsubscribe) => {
        unsubscribe()
      })
    }
  },

  computed: {
    currentUserIsSystemAdministrator() {
      return this.$store.getters['currentUser/highestRole'] === 'systemAdministrator'
    },

    currentUserOrganizationRoles() {
      return this.$store.getters['currentUser/organizationRoles']
    },

    currentUserIsHealthCareProvider() {
      return this.$store.getters['currentUser/healthCareProvider'] !== undefined
    },
  },

  methods: {
    sluggify,
    unsluggify,
    imageFileTypes() {
      return ['png', 'jpg', 'jpeg', 'gif']
    },
    /**
     * Waits for a period before calling the handler.
     *
     * @param {Function} handler Callback function
     * @param {Number} delay In ms
     * @param args All args to pass to the handler
     * @returns {Promise<void>}
     */
    async wait(handler, delay = 1500, ...args) {
      const endTime = Date.now() + delay
      console.log('args',handler,...args)
      await handler.apply(this || null, args)
      const remainingTime = endTime - Date.now()
      if (remainingTime > 0) await new Promise(resolve => setTimeout(resolve, remainingTime))
    },

    /**
     * Subscribes actions to the Vuex store.
     *
     * @param {Object} subscriptions The subscriptions object.
     * @param {String} type Type of store events to subscribe to. Can be "action" or "mutation"
     */
    subscribeToStore(subscriptions, type = 'action') {
      if (!this.storeSubscriptions) this.storeSubscriptions = []

      switch (type) {
        case 'action':
          this.storeSubscriptions.push(this.$store.subscribeAction({
            before: (event, state) => {
              if (event.type in subscriptions && 'before' in subscriptions[event.type]) {
                subscriptions[event.type].before(state, event)
              }
            },
            after: (event, state) => {
              if (event.type in subscriptions && 'after' in subscriptions[event.type]) {
                subscriptions[event.type].after(state, event)
              }
            },
          }))
          break
        case 'mutation':
          this.storeSubscriptions.push(this.$store.subscribe(
            (event, state) => {
              if (event.type in subscriptions) {
                subscriptions[event.type](state, event)
              }
            },
          ))
          break
      }
    },
  },
})
