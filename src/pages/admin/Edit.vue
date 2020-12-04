<template>
  <div id="UpdateAdmin">
    <Form/>
  </div>
</template>

<script>
import Form from './Form'
import store from '@/store'
export default {
  name: 'Edit',
  beforeRouteEnter: async (to, from, next) => {
    console.log(store.getters.profile.data.id)
    // const respDetail = await Admin.find(store.getters.profile.data.id)
    const respDetail = {
      name: 'duy_dev',
      login_id: 'superadmin'
    }
    to.meta['detail'] = respDetail
    return next()
  },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
