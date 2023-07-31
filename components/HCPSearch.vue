<template>
  <div>
    <!-- ERRORS -->
    <b-alert
      v-for="(error, errorIndex) in errors"
      :key="errorIndex"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    <!-- CURRENT HCP (SINGLE) -->
    <template v-if="!isSearching && selectedHcp">
      <ex-user-list-item-editable
        :user="selectedHcp.User"
        :can-edit="false"
        :tooltip-delete="`Remove ${hcpLabel}`"
        :tooltip-cancel-delete="`Cancel Removing ${hcpLabel}`"
        :tooltip-confirm-delete="`Confirm Removing ${hcpLabel}`"
        @edit="handleStartSearch"
        @delete="handleRemoveHCP(selectedHcp)"
      >
        <template #actions>
          <slot
            name="actions"
            :hcp="selectedHcp"
          />
        </template>
      </ex-user-list-item-editable>
    </template>

    <!-- CURRENT HCP (MULTIPLE) -->
    <template v-if="!isSearching && multiple && selectedHcps && selectedHcps.length">
      <ex-user-list-item-editable
        v-for="selectedHcp in selectedHcps"
        :can-edit="false"
        :key="`hcp-search-selected-hcp-${selectedHcp.id}`"
        :user="selectedHcp.User"
        :tooltip-delete="`Remove ${hcpLabel}`"
        :tooltip-cancel-delete="`Cancel Removing ${hcpLabel}`"
        :tooltip-confirm-delete="`Confirm Removing ${hcpLabel}`"
        @edit="handleStartSearch"
        @delete="handleRemoveHCP(selectedHcp)"
      >
        <template #actions>
          <slot
            name="actions"
            :hcp="selectedHcp"
          />
        </template>
      </ex-user-list-item-editable>
    </template>

    <!-- HCP SEARCH -->
    <template v-if="isSearching && !toSelectHCP">
      <div class="d-flex align-items-start justify-content-between">
        <ex-user-search
          :users="availableHCPs || []"
          :loading="loadingHCPs"
          :placeholder="`Search for a ${hcpLabel} by name`"
          style="flex-grow: 1"
          @search="handleSearch"
          @select="toSelectHCP = $event"
        />

        <ex-icon-button
          icon="times"
          font-awesome
          tooltip="Cancel"
          class="mb-3 ml-3"
          style="flex-grow: 0"
          @click="handleCancelSearch"
        />
      </div>
    </template>

    <!-- CONFIRM HCP -->
    <template v-if="toSelectHCP">
      <b-alert
        variant="info"
        show
        class="mb-4"
      >
        {{ confirmText }}
      </b-alert>

      <ex-user-list-item
        :user="toSelectHCP"
        class="mb-4"
      />

      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center justify-content-center">
          <b-button
            size="lg"
            @click="handleConfirm"
          >
            Confirm
          </b-button>
        </div>

        <b-button
          variant="link"
          size="lg"
          @click="toSelectHCP = null"
        >
          Cancel
        </b-button>
      </div>
    </template>

    <!-- NO HCP(s) -->
    <template v-if="!isSearching">
      <b-alert
        v-if="(!multiple && !selectedHcp) || (multiple && (!selectedHcps || !selectedHcps.length))"
        show
      >
        {{ noHcpText }}
      </b-alert>
      <b-button
        v-if="multiple || (!multiple && !selectedHcp)"
        @click="handleStartSearch"
      >
        {{ multiple ? 'Add' : 'Set' }} {{ hcpLabel }}
      </b-button>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import makeRequest from '../util/graphql/makeRequest'
import extractNodes from '../util/graphql/extractNodes'
import queryHealthCareProviders from '../graphql/queries/organization/healthCareProviders'

export default {
  name: 'HCPSearch',
  props: {
    confirmText: {
      type: String,
      required: true,
    },
    hcpLabel: {
      type: String,
      default: 'HCP',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    noHcpText: {
      type: String,
      required: true,
    },
    selectedHcp: {
      type: Object,
      default: undefined,
    },
    selectedHcps: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      availableHCPs: [],
      loadHCPsError: null,
      isSearching: false,
      toSelectHCP: null,
      loadingHCPs: false,
    }
  },
  computed: {
    errors() {
      return [
        this.loadHCPsError,
      ].filter((error) => error !== null)
    },

    ...mapState('organization', ['organization']),
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm', this.toSelectHCP)
      this.toSelectHCP = false
      this.isSearching = false
    },

    handleRemoveHCP(hcp) {
      this.$emit('remove', hcp)
    },

    handleStartSearch() {
      this.availableHCPs = []
      this.isSearching = true
    },

    async handleSearch(search) {
      this.loadingHCPs = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryHealthCareProviders,
        variables: {
          organizationId: this.organization.id,
          search,
        },
      })

      if (data && !errors.length) {
        this.availableHCPs = extractNodes(data.organizationHealthCareProviders).map(({ id, User }) => ({
          ...User,
          id, // kind of weird, but flatten HCP object to have User fields, but also still have the HCP ID
          disabled: this.multiple
          ? this.selectedHcps && this.selectedHcps.findIndex((selectedHcp) => selectedHcp.id === id) >= 0
          : this.selectedHcp && id === this.selectedHcp.id,
        }))
      } else {
        this.loadHCPsError = 'Could not get available surgeons.'
      }

      this.loadingHCPs = false
    },

    handleCancelSearch() {
      this.isSearching = false
    },
  },
}
</script>
