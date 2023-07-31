<template>
  <ex-list-item no-hover class="mb-3">
    <b-row class="align-items-center justify-content-between mx-0" style="flex-grow: 0; flex-wrap: nowrap">
      <ex-avatar size="large" class="float-left">
        <font-awesome-icon v-if="section.type === 'text'" icon="align-left" size="lg"/>
        <font-awesome-icon v-if="section.type === 'image'" icon="image" size="lg"/>
        <font-awesome-icon v-if="section.type === 'video'" icon="video" size="lg"/>
        <font-awesome-icon v-if="section.type === 'website'" icon="link" size="lg"/>
      </ex-avatar>
    </b-row>
    <b-row class="align-items-center justify-content-between mx-0 w-100" style="flex-wrap: nowrap">
      <div style="flex-grow: 0">
        <p class="block-with-text text-muted mr-1 mb-0" v-if="section.type !== 'image'"  style="height: 3.6rem;">
          {{ section.content }}
        </p>
        <div v-if="section.type === 'image'" style="height: 3.6rem;">
          <ex-file
            v-if="section.file"
            v-bind="section.file"
            class="h-100 w-auto border"
            fluid
          />
          <ex-label v-else>
            No File
          </ex-label>
        </div>
      </div>
    </b-row>
    <b-row class="align-items-center justify-content-between mx-0" style="flex-grow: 0; flex-wrap: nowrap">
      {{ /* Default State */ }}
      <template v-if="!deleting">
        <ex-icon-button
          icon="edit"
          font-awesome
          class="ml-2"
          tooltip="Edit Section Content"
          @click="$emit('edit')"
        />
        <ex-icon-button
          icon="trash-alt"
          font-awesome
          class="ml-2"
          tooltip="Remove Section"
          @click="deleting = true"
        />
        <ex-icon-button
          icon="bars"
          font-awesome
          tooltip="Move Section"
          class="sort-handle ml-2"
        />
      </template>
      {{ /* Delete Confirmation State */ }}
      <template v-if="deleting">
        <ex-icon-button
          icon="times"
          font-awesome
          tooltip="Cancel Removing Section"
          @click="deleting = false"
        />
        <ex-icon-button
          icon="trash"
          font-awesome
          class="ml-2"
          color="red"
          tooltip="Remove Section"
          @click="$emit('delete')"
        />
      </template>
    </b-row>
  </ex-list-item>
</template>
<script>
export default {
  name: 'ex-article-section-list-item',
  data: () => ({
    deleting: false,
  }),
  props: {
    section: { type: Object, required: true }
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
