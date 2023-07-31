<template>
  <div>
    <b-form @submit.prevent="handleSubmit" @reset.prevent="setOrganizationState">

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

      <b-row :class="`justify-content-${!hideReset ? 'between' : 'center'} mt-5 mb-3`">
        <b-col cols="auto" v-if="!hideReset">
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
            {{ submitText }}
          </b-button>
        </b-col>
      </b-row>

    </b-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ex-editable-organization-details',
  data: () => ({
    organizationState: {
      name: null,
      description: null,
    },
  }),
  props: {
    hideReset: { type: Boolean },
    buttonSize: { type: String },
    submitText: { type: String, default: 'Submit' },
    loading: { type: Boolean },
    organization: { type: Object },
  },
  mounted() {
    this.setOrganizationState()
  },
  methods: {
    handleSubmit() {
      this.$emit('change', this.organizationState)
    },
    setOrganizationState() {
      this.organizationState = this.organization
        ? { ...this.organization }
        : { name: null, description: null }
    }
  }
}
</script>
