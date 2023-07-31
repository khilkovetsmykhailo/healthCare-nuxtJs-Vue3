<template>
<div class="ex-user-search">
  <ex-search
    :placeholder="placeholder"
    @search="handleSearch"
  />
  <template v-if="!loading && users">
  <ex-user-list-item
    v-for="user in users"
    :key="user.id"
    :user="user"
    tag="button"
    :disabled="user.disabled"
    :active="user.selected"
    @click.native="$emit('select', user)"
  />
  </template>
  <ex-loading v-if="loading"/>
  <ex-empty-state
    v-if="searched && !loading && users && !users.length"
    icon="users"
    message="No users found"
  />
</div>
</template>

<script>
export default {
  name: 'user-search',
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Search for a user by name',
    },
    noResults: {
      type: Boolean,
      default: false,
    },
    itemTemplate: {
      type: String,
      default: 'ex-user-list-item',
    },
  },
  data: () => ({
    searched: false,
  }),
  methods: {
    handleSearch(query) {
      this.$emit('search', query)
      this.searched = true
    },
  },
}
</script>
