<template>
  <ex-modal
    v-bind="{ id, title, description, variant }"
    :no-close-on-backdrop="false"
    size="md"
  >
    <transition name="fade" mode="out-in">
      <p class="mb-b" v-if="!deleting">
        Once an organization is deleted, all information on its users, activities, recovery plans, and any other platform data will be lost.
      </p>
      <ex-loading variant="danger" v-if="deleting">
        Deleting Organization...<br/>
        <span class="small text-muted">This may take a few moments</span>
      </ex-loading>
    </transition>
    <b-alert v-if="!deleting && error" variant="danger" class="my-3" show v-html="$md.render(error)"/>
    <b-row class="justify-content-end">
      <b-col cols="auto">
        <b-button
          variant="outline-light"
          @click="stop"
          :disabled="deleting"
        >
          Cancel
        </b-button>
      </b-col>
      <b-col cols="auto">
        <b-button
          variant="danger"
          @click="$emit('delete')"
          :disabled="deleting"
        >
          Delete "{{ organization ? organization.name : '' }}"
        </b-button>
      </b-col>
    </b-row>
  </ex-modal>
</template>
<script>
export default {
  name: 'ex-delete-organization',
  data: () => ({
    organization: null,
  }),
  props: {
    id: { type: String, default: 'delete-modal' },
    title: { type: String, default: 'Delete Organization' },
    description: { type: String, default: 'Are you sure?' },
    variant: { type: String, default: 'danger' },
    deleting: { type: Boolean, required: true },
    error: { type: String }
  },
  mounted() {
    this.busOn(`${this.id}:start`, this.start)
    this.busOn(`${this.id}:stop`, this.stop)
  },
  methods: {
    stop() {
      this.$bvModal.hide(this.id)
    },
    start(organization) {
      this.organization = organization
      this.$bvModal.show(this.id)
    },
  }
}
</script>
