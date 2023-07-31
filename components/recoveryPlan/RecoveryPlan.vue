<template>
  <div>
    <h4 class="d-flex justify-content-between align-items-center">
      <span>Patient Plan</span>

      <b-button
        v-if="canEdit"
        variant="primary"
        size="lg"
        @click="editPlanActivity({id: 0})"
      >
        <font-awesome-icon
          icon="plus"
          class="mr-2"
        />
        Add New Activity
      </b-button>
    </h4>

    <b-pagination
      v-model="currentPage"
      :total-rows="weeks.length"
      :per-page="pageSize"
      :disabled="loading || recoveryPlan === null"
      class="mb-5"
      @change="scrollToTop"
    />

    <ex-loading v-if="loading"/>

    <template v-if="!loading && recoveryPlan !== null">
      <div
        v-for="(week, weekI) in paginatedWeeks"
        :key="`recovery-plan-week-${weekI}`"
        :id="`recovery-plan-week-${weekI}`"
        class="mb-4"
      >
        <h4 class="recovery-plan-week-title d-flex align-items-center justify-content-between mb-4">
          <span>
            Week {{ week.index + 1 }}: {{ week.start | formatDate }} - {{ week.end | formatDate }}
          </span>

          <span>
            <b-button
              v-if="weekI > 0"
              :href="`#recovery-plan-week-${weekI - 1}`"
            >
            Prev
            </b-button>
            <b-button
              v-if="weekI < paginatedWeeks.length - 1"
              :href="`#recovery-plan-week-${weekI + 1}`"
            >
              Next
            </b-button>
          </span>
        </h4>

        <div class="row">
          <div
            v-for="planActivity in week.activities"
            :key="`recovery-plan-activity-${planActivity.id}`"
            :id="`recovery-plan-activity-${planActivity.id}`"
            class="col col-12 col-md-6 mb-3"
          >
            <ex-activity-list-item
              :activity="planActivity.Activity"
              :sets="planActivity.sets"
              :reps="planActivity.reps"
              @click.native="() => canEdit && editPlanActivity(planActivity)"
            >
              <div class="mt-2">
                <p class="mb-0">Weekly Frequency</p>
                <div class="d-flex" style="flex-wrap: wrap;">
                  <b-badge
                    v-for="day in planActivity.days"
                    :key="day"
                    pill
                    variant="primary"
                    class="mr-2 mb-1"
                  >
                    {{ day === 'ANY' ? 'ANY' : day.slice(0, 2) }}
                  </b-badge>
                </div>
              </div>

              <div class="mt-1">
                <p class="mb-0">Daily Frequency</p>
                <b-badge
                  pill
                  variant="primary"
                >
                  {{ planActivity.times.length }} {{ planActivity.times.length | pluralize( ['TIME', 'TIMES'] ) }}
                </b-badge>
              </div>
            </ex-activity-list-item>
          </div>
        </div>
      </div>
    </template>

    <b-pagination
      v-model="currentPage"
      :total-rows="weeks.length"
      :per-page="pageSize"
      :disabled="loading || recoveryPlan === null"
      class="mt-3"
      @change="scrollToTop"
    />

    <ex-modal
      v-if="canEdit && planActivityState"
      dismissible
      :close-action="false"
      id="edit-plan-activity"
      modal-class="ex-edit-plan-activity"
      title="Save Activity"
      :disabled="loading"
      @close="cancelEditPlanActivity"
    >

      {{ /* --- FREQUENCY --- */ }}
      <h4 class="mb-4">Frequency</h4>

      {{ /* DAYS */ }}
      <b-row class="mx-0">
        <p
          class="mr-2 mb-0 mt-2"
          style="width: 3.5rem"
        >
          Days:
        </p>
        <div style="flex-grow: 1">
          <b-row class="mx-0 mb-2 align-items-center">
            <b-button
              v-for="day in days"
              :key="day.id"
              :variant="planActivityState.data.days.includes(day.id) ? 'primary' : 'muted'"
              size="sm"
              class="mr-2"
              :disabled="saving || !editable"
              @click="handleToggleDay(day.id)"
            >
              {{ day.label }}
            </b-button>
            <b-button
              variant="outline-primary"
              class="ml-auto"
              :disabled="saving || !editable"
              @click="toggleAllDays"
            >
              {{ days.length - 1 === dayCount ? 'DeSelect' : 'Select' }} All
            </b-button>
          </b-row>
          <p class="text-muted">
            {{ dayCount || 1 }} {{ dayCount || 1 | pluralize(['day', 'days']) }} a day
          </p>
        </div>
      </b-row>

      {{ /* TIMES */ }}
      <b-row class="mx-0">
        <p
          class="mr-2 mb-0 mt-2"
          style="width: 3.5rem"
        >
          Times:
        </p>
        <div style="flex-grow: 1">
          <b-row class="mx-0 mb-2 align-items-center">
            <b-button
              v-for="time in times"
              :key="time.id"
              :variant="planActivityState.data.times.includes(time.id) ? 'primary' : 'muted'"
              size="sm"
              class="mr-2"
              :disabled="saving || !editable"
              @click="handleToggleTime(time.id)"
            >
              {{ time.label }}
            </b-button>
            <b-button
              variant="outline-primary"
              class="ml-auto"
              :disabled="saving || !editable"
              @click="toggleAllTimes"
            >
              {{ times.length - 1 === timeCount ? 'DeSelect' : 'Select' }} All
            </b-button>
          </b-row>
          <p class="text-muted">
            {{ timeCount || 1 }} {{ timeCount || 1 | pluralize(['time', 'times']) }} a day
          </p>
        </div>
      </b-row>

      {{ /* --- DATE RANGE --- */ }}
      <div class="my-4">
        <h4>Date Range</h4>
        <p class="text-muted">
          A start date cannot be set past the stop date. Set the stop date first if you would like the activity to start
          on a future date.
        </p>
        <b-row>
          <b-col>
            <p class="text-center h5">Start</p>
            <hr/>
            <ex-datepicker
              v-model="planActivityState.data.startDate"
              :disabled-dates="{
                from: planActivityState.data.stopDate,
              }"
            />
          </b-col>
          <b-col>
            <p class="text-center h5">Stop</p>
            <hr/>
            <ex-datepicker
              v-model="planActivityState.data.stopDate"
              :disabled-dates="{
                to: planActivityState.data.startDate,
              }"
            />
          </b-col>
        </b-row>
      </div>

      {{ /* --- ACTIVITIES --- */ }}
      <b-row class="my-4 mx-0 align-items-center justify-content-between">
        <div>
          <h4>Choose Activity</h4>
          <a
            href="https://assets.Demohealth.com/"
            target="_blank"
          >
            View Exercise Library
          </a>
        </div>

        <ex-icon-button
          v-if="!addingActivity && !editablePlanActivities.length"
          icon="plus"
          font-awesome
          :disabled="saving || !editable"
          tooltip="Add Activity"
          @click="addingActivity = true"
        />
        <ex-icon-button
          v-if="addingActivity"
          icon="times"
          font-awesome
          :disabled="saving || !editable"
          tooltip="Cancel Adding Activity"
          @click="cancelAddingActivity"
        />
      </b-row>

      {{ /* ADD ACTIVITY */ }}
      <template v-if="addingActivity">
        <ex-activity-search-integrated
          v-show="!addActivityState"
          store="fields/plan/edit"
          :disabled="saving"
          @select="handleSelectActivity"
        />

        <ex-activity-list-item-editable
          v-if="addActivityState"
          :activity="addActivityState"
          cancel-save-icon="trash"
          edit-only
          :disabled="saving"
          @cancel-edit="handleCancelAddActivity"
          @save="handleAddActivity"
        />
      </template>


      {{ /* ACTIVITY LIST */ }}
      <ex-activity-list-item-editable
        v-if="!addingActivity && editablePlanActivities.length"
        :key="editablePlanActivities[0].id"
        :activity="editablePlanActivities[0]"
        :editable="!editingPlanActivity || editablePlanActivities[0].editing"
        :reps="editablePlanActivities[0].data.reps"
        :sets="editablePlanActivities[0].data.sets"
        :disabled="saving || !editable"
        @delete="handleDeleteActivity(editablePlanActivities[0])"
        @save="handleSaveActivityState"
        @edit="editingPlanActivity = editablePlanActivities[0]"
        @cancel-edit="editingPlanActivity = null"
      />

      {{ /* --- ACTIONS --- */ }}
      <b-row class="mx-0 mt-4 justify-content-between align-items-center">
        <b-button
          variant="primary"
          size="lg"
          :disabled="saving || !editable || addingActivity || planActivityErrors.length > 0"
          @click="handleSavePlanActivity"
        >
          {{ planActivityState.id === 0 ? 'Add Activity' : 'Update Activity' }}
        </b-button>
        <b-button
          v-if="planActivityState.id !== 0"
          variant="danger"
          size="lg"
          :disabled="saving || !editable || addingActivity"
          @click="handleDeletePlanActivity"
        >
          Delete Activity
        </b-button>
      </b-row>

      {{ /* --- ERRORS --- */ }}
      <b-alert
        v-if="savingError"
        variant="danger"
        show
        class="mt-4"
      >
        {{ savingError }}
      </b-alert>
      <template v-if="planActivityErrors.length > 0">
        <hr class="mt-4"/>
        <p class="mt-4">The following is still required in order to {{
            planActivityState.id === 0 ? 'add' : 'update'
          }}
          the activity</p>
        <b-alert
          v-for="(error, index) in planActivityErrors"
          :key="index"
          show
          class="mt-4"
        >
          {{ error }}
        </b-alert>
      </template>
    </ex-modal>
  </div>
