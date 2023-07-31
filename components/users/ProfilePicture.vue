<template>
  <div class="position-relative w-100" v-bind:class="{ shadow }">
    <b-img
      v-if="!user.profile_picture_file"
      v-bind="{ src, fluid, fluidGrow, thumbnail }"
      class="w-100"
    />
    <ex-file
      v-else
      v-bind="{ ...user.profile_picture_file, fluid, fluidGrow, thumbnail }"
    />
    <div v-if="editable" class="position-absolute p-2" style="bottom: 0; right: 0;">
      <ex-icon-button
        @click="handleClick(user.profile_picture_file)"
        font-awesome
        icon="pen"
      />
      <ex-file-modal
        id="profile-picture-modal"
        title="Upload Profile Picture"
        description="Complete the steps below to update the profile picture."
        :accept="this.imageFileTypes().map(type => `image/${type}`).toString()"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ex-profile-picture',
  props: {
    user: {
      type: Object,
      required: true,
    },
    editable: { type: Boolean },
    thumbnail: { type: Boolean },
    fluid: { type: Boolean },
    fluidGrow: { type: Boolean },
    shadow: { type: Boolean },
  },
  computed: {
    src() {
      const { gender, profile_picture } = this.user
      return profile_picture || '/images/empty_profile_picture.png'
    },
  },
  methods: {
    handleClick(fileState) {
      this.busEmit('profile-picture-modal:start', fileState || {
        owner_type: 'users',
        owner_id: this.user.id,
        description: 'profile_picture',
        protected: false,
      })
    }
  },
}
</script>
