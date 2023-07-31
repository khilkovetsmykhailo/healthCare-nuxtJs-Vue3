<template>
  <div class="ex-patient">
    <header class="ex-patient-header d-flex align-items-center justify-content-between mx-0 mb-3">
      <div class="d-flex">
        <h1 class="h3 mb-0">
          {{ patient.User.firstName }} {{ patient.User.lastName }}
        </h1>
        <ex-icon-button
          v-if="patient.User.email"
          icon="mail"
          size="sm"
          circle
          class="ml-3"
          :href="`mailto:${patient.User.email}`"
          tag="a"
        />
      </div>
      <div>
        <ex-icon-button
          v-if="activeTab !== 'edit'"
          icon="user-edit"
          tooltip="View and Edit Patient Information"
          class="mr-2"
          font-awesome
          @click="activeTab = 'edit'"
        />
        <ex-icon-button
          v-if="activeTab === 'edit'"
          icon="chevron-left"
          tooltip="Go Back"
          class="mr-2"
          font-awesome
          @click="handleCancelEdit"
        />
        <ex-icon-button
          v-if="activeTab !== 'edit'"
          icon="times"
          tooltip="Close Patient View"
          font-awesome
          @click="$router.push(`/${organization.slug}`)"
        />
      </div>
    </header>

    <div v-if="activeTab !== 'edit'">
      <section class="d-flex justify-content-between">
        <div>
          <ex-label primary>Date of Birth</ex-label>
          <p class="mb-1">
            {{ $moment(patient.User.dateOfBirth).format('DD MMM YYYY') }}
          </p>
        </div>

        <div v-if="recoveryPlan && recoveryPlan.planType === 'PT'">
          <ex-label primary>Recovery Plan</ex-label>
          <p class="mb-1">
            {{ recoveryPlan.name }}
          </p>
        </div>

        <div v-if="planSurgery">
          <ex-label primary>Surgery</ex-label>
          <p class="mb-1">
            {{ planSurgery.Surgery.name }} on {{ planSurgery.surgeryDate | formatDate }}
          </p>
        </div>

        <div v-if="planSurgeon">
          <ex-label primary>Surgeon</ex-label>
          <p class="mb-1">
            {{ planSurgeon.User.firstName }} {{ planSurgeon.User.lastName }}
          </p>
        </div>

        <div v-if="primaryPhysicalTherapist">
          <ex-label primary>Primary Physical Therapist</ex-label>
          <p class="mb-1">
            {{ primaryPhysicalTherapist.User.firstName }} {{ primaryPhysicalTherapist.User.lastName }}
          </p>
        </div>
        <!--          <b-col class="col-12 col-md-6 col-lg-7">-->
        <!--            <ex-label primary>Health Conditions</ex-label>-->
        <!--            <p class="mb-1">-->
        <!--                <span v-if="patient.healthConditions && patient.healthConditions.length">-->
        <!--                  {{ patient.healthConditions | displayList }}-->
        <!--                </span>-->
        <!--              <span-->
        <!--                v-else-->
        <!--                class="text-muted"-->
        <!--              >-->
        <!--                  None Specified-->
        <!--                </span>-->
        <!--            </p>-->
        <!--            <ex-label primary>Assistive Devices</ex-label>-->
        <!--            <p class="mb-1">-->
        <!--                <span v-if="patient.assistiveDevices && patient.assistiveDevices.length">-->
        <!--                  {{ patient.assistiveDevices | displayList }}-->
        <!--                </span>-->
        <!--              <span-->
        <!--                v-else-->
        <!--                class="text-muted"-->
        <!--              >-->
        <!--                  None Specified-->
        <!--                </span>-->
        <!--            </p>-->
        <!--            <ex-label primary>Personal Goals</ex-label>-->
        <!--            <p class="mb-1">-->
        <!--                <span v-if="patient.personalGoals && patient.personalGoals">-->
        <!--                  {{ patient.personalGoals }}-->
        <!--                </span>-->
        <!--              <span-->
        <!--                v-else-->
        <!--                class="text-muted"-->
        <!--              >-->
        <!--                  None Specified-->
        <!--                </span>-->
        <!--            </p>-->
        <!--          </b-col>-->
      </section>
      <section class="ex-patient-tab-selector my-5">
        <b-row>
          <b-col
            v-for="tab in tabs"
            :key="tab.id"
            class="col-6 col-md-6 col-lg-4"
          >
            <!-- default tabs -->
            <ex-block-button
              :icon="tab.icon"
              :color="tab.color"
              :active="tab.id === activeTab"
              class="mb-3"
              :icon-props="tab.iconProps"
              @click="activeTab = tab.id"
            >
              {{ tab.name }}
            </ex-block-button>
          </b-col>
        </b-row>
      </section>
    </div>

    <section class="ex-patient-tabs mt-5">
      <transition
        name="fade"
        mode="out-in"
      >
        <ex-patient-tab-compliance v-if="activeTab === 'compliance'"/>
        <ex-patient-tab-edit v-if="activeTab === 'edit'" @change="hasChanges = true"/>
        <ex-patient-tab-milestones v-if="activeTab === 'milestones'"/>
        <ex-patient-tab-movement v-if="activeTab === 'movement'"/>
        <ex-patient-tab-notes-surveys v-if="activeTab === 'notes-surveys'"/>
        <ex-patient-tab-pain v-if="activeTab === 'pain'"/>
        <ex-patient-tab-plan v-if="activeTab === 'plan'"/>
      </transition>
    </section>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import ExPatientTabCompliance from './patient-tabs/PatientTabCompliance'
