import Vue from 'vue'
import Router from 'vue-router'
import { routes } from '@/router/routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})


/**
 * Global Before Guards
 *
 * @param to
 * @param from
 * @param next
 * @returns {Promise<void>}
 */
const beforeEach = async (to, from, next) => {
  router.app.$Progress.start()
  next()
}

/**
 * Global After Hooks
 *
 * @returns {Promise<void>}
 */
const afterEach = async () => {
  router.app.$Progress.finish()
}

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
