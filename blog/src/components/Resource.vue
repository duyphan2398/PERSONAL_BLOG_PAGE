<template>
  <div id="Resource">
    <slot>
      <router-view v-if="true"/>
    </slot>
  </div>
</template>

<script>

export default {
  name: 'Resource',
  components: {
  }
}
</script>

<style scoped>
  .page-title {
    font-size: calc(1.3rem + 0.6vw);
    font-weight: 500;
  }
</style>
