<template>
  <ex-accordion>
    <template v-slot:title>
      <div class="d-flex">
        <b-row
          class="align-items-center justify-content-between mx-0 pr-3 border-right"
          style="flex-grow: 0; flex-wrap: nowrap"
        >
          <p class="mb-0 text-center text-nowrap">
            {{ $moment(surveyResponse.createdAt).format('DD MMM YYYY') }}<br/>
            <span class="small text-muted">
              {{ $moment(surveyResponse.createdAt).fromNow() }}
            </span>
          </p>
        </b-row>
        <b-row
          class="align-items-center justify-content-between mx-0 w-100 px-3"
          style="flex-wrap: nowrap"
        >
          <div style="flex-grow: 0">
            <p class="mb-0">
              {{ surveyResponse.Survey.title }}<br/>
              <span
                v-if="surveyResponse.Survey.description"
                class="small text-muted"
                style="line-height: 1.25"
              >
                {{ surveyResponse.Survey.description }}
              </span>
            </p>
          </div>
        </b-row>
      </div>
    </template>

    <div
      v-for="(answer, answerIndex) in surveyResponse.Answers"
      :key="`survey-response-answer-${answer.id}`"
      class="mt-2"
    >
      <p class="mb-0 font-weight-bold">
          <span class="mr-1">
            {{ answerIndex + 1 }}
          </span>
        {{ answer.Question.content }}
      </p>
      <p class="mt-1">
        {{ getAnswerText(answer) }}
      </p>
    </div>
  </ex-accordion>
</template>

<script>
import log from '../../lib/log'
import arrayToReadableList from '../../util/common/arrayToReadableList'

export default {
  name: 'ex-survey-response',
  props: {
    surveyResponse: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getAnswerText(answer) {
      switch (answer.Question.type) {
        case 'TEXT':
        case 'PARAGRAPH':
          return answer.answer
        case 'SINGLE_CHOICE':
          return answer.answer
        case 'MULTIPLE_CHOICE':
          return arrayToReadableList(answer.answer)
        default:
          log.error(`Unrecognized survey question type: ${answer.Question.type}`)
      }
    },
  },
}
</script>
