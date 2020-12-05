<template>
  <div class="flex-fill d-flex flex-column justify-content-center" v-if="layout === 'auth'">
    <div class="container-tight py-6">
      <div class="text-center mb-4">
        <img src="../assets/images/logo_tnguyen.png" style="max-width: 320px;">
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(login)" class="card card-md" novalidate>
          <div class="card-body">
            <ValidationProvider name="validate_login_id"
                                rules="required"
                                v-slot="{ errors }"
            >
              <div class="mb-3">
                <label for="login_id" class="form-label">{{ $t('field_login_id') }}</label>
                <input :class="{'is-invalid': errors.length }"
                       autocomplete="off"
                       class="form-control"
                       type="text"
                       v-model.trim="form.login_id"
                       id="login_id"
                />

                <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider name="validate_login_password"
                                rules="required"
                                v-slot="{ errors }">
              <div class="mb-2">
                <label for="login_password" class="form-label">{{ $t('field_login_password') }}</label>
                <input :class="{'is-invalid': errors.length }"
                       class="form-control"
                       v-model.trim="form.password"
                       type="password"
                       id="login_password"
                />

                <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <div class="form-footer">
              <button class="btn btn-primary btn-block btn-login" :disabled="isSubmit" :class="{'btn-loading disabled': isSubmit}"
                      type="submit">
                {{ $t('btn_login') }}
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>

      <!-- ERROR -->
      <div v-if="error" class="card card-sm rounded shadow">
        <div class="card-body bg-red-lt">
          <div class="row align-items-center justify-content-center">
            <div class="col-12 text-center" style="font-size: 1rem">
              <i class="fe fe-alert-triangle ml-0"/>

              <span v-text="error"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/mutation-types'
import store from '@/store'
import Admin from '@/models/Admin'

export default {
  name: 'Login',
  data () {
    return {
      hidePassword: true,
      isSubmit: false,
      form: {
        login_id: 'superadmin',
        password: '123123123'
      },
      error: null
    }
  },
  created () {
    console.log('login')
  },
  computed: {
    layout () {
      return this.$store.state.layout
    }
  },

  methods: {

    async login () {
      this.isSubmit = true

      try {
        const resp = await Admin.login(this.form)
        store.commit(types.SET_TOKEN, resp.access_token)
        const profile = await Admin.profile()
        store.commit(types.SET_PROFILE, { profile })
        console.log(profile.data.id)
        await this.$router.push({ name: 'admin.edit', params: { id: profile.data.id } })
      } catch (error) {
        this.isSubmit = false
      }
    }
  }
}
</script>

<style scoped>
  .login-error {
    width: 100%;
    margin-top: .25rem;
    font-size: 87.5%;
    color: #cd201f;
  }
</style>
