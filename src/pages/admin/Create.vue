<template>
  <div id="CreateAdmin">
    <Form/>
  </div>
</template>

<script>
import Form from './Form'
import Role from '@/models/Role'

export default {
  name: 'Create',
  components: { Form },

  async beforeRouteEnter (to, from, next) {
    const respRole = await Role.all({
      query: {
        per_page: 0
      }
    })
    to.meta['role'] = respRole.data
    return next()
  }
}
</script>

<style scoped>

</style>
