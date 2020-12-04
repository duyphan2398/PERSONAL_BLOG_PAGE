import store from '@/store'

export const LoginGuard = (to, from, next) => {
  if (store.state.token) {
    next({ name: 'cms.admin.edit' })
    return
  }
  next()
}
