<template>
<b-container class="my-5">
    <b-row class="justify-content-center">
        <b-col md="8" lg="6" xl="4">
            <div class="d-flex justify-content-center">
                <b-img src="/images/logo.png" alt="Demo Health" fluid-grow class="mb-4" />
            </div>

            <h3 class="mb-4">
                {{ formHeading }}
            </h3>

            <p v-if="formDescription">
                {{ formDescription }}
            </p>

            <template v-if="error">
                <b-alert variant="danger" show>
                    {{ error }}
                </b-alert>
            </template>

            <template v-if="passwordWasReset">
                <b-alert variant="success" show>
                    Password successfully reset!
                </b-alert>
            </template>

            <!-- Log In Form -->
            <b-form v-if="!loginChallenge && !forgotPasswordStep" @submit.prevent="login">
                <b-form-group id="input-group-email" label="Email address:" label-for="user-email">
                    <b-form-input id="user-email" v-model="userEmail" type="email" required placeholder="Enter email" :disabled="isLoading" />
                </b-form-group>

                <b-form-group id="input-group-password" label="Your Password:" label-for="user-password">
                    <b-form-input id="user-password" v-model="userPassword" type="password" required :disabled="isLoading" placeholder="Enter password" />
                </b-form-group>

                <b-button block type="submit" variant="primary" :disabled="loggingIn">
                    Log In
                </b-button>

                <b-button class="pl-0 mt-3" variant="link" @click="forgotPasswordStep = 'initiate'">
                    Forgot your password?
                </b-button>

                <ex-loading v-if="loggingIn" />
            </b-form>

            <!-- Forgot Password Form -->
            <b-form v-if="forgotPasswordStep && forgotPasswordStep === 'initiate'" @submit.prevent="forgotPasswordInitiate">
                <p>
                    Please enter your email address below. We will email you a verification used to reset your password. Upon
                    entering the verification here, you will be able to set a new password.
                </p>

                <b-form-group id="input-group-forgot-password" label="Email:" label-for="user-forgot-password-email">
                    <b-form-input id="user-forgot-password-email" v-model="userEmail" type="email" required :disabled="isLoading" placeholder="Enter email" />
                </b-form-group>

                <b-button block type="submit" variant="primary" :disabled="isLoading || !userEmail">
                    Reset Password
                </b-button>

                <ex-loading v-if="isLoading" />
            </b-form>

            <!-- Forgot Password Confirm Form -->
            <b-form v-if="forgotPasswordStep && forgotPasswordStep === 'password'" @submit.prevent="forgotPasswordSubmit">
                <p>
                    Please enter your verification code from the email we just sent, and your new password below.
                </p>

                <b-form-group id="input-group-forgot-password-code" label="Verification Code:" label-for="user-forgot-password-code">
                    <b-form-input id="user-forgot-password-code" v-model="userForgotVerificationCode" type="text" required :disabled="isLoading" placeholder="Enter verification code" />
                </b-form-group>

                <b-form-group id="input-group-forgot-password-confirm" label="New Password:" label-for="user-forgot-password-confirm">
                    <b-form-input id="user-forgot-password-confirm" v-model="userPassword" type="password" required :disabled="isLoading" placeholder="Enter password" />
                </b-form-group>

                <b-alert v-for="validation in validators" :key="validation.id" show :variant="validation.valid ? 'success' : 'danger'">
                    {{ validation.description }}
                </b-alert>

                <b-button block type="submit" variant="primary" :disabled="isLoading || !isValid || !userForgotVerificationCode">
                    Set New Password
                </b-button>

                <ex-loading v-if="isLoading" />
            </b-form>

            <!-- Reset Password -->
            <b-form v-if="loginChallenge && loginChallenge.name === 'RESET_REQUIRED'" @submit.prevent="resetPassword">
                <p>
                    Please enter your verification code from the email we just sent, and your new password below.
                </p>

                <b-form-group id="input-group-reset-password-code" label="Verification Code:" label-for="user-reset-password-code">
                    <b-form-input id="user-reset-password-code" v-model="userForgotVerificationCode" type="text" required :disabled="isLoading" placeholder="Enter verification code" />
                </b-form-group>

                <b-form-group id="input-group-reset-password" label="New Password:" label-for="user-reset-password">
                    <b-form-input id="user-reset-password" v-model="userPassword" type="password" required :disabled="isLoading" placeholder="Enter password" />
                </b-form-group>

                <b-alert v-for="validation in validators" :key="validation.id" show :variant="validation.valid ? 'success' : 'danger'">
                    {{ validation.description }}
                </b-alert>

                <b-button block type="submit" variant="primary" :disabled="isLoading || !isValid">
                    Reset Password
                </b-button>

                <ex-loading v-if="isLoading" />
            </b-form>

            <!-- Challenge Form A: New Password -->
            <b-form v-if="loginChallenge && loginChallenge.name === 'NEW_PASSWORD_REQUIRED'" @submit.prevent="completeNewPassword">
                <b-form-group id="input-group-new-password" label="New Password:" label-for="user-new-password">
                    <b-form-input id="user-new-password" v-model="userPassword" type="password" required :disabled="isLoading" placeholder="Enter password" />
                </b-form-group>

                <b-alert v-for="validation in validators" :key="validation.id" show :variant="validation.valid ? 'success' : 'danger'">
                    {{ validation.description }}
                </b-alert>

                <b-button block type="submit" variant="primary" :disabled="isLoading || !isValid">
                    Reset Password
                </b-button>

                <ex-loading v-if="isLoading" />
            </b-form>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import {
  completeNewPassword,
  forgotPassword,
  forgotPasswordConfirm,
  logIn,
} from "../services/amplify";
import handleLoginRedirect from "../util/auth/handleLoginRedirect";

