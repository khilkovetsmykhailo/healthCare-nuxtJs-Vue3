<template>
  <ex-list-item no-hover>
    <b-row
      class="align-items-center justify-content-between mx-0"
      style="width: 100%; flex-wrap: nowrap"
    >
      <div style="flex-grow: 0">
        <ex-activity-list-item
          :activity="activity.activity"
          :reps="repsState"
          :sets="setsState"
          :show-image="!editing"
          :clickable="false"
          flat
        />
      </div>
      <b-row class="mx-0 align-items-center justify-content-between" style="flex-grow: 0; flex-wrap: nowrap">
        {{ /* DEFAULT STATE */ }}
        <template v-if="!editOnly && editable && !editing && !deleting">
          <ex-icon-button
            v-if="['EXERCISE', 'RELAXATION'].includes(activity.activity.type)"
            icon="edit"
            font-awesome
            class="ml-2"
            tooltip="Edit Activity"
            @click="handleEdit"
          />
          <ex-icon-button
            icon="trash"
            font-awesome
            class="ml-2"
            tooltip="Remove Activity"
            @click="deleting = true"
          />
        </template>

        {{ /* EDITING */ }}
        <template v-if="editOnly || (editing && !deleting)">
          <template v-if="repsText">
            <label class="mr-2 ex-edit-plan-activity-number-label">
              {{ repsText }}
            </label>
            <b-form-input
              type="number"
              style="width: 4rem"
              class="mr-4"
              :value="repsState"
              @input="handleRepsChange"
            />
          </template>

          <template v-if="activity.activity.type === 'EXERCISE'">
            <label class="mr-2 ex-edit-plan-activity-number-label">
              Sets
            </label>
            <b-form-input
              type="number"
              style="width: 4rem"
              class="mr-4"
              :value="setsState"
              @input="handleSetsChange"
            />
          </template>

          <ex-icon-button
            :icon="saveIcon"
            font-awesome
            tooltip="Save Activity"
            @click="handleSave"
          />
          <ex-icon-button
            :icon="cancelSaveIcon"
            class="ml-2"
            font-awesome
            tooltip="Cancel Editing Activity"
            @click="handleCancelEdit"
          />
        </template>

        {{ /* DELETE CONFIRMATION */ }}
        <template v-if="deleting">
          <ex-icon-button
            icon="times"
            font-awesome
            tooltip="Cancel Removing Activity"
            @click="deleting = false"
          />
          <ex-icon-button
            icon="trash"
            font-awesome
            class="ml-2"
            color="red"
            tooltip="Remove Activity"
            @click="$emit('delete')"
          />
        </template>
      </b-row>
    </b-row>
  </ex-list-item>
</template>
<script>
import ExActivityListItem from './ActivityListItem'

export default {
  name: 'ex-activity-list-item-edible',
  components: { ExActivityListItem },
  props: {
    activity: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    reps: {
      type: Number,
      default: 1,
    },
    sets: {
      type: Number,
      default: 1,
    },
    editOnly: {
      type: Boolean,
      default: false,
    },
    saveIcon: {
      type: String,
      default: 'check',
    },
    cancelSaveIcon: {
      type: String,
      default: 'times',
    },
  },
  watch: {
    reps(reps) {
      this.repsState = reps
    },

    sets(sets) {
      this.setsState = sets
    },
  },
  computed: {
    repsText() {
      switch (this.activity.activity.type) {
        case 'RELAXATION':
        case 'WALKING':
          return 'Minutes'
        case 'EXERCISE':
          return 'Reps'
        case 'STRETCH': // TODO does stretch need any customizing?
        case 'SURVEY':
        case 'ARTICLE':
          return null
        default:
          throw new Error(`Unrecognized activity type: ${this.activity.activity.type}`)
      }
    },
  },
  data() {
    return {
      editing: false,
      deleting: false,
      repsState: this.reps,
      setsState: this.sets,
    }
  },
  methods: {
    handleRepsChange(reps) {
      this.repsState = reps
    },

    handleSetsChange(sets) {
      this.setsState = sets
    },

    handleSave() {
      this.$emit('save', { reps: parseInt(this.repsState), sets: parseInt(this.setsState) })
      this.$emit('cancel-edit')
      this.editing = false
    },

    handleEdit() {
      this.$emit('edit')
      this.editing = true
    },

    handleCancelEdit() {
      this.$emit('cancel-edit')
      this.editing = false
    },
  },
}
</script>
