import Admin from '@/models/Admin'
import store from '@/store'
import * as types from '@/store/mutation-types'
import isEmpty from 'lodash-es/isEmpty'

export const AuthGuard = async (to, from, next) => {
  if (!store.getters.hasToken) {
    next({ name: 'cms.login' })
    return
  }

  try {
    const profile = await Admin.profile()
    if (isEmpty(profile)) {
      next({ name: 'cms.login' })
      return
    }
    store.commit(types.SET_PROFILE, { profile })
    console.log(store.getters.profile.data.id)
    next()
  } catch (e) {
    store.commit(types.LOG_OUT)
    next({ name: 'cms.login' })
    throw e
  }
}