export default {
  name: "page-auth-login",
  layout: "default",
  data() {
    return {
      error: null,
      forgotPasswordStep: null,
      forgotPasswordLoading: false,
      loggingIn: false,
      loginChallenge: false,
      passwordWasReset: false,
      resettingPassword: false,
      userEmail: "",
      userForgotVerificationCode: "",
      userPassword: "",
    };
  },
  computed: {
    formHeading() {
      if (this.forgotPasswordStep) return "Forgot your password?";
      if (!this.loginChallenge) return "Please log in below";
      switch (this.loginChallenge.name) {
        case "RESET_REQUIRED":
        case "NEW_PASSWORD_REQUIRED":
          return "Please enter a new password";
        default:
          throw new Error(
            `Unhandled user challenge: ${this.loginChallenge.name}`
          );
      }
    },

    formDescription() {
      if (!this.loginChallenge) return null;
      switch (this.loginChallenge.name) {
        case "RESET_REQUIRED":
        case "NEW_PASSWORD_REQUIRED":
          return "A new password is required for this account.";
        default:
          throw new Error(
            `Unhandled user challenge: ${this.loginChallenge.name}`
          );
      }
    },

    isLoading() {
      return (
        this.loggingIn || this.resettingPassword || this.forgotPasswordLoading
      );
    },

    validators() {
      return [
        {
          id: "minLength",
          description: "Must be at least 8 characters",
          valid: this.userPassword.length >= 8,
        },
        {
          id: "includesUpper",
          description: "Must include at least 1 uppercase letter",
          valid: /[A-Z]/.test(this.userPassword),
        },
        {
          id: "includesLower",
          description: "Must include at least 1 lowercase letter",
          valid: /[a-z]/.test(this.userPassword),
        },
        {
          id: "includesSpecial",
          description: "Must include at least 1 special character",
          valid: /[!@#$%^&*(),.?":{}|<>]/.test(this.userPassword),
        },
        {
          id: "includesNumbers",
          description: "Must include at least 1 number",
          valid: /[0-9]/.test(this.userPassword),
        },
      ];
    },

    isValid() {
      return this.validators.reduce(
        (isValid, validator) =>
          !isValid || !validator.valid ? false : isValid,
        true
      );
    },
  },
  methods: {
    async forgotPasswordInitiate() {
      this.forgotPasswordLoading = true;
      const { error, success } = await forgotPassword(this.userEmail);
      this.forgotPasswordLoading = false;
      if (error) this.error = error;
      if (success) this.forgotPasswordStep = "password";
    },

    async forgotPasswordSubmit() {
      this.forgotPasswordLoading = true;
      const { error, success } = await forgotPasswordConfirm(
        this.userEmail,
        this.userForgotVerificationCode,
        this.userPassword
      );
      this.forgotPasswordLoading = false;
      if (error) this.error = error;
      if (success) {
        this.forgotPasswordStep = null;
        this.passwordWasReset = true;
      }
    },

    async login() {
      this.error = null;
      this.loggingIn = true;

      const { user, error, challenge } = await logIn(
        this.userEmail,
        this.userPassword,
        this.$cookies
      );

      if (error) {
        this.loggingIn = false;
        if (error.code === "PasswordResetRequiredException") {
          this.loginChallenge = {
            name: "RESET_REQUIRED",
          };
          this.userPassword = "";
        } else {
          this.error = error.message;
        }

        return;
      }

      if (challenge) {
        this.cognitoUser = user;
        if (challenge.name === "NEW_PASSWORD_REQUIRED") {
          this.loginChallenge = challenge;
          this.loggingIn = false;
          this.userPassword = "";
          return;
        } else {
          throw new Error(`Unhandled user challenge: ${challenge.name}`);
        }
      }

      this.loggingIn = false;

      handleLoginRedirect(this.$cookies);
    },

    async resetPassword() {
      this.resettingPassword = true;
      const { success, error } = forgotPasswordConfirm(
        this.userEmail,
        this.userForgotVerificationCode,
        this.userPassword
      );
      if (error) this.error = error;
      if (success) {
        this.passwordWasReset = true;
        this.loginChallenge = null;
      }
      this.resettingPassword = false;
    },

    async completeNewPassword() {
      this.resettingPassword = true;

      if (await completeNewPassword(this.cognitoUser, this.userPassword)) {
        // Success
        this.passwordWasReset = true;
        this.loginChallenge = null;
      } else {
        // Error
        this.error =
          "Could not reset password. Please try again later or contact support.";
      }

      this.resettingPassword = false;
    },
  },
};
</script>
