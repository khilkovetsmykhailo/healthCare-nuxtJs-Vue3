import Vue from 'vue'

Vue.prototype.$bus = new Vue()

Vue.mixin({
  /**
   * Initialize the $busListeners array on the VM instance.
   *
   * IMPORTANT: Not an arrow function so "this" will reference the VM instance.
   */
  created() {
    this.$busListeners = []
  },

  /**
   * When destroying a VM instance, remove all event bus listeners.
   *
   * IMPORTANT: Not an arrow function so "this" will reference the VM instance.
   */
  beforeDestroy() {
    this.$busListeners.forEach(({event, func}) => {
      this.$bus.$off(event, func)
    })
  },

  methods: {
    /**
     * Adds a listener to the event bus, and also to $busListeners, so they can later be removed.
     *
     * @param {String} event Name of the listener.
     * @param {Function} func Callback function.
     */
    busOn(event, func, ...args) {
      this.$bus.$on(event, func)
      this.$busListeners.push({event, func})
    },

    /**
     * Emits an event bus.
     *
     * @param {String} event Name of the listener.
     * @param {Object} params Object of parameters to send through.
     */
    busEmit(event, params = {}) {
      this.$bus.$emit(event, params)
    },
  }
})
