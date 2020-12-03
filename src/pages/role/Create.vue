<template>
  <div id="CreateRole">
    <Form/>
  </div>
</template>

<script>
import Permission from '@/models/Permission'
import Form from './Form'

export default {
  name: 'Create',

  components: { Form },

  async beforeRouteEnter (to, from, next) {
    // Get Permission
    const respPermission = await Permission.all({
      query: {
        per_page: 0,
        'sortBy[name]': 'asc'
      }
    })

    to.meta['permission'] = respPermission.data

    return next()
  }
}
</script>

<style scoped>

</style>
