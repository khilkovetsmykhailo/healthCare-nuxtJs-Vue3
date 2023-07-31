<template>
  <div>
    <div class="ex-modal-header">
      <b-button
        variant="link"
        class="pl-0"
        @click="$emit('back')"
        v-if="hasPreviousStep"
        :disabled="previousStepDisabled"
      >
        <ex-icon
          icon="arrow-left"
          inline
        />
        Back
      </b-button>
      <p
        v-if="stepTitle"
        class="ex-new-user-step-header-current-step"
      >
        {{ stepTitle }}
      </p>
      <h1 class="ex-new-user-step-header-title text-capitalize">{{ title }}</h1>
      <p class="ex-new-user-step-header-description">{{ description }}</p>
    </div>

    <div class="ex-new-user-step-content">
      <transition name="fade">
        <b-alert v-if="!loading && error" variant="danger" class="my-3" show>
          {{ error }}
        </b-alert>
      </transition>
      <slot/>
    </div>

    <div
      v-if="hasNextStep"
      class="ex-new-user-step-next-step-container text-center mb-5"
    >
      <b-button
        variant="primary"
        :disabled="nextStepDisabled"
        @click="$emit('submit')"
        type="submit"
        size="lg"
      >
        {{ nextStepText }}
      </b-button>

      <br>

      <b-button
        v-if="hasSkipStep"
        class="mt-3 mb-0 pb-0"
        variant="link"
        @click="$emit('skip')"
        :disabled="skipStepDisabled"
      >
        {{ skipStepText }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ex-step',
  props: {
    loading: { type: Boolean },
    error: { type: String },
    title: {
      type: String,
      required: true,
    },
    stepTitle: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      required: true,
    },
    hasNextStep: {
      type: Boolean,
      default: true,
    },
    hasSkipStep: {
      type: Boolean,
      default: false,
    },
    nextStepDisabled: {
      type: Boolean,
      default: false,
    },
    previousStepDisabled: {
      type: Boolean,
      default: false,
    },
    nextStepText: {
      type: String,
      default: 'Next Step',
    },
    hasPreviousStep: {
      type: Boolean,
      default: true,
    },
    skipStepText: {
      type: String,
      default: 'Skip Step',
    },
    skipStepDisabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
