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
    <h1 class="ex-modal-header-title">{{ title }}</h1>
    <p class="ex-modal-header-description">{{ description }}</p>
  </div>

  <div class="ex-new-user-step-content">
    <slot/>
  </div>

  <div
    v-if="hasNextStep"
    class="ex-new-user-step-next-step-container text-center"
  >
    <b-button
      class="ex-new-user-step-next-step"
      variant="primary"
      :disabled="nextStepDisabled"
      @click="$emit('submit')"
      type="submit"
    >
      {{ nextStepText }}
    </b-button>

  <div v-if="hasSkipStep">
    <b-button
      class="mt-3 mb-0 pb-0"
      variant="link"
      @click="$emit('skip')"
    >
      {{ skipStepText }}
    </b-button>
  </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'ex-new-user-step',
  props: {
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
  },
}
</script>
