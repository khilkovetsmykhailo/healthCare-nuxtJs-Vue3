<template>
<span
  class="ex-icon"
  :class="{ inline, size }"
>
  <component :is="`icon-${icon}`"/>
</span>
</template>

<script>
import IconActivity from '../assets/svg/activity.svg'
import IconInfo from '../assets/svg/info.svg'
import IconAddTeam from '../assets/svg/add-team.svg'
import IconAddUser from '../assets/svg/add-user.svg'
import IconArrowLeft from '../assets/svg/arrow-left.svg'
import IconArrowRight from '../assets/svg/arrow-right.svg'
import IconChair from '../assets/svg/chair.svg'
import IconChat from '../assets/svg/chat.svg'
import IconCheckCircle from '../assets/svg/check-circle.svg'
import IconClose from '../assets/svg/close.svg'
import IconCog from '../assets/svg/cog.svg'
import IconDoctor from '../assets/svg/doctor.svg'
import IconDot from '../assets/svg/dot.svg'
import IconHome from '../assets/svg/home.svg'
import IconIce from '../assets/svg/ice.svg'
import IconMail from '../assets/svg/mail.svg'
import IconMenu from '../assets/svg/menu.svg'
import IconMilestones from '../assets/svg/milestones.svg'
import IconMilestoneComplete from '../assets/svg/milestone-complete.svg'
import IconMilestonePending from '../assets/svg/milestone-pending.svg'
import IconMilestoneSkipped from '../assets/svg/milestone-skipped.svg'
import IconPatient from '../assets/svg/patient.svg'
import IconPersonRunning from '../assets/svg/person-running.svg'
import IconPhone from '../assets/svg/phone.svg'
import IconPillows from '../assets/svg/pillows.svg'
import IconPlan from '../assets/svg/plan.svg'
import IconPlus from '../assets/svg/plus.svg'
import IconSearch from '../assets/svg/search.svg'
import IconShield from '../assets/svg/shield.svg'
import IconSpeaker from '../assets/svg/speaker.svg'
import IconStool from '../assets/svg/stool.svg'
import IconSurgeryHip from '../assets/svg/surgery-hip.svg'
import IconSurgeryKnee from '../assets/svg/surgery-knee.svg'
import IconSurvey from '../assets/svg/survey.svg'
import IconTeam from '../assets/svg/team.svg'
import IconTowels from '../assets/svg/towels.svg'
import IconWalking from '../assets/svg/walking.svg'
import IconWellness from '../assets/svg/wellness.svg'

const components = {
  IconInfo,
  IconActivity,
  IconAddTeam,
  IconAddUser,
  IconArrowLeft,
  IconArrowRight,
  IconChair,
  IconChat,
  IconCheckCircle,
  IconClose,
  IconCog,
  IconDoctor,
  IconDot,
  IconHome,
  IconIce,
  IconMail,
  IconMilestones,
  IconMilestoneComplete,
  IconMilestoneSkipped,
  IconMilestonePending,
  IconMenu,
  IconPatient,
  IconPersonRunning,
  IconPhone,
  IconPillows,
  IconPlan,
  IconPlus,
  IconSearch,
  IconShield,
  IconSpeaker,
  IconStool,
  IconSurgeryHip,
  IconSurgeryKnee,
  IconSurvey,
  IconTeam,
  IconTowels,
  IconWalking,
  IconWellness,
}

export default {
  name: 'ex-icon',
  components,
  props: {
    size: {
      type: String,
      default: 'small',
    },
    icon: {
      type: String,
      required: true,
      // Converts all icons to kebab case before checking if the icon is included
      validator: value => Object.keys(components).map(
        item => (item.charAt(0) + item.slice(1).replace(/([A-Z])/g, '-$1')).toLowerCase(),
      ).includes(`icon-${value}`),
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
