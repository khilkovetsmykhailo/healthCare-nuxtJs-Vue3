<template>
  <div>
    <ex-survey :survey="survey"/>
  </div>
</template>
<script>
import ExSurvey from '../../../surveys/Survey'
export default {
  name: "ex-survey-activity-summary",
  components: { ExSurvey },
  props: {
    activity: { type: Object, required: true },
    survey: { type: Object, required: true },
  }
}
</script>
