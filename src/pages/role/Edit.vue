<template>
  <div id="UpdateRole">
    <Form/>
  </div>
</template>

<script>
import Role from '@/models/Role'
import Permission from '@/models/Permission'
import Form from './Form'

export default {
  name: 'Edit',

  components: {
    Form
  },

  beforeRouteEnter: async (to, from, next) => {
    // Get Detail
    const respDetail = await Role.find(to.params['id'], {
      query: {
        include: 'permissions'
      }
    })
    // Get Permission
    const respPermission = await Permission.all({
      query: {
        per_page: 0,
        'sortBy[name]': 'asc'
      }
    })

    to.meta['detail'] = respDetail.data
    to.meta['permission'] = respPermission.data

    return next()
  }
}
</script>

<style scoped>

</style>
