<template>
  <div id="DuplicatePush">
    <Form/>
  </div>
</template>

<script>
import Push from '@/models/Push'
import PushCategory from '@/models/PushCategory'
import Form from './Form'
import {pick} from 'lodash-es'

export default {
  name: 'Duplicate',

  data () {
    return {
      detail: null
    }
  },

  components: {
    Form
  },

  beforeRouteEnter: async (to, from, next) => {
    const respPushCategory = await PushCategory.all()
    const push = await Push.find(to.params['id'], {
      query: {
        include: 'pushCategory,prefectures'
      }
    })

    const detail = pick(push.data, ['company_id', 'min_age', 'max_age', 'prefecture_id', 'gender'])
    console.log(detail)
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
    to.meta['pushCategories'] = respPushCategory.data
    to.meta['detail'] = push.data

    return next()
  }
}
</script>

<style scoped>

</style>
