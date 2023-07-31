<template>
  <div class="ex-patient-tab ex-patient-tab-pain mt-4">
    <h5 class="mb-3">Notes</h5>
    <b-alert
      v-if="error"
      variant="danger"
      show
    >
      {{ error }}
    </b-alert>

    <b-alert
      v-if="createNoteError"
      variant="danger"
      show
    >
      {{ createNoteError }}
    </b-alert>

    <b-button
      v-if="currentUserIsHealthCareProvider && !adding"
      class="mb-4"
      @click="handleAddNote"
    >
      Add New Note
    </b-button>

    <template v-if="!adding && notes !== null">
      <patient-note
        v-for="(note, noteIndex) in notes"
        :key="note.id"
        :note="note"
        :editable="currentUserIsAuthor(note)"
        :class="{ 'mb-4': noteIndex !== notes.length - 1 }"
      />
    </template>

    <template v-if="adding">
      <b-form-textarea
        v-model="newMessageState"
        placeholder="Enter SOAP note here..."
        rows="15"
        size="2x"
        required
        class="mb-3"
        :disabled="creating"
      />
      <b-button
        type="submit"
        :disabled="creating"
        @click="handleCreateNote"
      >
        {{ creating ? 'Creating Note...' : 'Create Note' }}
      </b-button>
    </template>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import PatientNote from '../PatientNote'
import makeRequest from '../../../util/graphql/makeRequest'
import extractNodes from '../../../util/graphql/extractNodes'
import queryPatientNotes from '../../../graphql/queries/patient/patientNotes'
import mutationCreatePatientNote from '../../../graphql/mutations/patientNote/createPatientNote'

export default {
  name: 'patient-tab-notes',
  components: { PatientNote },
  data() {
    return {
      notes: null,
      loading: true,
      error: null,
      adding: false,
      creating: false,
      newMessageState: '',
      createNoteError: '',
    }
  },
  watch: {
    pageIndex() {
      this.getNotes()
    },
  },
  computed: {
    ...mapState('organization/patient', ['patient']),
    ...mapGetters('currentUser', ['healthCareProvider']),
  },
  mounted() {
    this.getNotes()
  },
  methods: {
    currentUserIsAuthor(note) {
      return this.currentUserOrganizationRoles.find(
        ({ organizationRole }) => organizationRole.id === note.Author.id,
      )
    },

    handleAddNote() {
      this.adding = true
      this.newMessageState = ''
    },

    async handleCreateNote() {
      this.creating = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: mutationCreatePatientNote,
        variables: {
          patientNote: {
            message: this.newMessageState,
            healthCareProviderId: 4,
            patientId: this.patient.id,
          },
        },
      })

      if (data && !errors.length) {
        this.notes = [
          data.createPatientNote,
          ...this.notes,
        ]
        this.adding = false
      } else {
        this.error = 'Could not create patient note. Please try again later.'
        if (errors) this.createNoteError = errors[0].message
      }

      this.creating = false
    },

    async getNotes() {
      this.loading = true

      const { data, errors } = await makeRequest(this.$axios, {
        query: queryPatientNotes,
        variables: {
          patientId: this.patient.id,
        },
      })

      if (data && !errors.length) {
        this.notes = extractNodes(data.patientNotes)
      } else {
        this.error = 'Could not get patient notes. Please try again later.'
      }

      this.loading = false
    },
  },
}
</script>
