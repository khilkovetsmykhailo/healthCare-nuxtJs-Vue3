<template>
  <b-form @submit.prevent="$emit('submit')">
    <ex-label class="mb-2" for="user_firstName">First Name</ex-label>
    <b-form-input
      :value="user.firstName"
      @change="handleChange('firstName', $event)"
      id="user_firstName"
      placeholder="First Name"
      :class="inputClass"
      required
      autofocus
      :disabled="disabled"
    />
    <ex-label class="mb-2" for="user_firstName">Last Name</ex-label>
    <b-form-input
      :value="user.lastName"
      @change="handleChange('lastName', $event)"
      id="user_lastName"
      placeholder="Last Name"
      :class="inputClass"
      required
      :disabled="disabled"
    />
    <template v-if="!hideEmail">
      <ex-label class="mb-2" for="user_firstName">Email</ex-label>
      <b-form-input
        :value="user.email"
        @change="handleChange('email', $event)"
        id="user_email"
        placeholder="Email Address"
        :formatter="forceLowercase"
        :class="inputClass"
        :disabled="disabled || disableEmail"
        :required="!disableEmail"
        type="email"
      />
    </template>

    <template v-if="!hidePhone">
      <ex-label class="mb-2" for="user_firstName">Phone</ex-label>
      <b-form-input
        :value="user.phone"
        @change="handleChange('phone', $event)"
        id="user_phone"
        placeholder="Phone Number"
        :class="inputClass"
        type="tel"
        :disabled="disabled"
      />
    </template>
    <template v-if="!hideGender">
      <ex-label class="mb-2" for="user_firstName">Gender</ex-label>
      <b-form-select
        :value="user.gender"
        @change="handleChange('gender', $event)"
        id="user_gender"
        :options="genderOptions"
        :class="inputClass"
        required
        :disabled="disabled"
      />
    </template>
    <template v-if="!hideDob">
      <ex-label class="mb-2" for="user_firstName">Date of Birth</ex-label>
      <ex-datepicker
        :value="user.dateOfBirth"
        @input="handleChange('dateOfBirth', $event)"
        id="user_dateOfBirth"
        past
        :disabled="disabled"
      />
    </template>
    <b-row
      v-if="!hideReset"
      :class="hideReset ? 'justify-content-center mt-5 mb-5' : 'justify-content-between mt-2'"
    >
      <b-col cols="auto">
        <b-button
          variant="link"
          @click="$emit('cancel')"
        >
          {{ cancelText }}
        </b-button>
      </b-col>
      <b-col cols="auto">
        <b-button
          variant="primary"
          type="submit"
        >
          {{ submitText }}
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: 'ex-editable-user-profile',
  data: () => ({
    genderOptions: [
      { value: null, text: 'Please select an option' },
      { value: 'MALE', text: 'Male' },
      { value: 'FEMALE', text: 'Female' },
      { value: 'OTHER', text: 'Other' },
    ],
  }),
  props: {
    user: { type: Object },
    cancelText: { type: String, default: 'Cancel' },
    hideReset: { type: Boolean, default: false },
    hideEmail: { type: Boolean, default: false },
    hidePhone: { type: Boolean, default: false },
    hideGender: { type: Boolean, default: false },
    hideDob: { type: Boolean, default: false },
    disableEmail: { type: Boolean },
    submitText: { type: String, default: 'Submit' },
    inputClass: { type: String, default: 'mb-3' },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    forceLowercase(value) {
      return `${value}`.toLowerCase()
    },

    handleChange(field, value) {
      this.$emit('change', { field, value })
    },
  },
}
</script>
