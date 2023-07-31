<template>
  <b-modal
    :id="id"
    :modal-class="modalClass"
    :size="size"
    :no-close-on-backdrop="noCloseOnBackdrop"
    hide-footer
    hide-header
  >
    <div
      class="ex-modal-header"
      :class="[variant]"
    >
      <template v-if="!$slots.header">
        <b-row class="mx-0 justify-content-between" no-gutters>
          <b-col cols="11">
            <h1
              v-if="title"
              class="ex-modal-header-title">
              {{ title }}
            </h1>
          </b-col>
          <b-col cols="1" class="text-right">
            <ex-icon-button
              v-if="dismissible"
              icon="close"
              :color="variant === 'danger' ? 'red' : undefined"
              @click="handleClose"
              class="float-right"
              title="Close Modal"
            />
          </b-col>
        </b-row>
        <p
          v-if="description"
          class="ex-modal-header-description"
        >
          {{ description }}
        </p>
        <slot v-else name="description"/>
      </template>
      <slot name="header"/>
    </div>

    <div class="ex-modal-content">
      <slot/>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ex-modal',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    variant: {
      type: String,
      default: undefined,
    },
    modalClass: {
      type: String,
      default: 'ex-modal',
    },
    noCloseOnBackdrop: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'lg',
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    closeAction: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClose() {
      this.$emit('close')
      if (!this.closeAction) return
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
