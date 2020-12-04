<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <!--Form-->
    <ValidationObserver tag="form"
                        ref="observer"
                        @submit.prevent="validateBeforeSubmit()">
      <div class="row">
        <!--Admin name-->
        <InputText v-model="form.name"
                   class="col-md-6 col-xs-12 mb-3"
                   rules="required|max:100"
                   vid="name"
                   label="field_admin_name"
                   :required="true"/>

        <!--Login ID-->
        <InputText v-model="form.login_id"
                   class="col-md-6 col-xs-12 mb-3"
                   rules="required|alpha_dot|min:4|max:100"
                   vid="login_id"
                   label="field_admin_login_id"
                   :required="true"/>

        <InputSwitch v-model="changePassword"
                     class="col-md-12 col-xs-12 mb-3"
                     @change="changePasswordAction"
                     label="field_admin_change_password"/>

        <template v-if="changePassword">
          <!--Login password-->
          <InputText v-model="form.password"
                     class="col-md-6 col-xs-12 mb-3"
                     rules="half_alphabet|min:6|max:100"
                     type="password"
                     vid="password"
                     label="field_admin_login_password"/>
          <!--Login password confirm-->
          <InputText v-model="form.password_confirmation"
                     class="col-md-6 col-xs-12 mb-3"
                     rules="confirmed:password"
                     type="password"
                     vid="password_confirmation"
                     label="field_admin_login_password_confirmation"/>
        </template>
      </div>

      <!-- Action Section Submit & Cancel -->
      <div class="card-footer fixed-bottom bg-light shadow">
        <button type="button"
                class="btn btn-default float-right"
                @click="onCancel">
          <a-icon type="stop" class="mr-1"/>
          <span>{{ $t('btn_cancel') }}</span>
        </button>

        <button type="submit"
                class="btn btn-success float-right mr-1"
                :class="{'btn-loading disabled': isSubmit}">
          <a-icon type="save" class="mr-1"/>
          {{this.$route.name === 'cms.admin.edit' ? $t('btn_update') : $t('btn_save')}}
        </button>
      </div>
    </ValidationObserver>
  </a-card>
</template>

<script>

import Admin from '@/models/Admin'
import Form from '@/mixins/form.mixin'
import InputCategory from '@/components/form/InputCategory'
import InputText from '@/components/form/InputText'
import InputSwitch from '@/components/form/InputSwitch'
import {forEach, pickBy} from 'lodash-es'
import store from '@/store'

export default {
  name: 'Form',

  components: {
    InputSwitch,
    InputText,
    InputCategory
  },

  data () {
    return {
      detail: {},
      changePassword: false,
      form: {
        name: '',
        login_id: '',
        password: '',
        password_confirmation: ''
      },
      isSubmit: false
    }
  },

  mixins: [Form],

  created () {
    this.detail = {...this.$route.meta['detail']}

    if (this.$route.name === 'cms.admin.edit') {
      this.form = Object.assign(this.form, {
        ...this.detail
      })
    }
  },

  computed: {
    currentUser () {
      return store.getters.profile.data
    }
  },

  methods: {
    changePasswordAction () {
      this.password = this.password_confirmation = ''
    },

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true
      let data = this.form

      if (this.$route.name === 'cms.admin.edit') {
        this.updateAdmin(data)
      } else {
        this.createAdmin(data)
      }
    },

    async updateAdmin (data) {
      try {
        const resp = new Admin(data)
        await resp.save()

        await this.onSuccess(this.$t('message_success'), this.$t('update_message_successfully'))

        await this.$router.push({name: 'admin.index'}).catch(_ => {
        })
      } catch (err) {
        this.checkErrorsAPI(err)
        this.isSubmit = false
      }
    },

    checkErrorsAPI (err) {
      forEach(err.response.data.errors, (item) => {
        pickBy(this.$refs.observer.errors, (value, key) => {
          if (item.field === key) {
            value.push(item.message)
            this.isSubmit = false
          }
        })
      })
    },

    onCancel () {
      return this.$router.push({name: 'admin.index'})
    }
  }
}
</script>

<style scoped>

</style>
