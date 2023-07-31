<template>
  <div class="mt-3 mb-2">
    <transition name="fade" mode="out-in">
      <b-button
        v-if="!editing"
        variant="light"
        class="w-100"
        size="sm"
        @click="handleEdit"
      >
        Edit Profile
      </b-button>
      <ex-editable-user-details
        v-if="editing"
        :user="user"
        disable-email
        @change="handleChange"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </transition>
  </div>
</template>
<script>
import ExEditableUserDetails from './editable/EditableUserDetails'

export default {
  name: 'ex-editable-user-profile',
  components: { ExEditableUserDetails },
  data() {
    return {
      editing: false,
      userState: { ...this.user },
    }
  },
  props: {
    user: { type: Object, required: true },
  },
  methods: {
    handleEdit() {
      this.userState = { ...this.user }
      this.editing = true
    },

    handleCancel() {
      this.editing = false
    },

    handleSubmit() {
      this.$emit('submit', this.userState)
      this.editing = false
    },

    handleChange({ field, value }) {
      this.userState[field] = value
    },
  },
}
</script>
