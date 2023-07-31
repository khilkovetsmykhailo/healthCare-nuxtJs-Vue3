<template>
  <ex-step
    title="Upload Files"
    description="Please add at least one image file and one audio file below."
    :next-step-disabled="files.length <= 0"
    has-skip-step
    skip-step-text="Create Another Activity"
    :skip-step-disabled="files.length <= 0"
    next-step-text="View Activity"
    @back="$emit('back')"
    @submit="$emit('next')"
    @skip="$emit('skip')"
  >
    <ex-editable-activity-files />
  </ex-step>
</template>
<script>
import ExEditableActivityFiles from '../../editable/EditableActivityFiles'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ex-step-physical-activity-details',
  components: { ExEditableActivityFiles },
  computed: {
    ...mapState('activities/activity', ['activity']),
    ...mapGetters('activities/activity', ['files'])
  },
}
</script>
