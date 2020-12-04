<template>
  <div>
    <Nav  @logout-event="logout"/>
    <div class="page">
      <!--<Header/>-->
      <div class="content">
        <div class="container">
          <Child/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Child from '@/components/Child'
import Admin from '@/models/Admin'
import store from '@/store'
import * as types from '@/store/mutation-types'

export default {
  name: 'Default',
  components: {
    Nav,
    Child
  },
  methods: {
    async logout () {
      try {
        await Admin.logout()
      } catch (e) {}
      store.commit(types.LOG_OUT)
      await this.$router.push({ name: 'cms.login' })
    }
  }
}
</script>

<style scoped>

</style>
