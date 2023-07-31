<template>
  <div class="ex-patient-note card">
    <div class="card-body p-0">
      <div class="ex-patient-note-header p-3">
        <div class="ex-patient-note-author d-flex align-items-center">
          <div style="width: 3.5rem">
            <font-awesome-icon
              icon="user-edit"
              size="2x"
            />
          </div>

          <span class="h5 mb-0">
            {{ note.Author.User.firstName }} {{ note.Author.User.lastName }}
          </span>

          <template v-if="editable">
            <ex-icon-button
              v-if="!editing"
              icon="edit"
              font-awesome
              size="lg"
              class="ml-auto"
              :disabled="updating"
              @click="handleEdit"
            />

            <ex-icon-button
              v-if="editing"
              icon="trash"
              color="red"
              font-awesome
              class="ml-auto"
              size="lg"
              :disabled="updating"
              @click="handleDelete"
            />

            <ex-icon-button
              v-if="editing"
              icon="times-circle"
              font-awesome
              size="lg"
              class="ml-2"
              :disabled="updating"
              @click="editing = false"
            />
          </template>
        </div>
      </div>
      <div class="ex-patient-note-content d-flex p-3 mx-0">
        <div>
          <div style="width: 3.5rem">
            <font-awesome-icon
              icon="clipboard-list"
              size="2x"
            />
          </div>
        </div>

        <div v-if="!editing">
          <div
            class="ex-patient-note-message"
            v-html="$md.render(note.message)"
          />

          <div class="ex-patient-note-date text-muted">
            <p>Last Updated: {{ note.updated_at | formatDate('detailed') }}</p>
          </div>
        </div>

        <div
          v-if="editing"
          style="width: 100%;"
        >
          <b-alert
            v-if="updateNoteError"
            variant="danger"
            show
          >
            {{ updateNoteError }}
          </b-alert>

          <b-form-textarea
            v-model="messageState"
            placeholder="Enter message here..."
            rows="15"
            size="2x"
            required
            class="mb-3"
            :disabled="updating"
          />
          <b-button
            type="submit"
            :disabled="updating"
            @click="handleUpdate"
          >
            {{ updating ? 'Updating...' : 'Update' }}
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'patient-note',
  props: {
    note: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editing: false,
      messageState: '',
      updating: false,
    }
  },
  computed: {
    ...mapState('organization/patient/notes', ['updateNoteError']),
  },
  methods: {
    handleEdit() {
      this.editing = true
      this.messageState = this.note.message
    },

    async handleDelete() {
      if (!confirm('Are you sure? This note will be deleted forever.')) return;

      this.updating = true;

      await this.deleteNote(this.note.id)

      this.updating = false;
    },

    async handleUpdate() {
      this.updating = true

      await this.updateNote({
        id: this.note.id,
        message: this.messageState,
      })

      this.updating = false

      if (!this.updateNoteError) {
        this.editing = false
      }
    },

    ...mapActions('organization/patient/notes', {
      updateNote: 'UPDATE_NOTE',
      deleteNote: 'DELETE_NOTE',
    }),
  },
}
</script>
