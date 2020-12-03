<template>
  <ValidationObserver tag="form"
                      ref="observer"
                      @submit.prevent="validateBeforeSubmit()">
    <!--Card Field-->
    <a-card class="card-common">
      <div class="card-status-top bg-warning"></div>
      <!--Form-->

      <div class="row">
        <!--Name role-->
        <InputText v-model="form.name"
                   class="col-md-6 mb-3"
                   rules="required|max:50"
                   vid="name"
                   label="field_role_name"
                   :disabledInput="$route.name ==='role.edit'"
                   :required="true"/>

        <!--Display name role-->
        <InputText v-model="form.display_name"
                   class="col-md-6 mb-3"
                   rules="required|max:50"
                   vid="display_name"
                   label="field_role_display_name"
                   :required="true"/>

        <!--Description-->
        <InputText v-model="form.description"
                   class="col-md-6 mb-3"
                   vid="description"
                   label="field_role_description"/>
      </div>
    </a-card>

    <!--Card Google Map API-->
    <a-card class="card-common">
      <div class="card-status-top bg-primary"></div>
        <a-transfer
            show-search=""
            :filter-option="filterOption"
            :list-style="{ width: '47%', height: '30rem'}"
            :data-source="list_permission"
            :titles="[$t('available_permission'), $t('selected_permission')]"
            :target-keys="targetKeys"
            :render="permission => permission.title"
            :disabled="$route.name ==='role.edit' && $route.meta['detail'].name === 'super-admin'"
            @change="handleChange"
        />
        <!--Message Error For Permission-->
        <span v-if="errors.permission && targetKeys.length === 0"
              class="error_permission">
          {{ errors.permission }}
        </span>
    </a-card>

    <!-- Action Section Submit & Cancel -->
    <div class="card-footer fixed-bottom bg-light shadow">
      <button type="button"
              class="btn btn-default float-right"
              @click="onCancel">
        <a-icon type="stop" class="mr-1"/>
        <span>{{ $t('btn_cancel') }}</span>
      </button>

      <button type="submit"
              v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_ROLE) : hasPermissionAction(PERMISSIONS.CREATE_ROLE)"
              :disabled="$route.name ==='role.edit' && $route.meta['detail'].name === 'super-admin'"
              class="btn btn-success float-right mr-1"
              :class="{'btn-loading disabled': isSubmit}">
        <a-icon type="save" class="mr-1"/>
        {{this.$route.name === 'role.edit' ? $t('btn_update') : $t('btn_save')}}
      </button>
    </div>
  </ValidationObserver>
</template>

<script>

import Role from '@/models/Role'
import store from '@/store'
import Form from '@/mixins/form.mixin'
import InputText from '@/components/form/InputText'
import InputCategory from '@/components/form/InputCategory'
import {forEach, pickBy, lowerCase, map} from 'lodash-es'

export default {
  name: 'Form',

  components: {
    InputCategory,
    InputText
  },

  data () {
    return {
      list_permission: [],
      targetKeys: [],
      form: {
        name: '',
        display_name: '',
        description: '',
        permissions: []
      },
      errors: {
        permission: ''
      },
      isSubmit: false
    }
  },

  mixins: [Form],

  created () {
    this.list_permission = map(this.$route.meta['permission'], (item) => {
      return {
        key: item.id,
        title: this.$t(item.display_name),
        name: item.name,
        description: item.description
      }
    })
    if ('id' in this.$route.params && this.$route.name === 'role.edit') {
      this.form = Object.assign(this.form, {
        ...this.$route.meta['detail']
      })

      if (this.form.permissions) {
        this.targetKeys = this.form.permissions.map(permission => permission.id)
      }
    }
  },

  computed: {
    currentUser () {
      return store.getters.profile.data
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
      let data = this.form
      data.permissions = [...this.targetKeys]
      if (data.permissions.length === 0) {
        this.errors.permission = this.$t('validate_role_permissions')
        return false
      }
      this.isSubmit = true

      if (this.$route.name === 'role.edit') {
        this.updateRole(data)
      } else {
        this.createRole(data)
      }
    },

    async updateRole (data) {
      try {
        const resp = new Role(data)
        await resp.save()

        await this.onSuccess(this.$t('message_success'), this.$t('update_message_successfully'))

        await this.$router.push({name: 'role.index'}).catch(_ => {
        })
      } catch (err) {
        this.checkErrorsAPI(err)
        this.isSubmit = false
      }
    },

    async createRole (data) {
      try {
        const resp = await Role.create(data)

        if (resp && Object.keys(resp).length) {
          await this.onSuccess(this.$t('message_success'), this.$t('create_message_successfully'))

          this.$router.push({name: 'role.index'}).catch(_ => {})
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
      return this.$router.push({ name: 'role.index' })
    },

    filterOption (inputValue, option) {
      if (!inputValue) return false

      const lowercase = lowerCase(option.title)
      return lowercase.indexOf(lowerCase(inputValue)) > -1
    },

    handleChange (nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys
    }
  }
}
</script>

<style scoped>
  .error_permission {
    color: #cd201f;
    padding: 5px 0px 0px;
    display: block;
    font-size: 12px;
  }
</style>
