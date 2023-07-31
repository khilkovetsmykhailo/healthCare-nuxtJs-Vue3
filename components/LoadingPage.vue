<template>
  <div class="mt-5 py-5 text-center">
    <img
      src="/images/logo.png"
      class="mb-2"
      width="300"
      alt="Demo Health"
      title="Loading..."
    />
    <ex-loading>
      <slot/>
    </ex-loading>
  </div>
</template>

<script>
export default {
  name: 'LoadingPage',
}
</script>