import ExPatientTabEdit from './patient-tabs/PatientTabEdit'
import ExPatientTabMilestones from './patient-tabs/PatientTabMilestones'
import ExPatientTabMovement from './patient-tabs/PatientTabMovement'
import ExPatientTabNotesSurveys from './patient-tabs/PatientTabNotesSurveys'
import ExPatientTabPain from './patient-tabs/PatientTabPain'
import ExPatientTabPlan from './patient-tabs/PatientTabPlan'

export default {
  name: 'patient',
  components: {
    ExPatientTabCompliance,
    ExPatientTabEdit,
    ExPatientTabMilestones,
    ExPatientTabMovement,
    ExPatientTabNotesSurveys,
    ExPatientTabPain,
    ExPatientTabPlan,
  },
  data() {
    const tabs = [
      { id: 'compliance', name: 'Compliance', icon: 'check-circle', color: 'purple' },
      { id: 'pain', name: 'Pain', icon: 'dot', color: 'red' },
      { id: 'plan', name: 'Patient Plan', icon: 'plan', color: undefined },
      { id: 'milestones', name: 'Milestones', icon: 'milestones', color: 'green' },
      {
        id: 'notes-surveys',
        name: 'Notes & Surveys',
        icon: 'clipboard-list',
        color: 'lavender',
        iconProps: { fontAwesome: true, size: '2x' },
      },
    ]

    if (this.$config.env === 'staging') {
      tabs.push({ id: 'movement', name: 'Movement', icon: 'walking', color: 'yellow' })
    }

    return {
      activeTab: tabs[0].id,
      hasChanges: false,
      previousTab: tabs[0].id,
      tabs,
    }
  },
  computed: {
    ...mapState('organization', [
      'organization',
    ]),

    ...mapState('organization/patient', [
      'patient',
      'surgery',
    ]),

    ...mapGetters('organization/patient', [
      'planSurgery',
      'planSurgeon',
      'primaryPhysicalTherapist',
      'recoveryPlan',
    ]),
  },
  watch: {
    activeTab(tab, previousTab) {
      if (previousTab !== 'edit') this.previousTab = previousTab
    },
  },
  methods: {
    handleCancelEdit() {
      if (this.hasChanges && !confirm('Discard changes to patient?')) return
      this.activeTab = this.previousTab
      this.hasChanges = false
    },
  },
}
</script>
