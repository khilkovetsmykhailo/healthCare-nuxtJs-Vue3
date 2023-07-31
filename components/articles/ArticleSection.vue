<template>
  <div>
    <div v-if="section.type === 'text'">
      <ex-empty-label v-if="!section.content || section.content === ''">
        No Content in Section
      </ex-empty-label>
      <div v-else v-html="$md.render(section.content)"/>
    </div>
    <div v-if="section.type === 'image'">
      <b-row class="justify-content-center">
        <b-col cols="auto">
          <ex-file v-bind="section.file" fluid/>
        </b-col>
      </b-row>
    </div>
    <div v-if="section.type === 'video'">
      <ex-empty-label v-if="!section.content && section.content !== ''">
        No Video Link Specified
      </ex-empty-label>
      <b-embed
        v-else
        type="iframe"
        aspect="16by9"
        :src="normalizeYoutubeLink(section.content || '')"
        allowfullscreen
      />
    </div>
    <hr v-if="!noHr"/>
  </div>
</template>
<script>
export default {
  name: 'ex-article-section',
  props: {
    section: { type: Object, required: true },
    noHr: { type: Boolean },
  },
  methods: {
    normalizeYoutubeLink(src) {
      return src.includes('youtu.be')
        ? `https://youtube.com/embed/${src.split('/').pop()}`
        : src
    }
  }
}
</script>
