<template>
  <div>
      <h4 class="my-2">{{ survey.name }}</h4>
      <p class="mb-2">{{ survey.description }}</p>
      <b-row class="justify-content-center my-4">
        <b-col cols="auto">
          <ex-file v-bind="survey.file" fluid class="border"/>
        </b-col>
      </b-row>
      <hr/>
      <div
        v-for="(section, sectionIndex) in survey.survey_sections"
        :key="sectionIndex"
      >
        <p class="mb-0" v-if="section.name">{{ section.name }}</p>
        <p class="small text-muted" v-if="section.name && section.description">{{ section.description }}</p>
        <div
          class="pl-4 mb-2"
          v-for="(question, questionIndex) in section.questions"
          :key="questionIndex"
        >
          <p class="mb-0">
            {{ questionIndex + 1 }}. {{ question.text }}
            <span class="small text-muted mb-0" v-if="question.subtext">{{ question.subtext }}</span>
          </p>
          <p class="mb-0 small text-muted">
            <span class="text-capitalize">
              {{ normalizedQuestionType(question.input_type.name) }}
            </span>
            <span
              v-b-toggle="`${sectionIndex}-${questionIndex}-options`"
              v-if="question.question_options.length > 0"
              style="cursor: pointer;"
            >
              &bull;
              <span class="text-primary">{{ question.question_options.length }}</span>
              Options
            </span>
          </p>
          <b-collapse
            :id="`${sectionIndex}-${questionIndex}-options`"
            v-if="question.question_options.length > 0"
            class="small"
          >
            <ul>
              <li
                v-for="(option, optionIndex) in question.question_options"
                :key="optionIndex"
              >
                {{ option.option_choice.text }}
                <span v-if="option.option_choice.value_numeric" class="text-muted">
                  (<span class="text-warning">+{{ option.option_choice.value_numeric }}</span>)
                </span>
              </li>
            </ul>
          </b-collapse>
        </div>
        <hr v-if="sectionIndex < survey.survey_sections.length - 1"/>
      </div>
  </div>
</template>
<script>
export default {
  name: 'ex-survey',
  props: {
    survey: { type: Object, required: true }
  },
  methods: {
    normalizedQuestionType(inputType) {
      return (['radio', 'checkbox'].includes(inputType))
        ? `${inputType} buttons`
        : inputType
    }
  }
}
</script>
