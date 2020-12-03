<template>
  <div id="UpdatePush">
    <Form/>
  </div>
</template>

<script>
import Push from '@/models/Push'
import Form from './Form'
import {pick} from 'lodash-es'
export default {
  name: 'Edit',

  data () {
    return {
      detail: null
    }
  },

  components: {
    Form
  },

  beforeRouteEnter: async (to, from, next) => {
    const push = await Push.find(to.params['id'])

    const detail = pick(push.data, ['min_age', 'max_age'])

    const filter = {}
    for (let property in detail) {
      filter[`filters[${property}]`] = detail[property]
    }

    const pushCount = await Push.count({
      query: {
        ...filter
      }
    })

    to.meta['pushCount'] = pushCount.data.count
    to.meta['detail'] = push.data

    return next()
  }
}
</script>

<style scoped>

</style>
