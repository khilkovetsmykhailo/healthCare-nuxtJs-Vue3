<template>
  <div>
    <!-- USER SEARCH -->
    <div v-if="!selectedUser">
      <div class="d-flex align-items-start justify-content-between">
        <ex-user-search
          :users="availableUsers || []"
          :loading="loadingUsers"
          placeholder="Search for a user by name"
          style="flex-grow: 1"
          @search="handleUserSearch"
          @select="handleSelectUser"
        />
      </div>
    </div>

    <!-- CONFIRM USER -->
    <div
      v-if="selectedUser"
      class="d-flex align-items-center"
    >
      <ex-user-list-item
        :user="selectedUser"
        class="mb-0"
        style="flex-grow: 1"
      />

      <ex-icon-button
        icon="times"
        font-awesome
        tooltip="Cancel"
        class="mb-0 ml-3"
        style="flex-grow: 0"
        :disabled="disabled"
        @click="handleDeselectUser"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-search-selector',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    searchUsers: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      availableUsers: null,
      loadUsersError: null,
      createUserError: null,
      selectedUser: null,
      loadingUsers: false,
      settingUser: false,
    }
  },
  computed: {
    errors() {
      return [
        this.loadUsersError,
        this.createUserError,
      ].filter((error) => error !== null)
    },
  },
  methods: {
    handleSelectUser(user) {
      this.selectedUser = user
      this.$emit('select', user)
    },

    handleDeselectUser() {
      this.selectedUser = null
      this.$emit('deselect')
    },

    async handleUserSearch(search) {
      this.loadingUsers = true

      const users = await this.searchUsers(search)

      if (users) {
        this.availableUsers = users
      } else {
        this.loadUsersError = 'Could not get available users.'
      }

      this.loadingUsers = false
    },
  },
}
</script>
