<template>
  <ex-list-item
    :tag="clickable ? 'button' : 'div'"
    :flat="flat"
  >
    <b-row
      class="mx-0 align-items-center justify-content-between w-100"
      style="flex-wrap: nowrap"
      no-gutters
    >
      <b-col cols="auto">
        <b-row no-gutters class="align-items-top" style="flex-wrap: nowrap;">
          <b-col cols="auto" class="mr-3">
            <div v-if="activityImageAsset" style="width: 64px;">
              <ex-aws-image :file-id="activityImageAsset.fileId"/>
            </div>
            <div v-if="showImage && !activityImageAsset" style="width: 64px;" class="text-center">
              <ex-icon-button
                v-bind="iconProps"
                tag="span"
              />
            </div>
          </b-col>
          <b-col cols="activity-list-item-name-col auto">
            <div class="activity-list-item-name">
              {{ activity.name }}
            </div>
            <p
              v-if="showDuration && ['EXERCISE'].includes(activity.type)"
              class="text-muted mb-0"
            >
              <span class="text-emphasis">{{ reps }}</span>
              {{ reps | pluralize(['repetition', 'repetitions']) }}
              &bull;
              <span class="text-emphasis">{{ sets }}</span>
              {{ sets | pluralize(['set', 'sets']) }}
            </p>
            <p
              v-if="showDuration && ['RELAXATION', 'WALKING', 'STRETCH'].includes(activity.type)"
              class="text-muted mb-0"
            >
              <span class="text-emphasis">{{ reps }}</span>
              {{ reps | pluralize(['minute', 'minutes']) }}
            </p>
            <p v-if="$slots.default" class="mb-0 text-muted">
              <slot/>
            </p>
            <p v-if="showItems" class="mb-0 small text-muted">
              <span class="text-capitalize">{{ activity.Type }} Activity</span>
              <span v-if="activity.ActivityItems">
                <span class="mx-1">&bull;</span>
                <span class="text-primary">
                  {{ activity.activity_items.length }}
                </span>
                Items Needed
              </span>
            </p>
          </b-col>

          <slot name="after"/>
        </b-row>
      </b-col>
    </b-row>
  </ex-list-item>
</template>
<script>
import ExIconButton from '../IconButton'
import getActivityIconProps from '../../lib/utils/getActivityIconProps'

export default {
  name: 'ex-activity-list-item',
  components: {ExIconButton},
  props: {
    sets: {
      type: [Number, String],
      default: undefined,
    },
    reps: {
      type: [Number, String],
      default: undefined,
    },
    activity: {
      type: Object,
      required: true,
    },
    showDuration: {
      type: Boolean,
      default: true,
    },
    showImage: {
      type: Boolean,
      default: true,
    },
    showItems: {
      type: Boolean,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    flat: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const imageResource = this.activity.activity_resources && this.activity.activity_resources.find(
      ({file}) => ['jpg', 'jpeg', 'gif', 'png'].includes(file.type)
    )
    return {
      imageSource: imageResource && `${process.env.apiUrl}/files/${imageResource.file.id}?view=true`
    }
  },
  computed: {
    activityImageAsset() {
      return this.activity.Assets.find(({type, isPrimary}) => isPrimary && type === 'IMAGE');
    },
    iconProps() {
      return getActivityIconProps(this.activity.type)
    },
  },
  methods: {
    goTo(path) {
      this.$router.push({path});
    },
  }
}
</script>
