<template>
<b-row
  class="mx-0 align-items-center justify-content-between w-100"
  style="flex-wrap: nowrap"
  no-gutters
>
  <b-col cols="auto">
    <b-row no-gutters class="align-items-center">
      <b-col cols="auto" class="mr-2">
        <div style="width: 64px;" class="text-center">
          <ex-icon-button icon="newspaper" font-awesome size="lg" tag="span" disabled/>
        </div>
      </b-col>
      <b-col cols="auto">
        {{ article.title }}
        <p
          class="text-muted mb-0"
        >
          <span class="text-emphasis">{{ article.article_sections.length }}</span>
          {{ article.article_sections.length | pluralize(['section', 'sections']) }}
        </p>
      </b-col>
    </b-row>
  </b-col>
</b-row>
</template>
<script>
import ExIconButton from '../IconButton'

export default {
  name: 'ex-activity-list-item',
  components: {ExIconButton},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>
