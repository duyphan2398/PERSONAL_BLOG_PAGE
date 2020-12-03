<template>
  <div id="UpdateAdmin">
    <Form/>
  </div>
</template>

<script>
import Form from './Form'
import Admin from '@/models/Admin'
import Role from '@/models/Role'

export default {
  name: 'Edit',
  beforeRouteEnter: async (to, from, next) => {
    const respDetail = await Admin.find(to.params['id'], {
      query: {
        'include': 'roles'
      }
    })
    const respRole = await Role.all({
      query: {
        per_page: 0
      }
    })
    to.meta['detail'] = respDetail
    to.meta['role'] = respRole.data

    return next()
  },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
