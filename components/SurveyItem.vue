<template>
<ex-accordion>
  <template v-slot:title>
  <b-row>
    <b-col class="ex-survey-item-date">
      <div class="ex-survey-item-date-detailed">{{ createdOn | formatDate }}</div>
      <div class="ex-survey-item-date-relative">{{ createdOn | formatDate('fromNow') }}</div>
    </b-col>
    <b-col class="ex-survey-item-name">
      <div class="ex-survey-item-name-text">{{ name }}</div>
      <div class="ex-survey-item-score">Outcome Score: 42.22 (62%)</div>
    </b-col>
  </b-row>
  </template>

  <b-row class="mx-0 ex-survey-item-answers-header justify-content-between">
    <div class="ex-survey-item-answers-header-text">Question</div>
    <div class="ex-survey-item-answers-header-text text-right">Response</div>
  </b-row>
  <b-row
    v-for="(answer, answerI) in answers"
    :key="answer.id"
    class="mx-0 ex-survey-item-answer justify-content-between"
  >
    <div class="ex-survey-item-answer-index">
      {{ answerI + 1 }}.
    </div>
    <div class="ex-survey-item-answer-question">
      {{ answer.question.text }}
    </div>
    <div class="ex-survey-item-answer-response">
      {{ answer.question_option.option_choice.text }}
    </div>
  </b-row>
</ex-accordion>
</template>

<script>
export default {
  name: 'ex-survey-item',
  props: {
    name: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      default: undefined,
    },
    createdOn: {
      type: [Date, String],
      default: undefined,
    },
  },
  data() {
    return {
      open: false,
    }
  },
}
</script>
