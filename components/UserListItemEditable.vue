<template>
  <ex-list-item v-bind="{ active, disabled, tag }">
    <ex-avatar>
      <span v-if="!user.avatarFileId">
        {{ user.firstName ? user.firstName[0].toUpperCase() : '' }}
        {{ user.lastName ? user.lastName[0].toUpperCase() : '' }}
      </span>
      <ex-aws-image
        v-if="user.avatarFileId"
        :file-id="`avatars/${user.avatarFileId}`"
      />
    </ex-avatar>
    <div class="ex-list-item-text">
      <div class="capitalize">{{ user.firstName }} {{ user.lastName }}</div>
      <div class="small text-muted">
        {{ subtitle }}
        <slot name="subtitle"/>
      </div>
    </div>
    <div v-if="canDelete || canEdit" class="ex-list-item-action">
      <template v-if="!isDeleting && !loading">
        <slot name="actions"/>
        <ex-icon-button
          v-if="canEdit"
          icon="edit"
          font-awesome
          :class="canDelete ? 'mr-1' : ''"
          :tooltip="tooltipEdit"
          :disabled="disabled"
          @click="$emit('edit')"
        />
        <ex-icon-button
          v-if="canDelete"
          icon="trash"
          font-awesome
          :tooltip="tooltipDelete"
          :disabled="disabled"
          @click="handlePreDelete"
        />
      </template>

      <template v-if="isDeleting && !loading">
        <ex-icon-button
          v-if="canDelete"
          icon="times"
          font-awesome
          :tooltip="tooltipCancelDelete"
          :disabled="disabled"
          @click="isDeleting = false"
        />
        <ex-icon-button
          v-if="canDelete"
          icon="trash"
          color="red"
          font-awesome
          :tooltip="tooltipConfirmDelete"
          :disabled="disabled"
          @click="$emit('delete')"
        />
      </template>

      <b-spinner
        v-if="loading"
        variant="primary"
        type="grow"
        size="sm"
      />
    </div>
  </ex-list-item>
</template>
<script>
export default {
  name: 'ex-user-list-item-editable',
  props: {
    user: {
      type: Object,
      required: true,
    },
    subtitle: {
      type: String,
      default: undefined,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: true,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
    tooltipConfirmDelete: {
      type: String,
      default: 'Confirm Delete',
    },
    tooltipCancelDelete: {
      type: String,
      default: 'Cancel Deleting',
    },
    tooltipDelete: {
      type: String,
      default: 'Delete User',
    },
    tooltipEdit: {
      type: String,
      default: 'Edit User',
    },
    instantDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDeleting: false,
    }
  },
  methods: {
    handlePreDelete() {
      if (this.instantDelete) {
        this.$emit('delete')
      } else {
        this.isDeleting = true
      }
    },
  },
}
</script>
