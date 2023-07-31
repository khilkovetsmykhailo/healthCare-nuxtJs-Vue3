<template>
  <ex-modal
    :id="id"
    :dismissible="!loading"
    title="Edit Organization Details"
    description="Edit organization name and description."
    @close="handleClose"
    size="md"
    :no-close-on-backdrop="loading"
  >
    <b-alert
      :show="!!error"
      variant="danger"
      v-if="!loading"
    >
      {{ error }}
    </b-alert>
    <b-form @submit.prevent="handleSubmit" @reset.prevent="handleReset">

      <b-form-group
        id="organization-name-input-group"
        label="Name"
        label-for="organization-name-input"
      >
        <b-form-input
          id="organization-name-input"
          v-model="organizationState.name"
          required
          placeholder="Enter Name"
          :disabled="loading"
          autofocus
        />
      </b-form-group>

      <b-form-group
        id="organization-description-input-group"
        label="Description"
        label-for="organization-description-input"
      >
        <b-form-textarea
          id="organization-description-input"
          v-model="organizationState.description"
          required
          placeholder="Enter Description"
          :disabled="loading"
        />
      </b-form-group>

      <b-row class="justify-content-between mt-5 mb-3">
        <b-col cols="auto">
          <b-button
            variant="link"
            type="reset"
            :disabled="loading"
          >
            Reset
          </b-button>
        </b-col>
        <b-col cols="auto">
          <b-button
            variant="primary"
            type="submit"
            :disabled="loading"
          >
            Submit
          </b-button>
        </b-col>
      </b-row>

    </b-form>

  </ex-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-organization-settings-modal',
  data: () => ({
    organizationState: {
      name: null,
      description: null,
      id: null,
    },
  }),
  computed: {
    ...mapState('organization', ['error', 'organization']),
  },
  props: {
    id: { type: String, default: 'ex-organization-settings-modal' },
    loading: { type: Boolean, required: true },
  },
  mounted() {
    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      if (modalId === this.id) this.setOrganizationState()
    })
  },
  methods: {
    handleClose() {
      this.$bvModal.hide(this.id)
    },
    handleSubmit() {
      this.$emit('submit', this.organizationState)
    },
    handleReset() {
      this.setOrganizationState()
    },
    setOrganizationState() {
      if (!this.organization) return
      const { name, description, id } = this.organization
      this.organizationState = { name, description, id }
    },
  }
}
</script>
