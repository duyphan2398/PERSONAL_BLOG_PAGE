<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <!--Form-->
    <ValidationObserver tag="form"
                        ref="observer"
                        @submit.prevent="validateBeforeSubmit()">
      <div class="row">
        <!--Admin roles-->
        <InputCategory v-model="form.role_id"
                       class="col-md-6 col-xs-12 mb-3"
                       rules="required"
                       vid="role_id"
                       label="field_admin_role_display_name"
                       :options="optionsRole"
                       :required="true"/>

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
                   :disabledInput="$route.name === 'admin.edit'"
                   :required="true"/>

        <template v-if="$route.name === 'admin.edit'">
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

        <template v-else>
          <!--Login password ( required )-->
          <InputText v-model="form.password"
                     class="col-md-6 col-xs-12 mb-3"
                     rules="required|half_alphabet|min:6|max:100"
                     type="password"
                     vid="password"
                     label="field_admin_login_password"
                     :required="true"/>

          <!--Login password confirm-->
          <InputText v-model="form.password_confirmation"
                     class="col-md-6 col-xs-12 mb-3"
                     rules="confirmed:password"
                     type="password"
                     vid="password_confirmation"
                     label="field_admin_login_password_confirmation"/>
        </template>

        <!--Is active-->
        <InputSwitch v-model="form.is_active"
                     class="col-md-6 col-xs-12 mb-3"
                     label="text_active"/>
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
                v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_ADMIN) : hasPermissionAction(PERMISSIONS.CREATE_ADMIN)"
                class="btn btn-success float-right mr-1"
                :class="{'btn-loading disabled': isSubmit}">
          <a-icon type="save" class="mr-1"/>
          {{this.$route.name === 'admin.edit' ? $t('btn_update') : $t('btn_save')}}
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
      list_role: [],
      list_companies: [],
      detail: {},
      form: {
        role_id: '',
        name: '',
        login_id: '',
        password: '',
        password_confirmation: '',
        is_active: true
      },
      isSubmit: false
    }
  },

  mixins: [Form],

  created () {
    this.list_role = this.$route.meta['role']
    this.detail = {...this.$route.meta['detail']}

    if ('id' in this.$route.params && this.$route.name === 'admin.edit') {
      this.form = Object.assign(this.form, {
        role_id: this.detail.roles ? this.detail.roles.id : '',
        ...this.detail
      })
    }
  },

  computed: {
    currentUser () {
      return store.getters.profile.data
    },

    optionsRole () {
      return {
        data: this.list_role,
        id: 'id',
        key: 'display_name'
      }
    }
  },

  methods: {
    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true
      let data = this.form

      if (this.$route.name === 'admin.edit') {
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

    async createAdmin (data) {
      try {
        const resp = await Admin.create(data)

        if (Object.keys(resp).length) {
          await this.onSuccess(this.$t('message_success'), this.$t('create_message_successfully'))

          this.$router.push({name: 'admin.index'}).catch(_ => {})
        }
      } catch (err) {
        this.checkErrorsAPI(err)
        this.isSubmit = false
        throw err
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
