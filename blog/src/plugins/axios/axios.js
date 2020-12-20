import axios from 'axios'
import router from '@/router'

const instance = axios.create()
instance.defaults.baseURL = process.env.API_ENDPOINT
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Interceptors

instance.interceptors.response.use(response => response,
  async (error) => {
    // Do something with response error
    let { status } = error.response

    if ([403, 404, 429].includes(status)) {
      router.app.$notification.error(
        {
          message: router.app.$t('message_error'),
          description: router.app.$t(`error_${status}_content`)
        }
      )

      return Promise.reject(error)
    }

    if ([400].includes(status)) {
      router.app.$notification.error(
        {
          message: router.app.$t('message_error'),
          description: error.response.data.errors ? error.response.data.errors[0].message : router.app.$t(`error_${status}_content`)
        }
      )

      return Promise.reject(error)
    }

    // Redirect to Error Page
    const isRoute = router.resolve({ name: `error.${status}` })
    if (isRoute && isRoute.resolved.path !== '/') {
      await router.push({ name: `error.${status}` })
    }

    return Promise.reject(error)
  }
)

export default instance
