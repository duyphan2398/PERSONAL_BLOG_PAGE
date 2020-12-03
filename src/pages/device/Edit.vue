<template>
  <div id="UpdateDevice">
    <Form :detail="model"/>
  </div>
</template>

<script>
import Form from './Form'

export default {
  name: 'Edit',
  // beforeRouteEnter: async (to, from, next) => {
  //
  //   return next()
  // },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
