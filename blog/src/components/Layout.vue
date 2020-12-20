<template>
  <div class="Layout">
    <Nav></Nav>

    <slot>
      <router-view v-if="true"/>
    </slot>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  name: 'Layout',
  components: {
    Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