</template>

<script>
import uuid from 'uuid'
import {mapState} from 'vuex'
import draggable from 'vuedraggable'
import ExActivitySearchIntegrated from '../ActivitySearchIntegrated'
import ExActivityListItem from '../recoveryPlan/ActivityListItem'
import ExActivityListItemEditable from '../recoveryPlan/ActivityListItemEditable'
import makeRequest from '../../util/graphql/makeRequest'
import queryRecoveryPlan from '../../graphql/queries/recoveryPlan/recoveryPlan'
import mutationUpdatePlanActivity from '../../graphql/mutations/recoveryPlan/updatePlanActivity'
import mutationCreatePlanActivity from '../../graphql/mutations/recoveryPlan/createPlanActivity'
import mutationDeletePlanActivity from '../../graphql/mutations/recoveryPlan/deletePlanActivity'
import getRecoveryPlanDateRange from '../../util/recoveryPlan/getRecoveryPlanDateRange'
import stringToDateNoTimezone from '../../util/date/stringToDateNoTimezone'

export default {
  name: 'ex-recovery-plan',
  components: {
    draggable,
    ExActivityListItem,
    ExActivitySearchIntegrated,
    ExActivityListItemEditable,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      days: [
        {
          id: 'MONDAY',
          label: 'Mon',
        },
        {
          id: 'TUESDAY',
          label: 'Tue',
        },
        {
          id: 'WEDNESDAY',
          label: 'Wed',
        },
        {
          id: 'THURSDAY',
          label: 'Thu',
        },
        {
          id: 'FRIDAY',
          label: 'Fri',
        },
        {
          id: 'SATURDAY',
          label: 'Sat',
        },
        {
          id: 'SUNDAY',
          label: 'Sun',
        },
        {
          id: 'ANY',
          label: 'Anytime',
        },
      ],
      times: [
        {
          id: 'MORNING',
          label: 'Morning',
        },
        {
          id: 'AFTERNOON',
          label: 'Afternoon',
        },
        {
          id: 'EVENING',
          label: 'Evening',
        },
        {
          id: 'ANYTIME',
          label: 'Anytime',
        },
      ],
      recoveryPlan: null,
      loading: false,
      error: null,
      saving: false,
      savingError: null,
      planActivityState: null,
      editingPlanActivity: null,
      addingActivity: false,
      activitySearchQuery: '',
      addActivityState: null,
      creatingPlanActivity: false,
      updatingPlanActivity: false,
      deletingPlanActivity: false,
      planDateRange: [null, null],
      currentPage: 1,
      pageSize: 5,
    }
  },
  computed: {
    editable() {
      return !this.creatingPlanActivity && !this.updatingPlanActivity && !this.deletingPlanActivity
    },

    dayCount() {
      return this.planActivityState.data.days.length
    },

    timeCount() {
      return this.planActivityState.data.times.length
    },

    planActivityErrors() {
      const errors = []
      if (!this.planActivityState.activities.length) errors.push('Please select an activity.')
      return errors
    },

    editablePlanActivities() {
      return this.planActivityState.activities.sort((a, b) => a.data.order - b.data.order)
    },

    weeks() {
      if (!this.planDateRange || !this.planDateRange.length || this.planDateRange[0] === null) return [];
      const weeks = [];
      let currentWeek = this.planDateRange[0];
      let index = 0;
      while (currentWeek.isSameOrBefore(this.planDateRange[1])) {
        const week = {
          index,
          start: currentWeek.startOf('week').toDate(),
          end: currentWeek.endOf('week').toDate(),
        }
        week.activities = this.getWeekActivities(week);
        if (week.activities.length) weeks.push(week);
        index += 1;
        currentWeek.add(1, 'd');
      }
      return weeks;
    },

    paginatedWeeks() {
      const from = (this.currentPage * this.pageSize) - this.pageSize;
      const to = from + this.pageSize;
      return this.weeks.slice(from, to);
    },

    ...mapState('organization', ['organization']),
  },
  watch: {
    recoveryPlan(plan) {
      this.planDateRange = getRecoveryPlanDateRange(plan)
    },
  },
  mounted() {
    this.getRecoveryPlan()
  },
  methods: {
    scrollToTop() {
      this.$el.scrollIntoView({behavior: 'smooth'});
    },

    getWeekActivities(week) {
      const weekActivities = this.recoveryPlan.PlanActivities.filter((planActivity) => (
        (
          planActivity.startDate
          && this.$moment(stringToDateNoTimezone(planActivity.startDate)).isSameOrBefore(week.end, 'day')
        )
        && (
          planActivity.stopDate
          && this.$moment(stringToDateNoTimezone(planActivity.stopDate)).isSameOrAfter(week.start, 'day')
        )
      ))

      // Sort by activity type
      // @see https://stackoverflow.com/a/14872766/2292329
      const ordering = {};
      const sortOrder = ['EXERCISE', 'STRETCH', 'WALKING', 'RELAXATION', 'ARTICLE', 'SURVEY'];
      for (let i = 0; i < sortOrder.length; i++) {
        ordering[sortOrder[i]] = i;
      }
      weekActivities.sort((a, b) => (
        (ordering[a.Activity.type] - ordering[b.Activity.type]) || a.Activity.name.localeCompare(b.Activity.name)
      ));

      return weekActivities;
    },

    updateActivityAssignmentsOrder(order = this.editablePlanActivities.map(a => a.id)) {
      this.planActivityState.activities = order.map((id, index) => {
        const activity = this.planActivityState.activities.find(a => a.id === id)
        return {
          ...activity,
          data: {
            ...activity.data,
            order: index + 1, // 1-based index
          },
        }
      })
    },

    async editPlanActivity(planActivity) {
      this.planActivityState = {
        id: planActivity.id,
        data: {
          days: planActivity.days || ['ANY'],
          times: planActivity.times || ['ANYTIME'],
          startDate: planActivity.startDate ? stringToDateNoTimezone(planActivity.startDate) : new Date(),
          stopDate: planActivity.stopDate ? stringToDateNoTimezone(planActivity.stopDate) : new Date(),
        },
        activities: planActivity.id !== 0 ? [{
          id: uuid(),
          activity: planActivity.Activity,
          editing: false,
          deleting: false,
          data: {
            id: planActivity.id,
            order: planActivity.order,
            reps: planActivity.reps,
            sets: planActivity.sets,
          },
        }] : [],
      }
      await this.$nextTick()
      this.$bvModal.show('edit-plan-activity')
    },

    cancelEditPlanActivity(shouldConfirm = true) {
      if (!shouldConfirm || (shouldConfirm && confirm('Cancel editing this activity?\nAll changes will be lost.'))) {
        this.planActivityState = null
        this.editingPlanActivity = null
        this.addingActivity = false
        this.activitySearchQuery = ''
        this.addActivityState = null
        this.$bvModal.hide('edit-plan-activity')
      }
    },

    async handleDeletePlanActivity() {
      if (!confirm('Delete this activity? This cannot be undone.')) return

      this.savingError = null;
      this.saving = true

      const {errors} = await makeRequest(this.$axios, {
        query: mutationDeletePlanActivity,
        variables: {
          id: this.planActivityState.id,
        },
      })

      if (errors.length) {
        this.savingError = 'Could not delete activity.'
        this.saving = false
      } else {
        this.$toast.success('Activity Deleted')
        this.cancelEditPlanActivity(false)
        this.saving = false
        await this.getRecoveryPlan();
      }
    },

    async handleSavePlanActivity() {
      if (!confirm('Save all changes?')) return

      const newActivity = this.planActivityState.id === 0

      this.saving = true
      this.savingError = null

      const planActivity = {
        ...this.planActivityState.data,
        // default to ANY days
        days: this.planActivityState.data.days.length === 0 ? ['ANY'] : this.planActivityState.data.days,
      }

      const variables = {
        recoveryPlanActivity: {
          ...this.planActivityState.activities[0].data,
          ...planActivity,
          activityId: this.planActivityState.activities[0].activity.id,
        }
      };

      if (newActivity) {
        variables.recoveryPlanActivity.recoveryPlanId = this.recoveryPlan.id
        delete variables.recoveryPlanActivity.id;
      } else {
        variables.recoveryPlanActivity.id = this.planActivityState.id
      }

      const {data, errors} = await makeRequest(this.$axios, {
        query: newActivity ? mutationCreatePlanActivity : mutationUpdatePlanActivity,
        variables,
      })

      if (errors.length) {
        this.error = 'Could not save activity.'
        this.saving = false
      } else {
        const activityId = this.planActivityState.id ? this.planActivityState.id : data.createRecoveryPlanActivity.id
        this.$toast.success('Activity Updated')
        this.cancelEditPlanActivity(false)
        this.saving = false
        await this.getRecoveryPlan();

        // scroll to position
        const $activity = document.getElementById(`recovery-plan-activity-${activityId}`);
        if ($activity) $activity.scrollIntoView();
      }
    },

    cancelAddingActivity() {
      this.addingActivity = false
      this.handleCancelAddActivity()
    },

    handleCancelAddActivity() {
      this.addActivityState = null
    },

    handleAddActivity(activityState) {
      this.planActivityState.activities = [
        {
          id: uuid(),
          activity: this.addActivityState.activity,
          editing: false,
          deleting: false,
          data: {...activityState, id: 0}, // id: 0 indicates it is new
        },
        ...this.planActivityState.activities,
      ]

      this.updateActivityAssignmentsOrder()

      this.addActivityState = null
      this.addingActivity = false
    },

    handleSelectActivity(activity) {
      this.addActivityState = {
        activity,
        data: {
          reps: activity.reps,
          sets: activity.sets,
        },
      }
    },

    handleSortEnd({newIndex, oldIndex}) {
      const order = this.editablePlanActivities.map(a => a.id)
      const movedActivityId = order[oldIndex]
      const newOrder = order.filter(id => id !== movedActivityId)
      newOrder.splice(newIndex, 0, movedActivityId)

      this.updateActivityAssignmentsOrder(newOrder)
    },

    handleDeleteActivity(activity) {
      this.planActivityState.activities = this.planActivityState.activities.filter(a => a.id !== activity.id)
      this.updateActivityAssignmentsOrder()
    },

    handleSaveActivityState(activityState) {
      this.planActivityState.activities = this.planActivityState.activities.map((activity) => (
          activity.id === this.editingPlanActivity.id
            ? {...activity, data: {...activity.data, ...activityState}}
            : activity
        ),
      )
    },

    toggleAllTimes() {
      if (this.times.length - 1 === this.timeCount) {
        this.deSelectAllTimes()
      } else {
        this.selectAllTimes()
      }
    },

    deSelectAllTimes() {
      this.planActivityState.data.times = ['ANYTIME']
    },

    selectAllTimes() {
      this.planActivityState.data.times = this.times
        .filter(({id}) => id !== 'ANYTIME')
        .map(({id}) => id)
    },

    handleToggleTime(timeId) {
      if (timeId !== 'ANYTIME' && this.planActivityState.data.times.includes(timeId)) {
        this.planActivityState.data.times = this.planActivityState.data.times.filter((time) => time !== timeId)
      } else {
        if (timeId === 'ANYTIME') {
          this.planActivityState.data.times = ['ANYTIME']
        } else {
          this.planActivityState.data.times = this.planActivityState.data.times
            .filter((time) => time !== 'ANYTIME')
            .concat(timeId)
        }
      }
    },

    toggleAllDays() {
      if (this.days.length - 1 === this.dayCount) {
        this.deSelectAllDays()
      } else {
        this.selectAllDays()
      }
    },

    deSelectAllDays() {
      this.planActivityState.data.days = ['ANY']
    },

    selectAllDays() {
      this.planActivityState.data.days = this.days
        .filter(({id}) => id !== 'ANY')
        .map(({id}) => id)
    },

    handleToggleDay(dayId) {
      if (dayId !== 'ANY' && this.planActivityState.data.days.includes(dayId)) {
        this.planActivityState.data.days = this.planActivityState.data.days.filter((day) => day !== dayId)
      } else {
        if (dayId === 'ANY') {
          this.planActivityState.data.days = ['ANY']
        } else {
          this.planActivityState.data.days = this.planActivityState.data.days
            .filter((day) => day !== 'ANY')
            .concat(dayId)
        }
      }
    },

    async getRecoveryPlan() {
      this.loading = true

      const {data, errors} = await makeRequest(this.$axios, {
        query: queryRecoveryPlan,
        variables: {
          id: this.id,
        },
      })

      if (data && !errors.length) {
        this.recoveryPlan = data.recoveryPlan
      } else {
        this.error = 'Could not get recovery plan. Please try again later.'
      }

      this.loading = false
    },
  },
}
</script>
