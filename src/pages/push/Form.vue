<template>
  <div class="push-section">
    <!--Form-->
    <ValidationObserver tag="form"
                        ref="observer"
                        @submit.prevent="validateBeforeSubmit()">
      <div class="row justify-content-center">
        <div class="col-xs-4 col-sm-4">
          <a-card class="card-common">
            <div class="card-status-top bg-warning"></div>

            <div class="row">
              <!--Corporate Name-->
              <!--<InputCategory v-model="searchForm.corporate_name"
                                  class="mb-3"
                                  vid="corporate_name_id"
                                  label="corporate_name"
                                  @change="getPushCount"
                                  :options="optionsCorporateName"/>-->

              <!--Hall Name-->
              <!--<InputCategory v-model="searchForm.hall_name"
                                  class="mb-3"
                                  vid="hall_name_id"
                                  label="hall_name"
                                  @change="getPushCount"
                                  :options="optionsHallName"/>-->

              <!--Sale In Charge-->
              <!--<InputCategory v-model="searchForm.sale_in_charge"
                                  class="mb-3"
                                  vid="sale_in_charge_id"
                                  label="sale_in_charge"
                                  @change="getPushCount"
                                  :options="optionsSaleInChare"/>-->

              <!--Account Type-->
              <InputAccountType v-model="searchForm.account_type"
                                 class="col-xs-12 mb-3"
                                 vid="account_type"
                                 @change="getPushCount"
                                 label="account_type"/>

              <!--Is active-->
              <InputSwitch v-model="isAutoSearch"
                           class="col-xs-12"
                           label="change_count_now"/>
            </div>

            <template slot="actions" class="ant-card-actions" v-if="!isAutoSearch">
              <button @click.prevent="onHandleSearch" type="button" class="btn btn-primary btn-block">
                <a-icon type="search" class="mr-1"/>

                {{ $t('btn_search') }}
              </button>
            </template>
          </a-card>
        </div>

        <div class="col-xs-8 col-sm-8">
          <div id="pushTargetBox" class="box small-box bg-yellow mb-3">
            <div class="inner ant-row-flex-middle">
              <h3 class="d-inline-block m-0" id="pushTarget">{{ pushCount }}</h3>

              <p class="d-inline-block mb-3">{{ $t('push_count_content') }}</p>
            </div>

            <div id="loading" class="overlay" style="display: none">
              <i class="fa fa-refresh fa-spin"></i>
            </div>
          </div>

          <a-card class="card-common" style="padding-bottom: 3px">
            <div class="card-status-top bg-warning"></div>

            <div class="row">
              <!--Push datetime-->
              <InputDatePicker v-model="form.datetime"
                               class="col-md-6 mb-3"
                               vid="push_datetime"
                               rules="required"
                               label="field_push_datetime"
                               :show-time="true"
                               formatDate="YYYY-MM-DD HH:mm"
                               :disabledDate="disabledDate"
                               :disabledTime="disabledDateTime"
                               :required="true"
                               :placeholder="$t('placeholder_birthday')"/>

              <!--Push message-->
              <InputTextArea v-model="form.message"
                             class="mb-3"
                             rules="required|max:50"
                             vid="push_message"
                             label="field_push_message"
                             :rows="4"
                             :required="true"/>

              <!--URL-->
              <InputText v-model="form.url"
                         class="col-xs-12 mb-3"
                         rules="max:200|format_url"
                         vid="push_url"
                         label="field_push_url"/>

              <!--Is active-->
              <InputSwitch v-model="form.is_active"
                           class="col-xs-12"
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
                      v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_PUSH) : hasPermissionAction(PERMISSIONS.CREATE_PUSH)"
                      :disabled="form.datetime && form.datetime < currentDate && $route.name === 'push.edit'"
                      class="btn btn-success float-right mr-1"
                      :class="{'btn-loading disabled': isSubmit}">
                <a-icon type="save" class="mr-1"/>
                {{$route.name === 'push.edit' ? $t('btn_update') : $t('btn_save')}}
              </button>
            </div>
          </a-card>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>

import Push from '@/models/Push'
import store from '@/store'
import Form from '@/mixins/form.mixin'
import InputCategory from '@/components/form/InputCategory'
import InputText from '@/components/form/InputText'
import InputSwitch from '@/components/form/InputSwitch'
import InputTextArea from '@/components/form/InputTextArea'
import InputCategoryMulti from '@/components/form/InputCategoryMulti'
import InputDatePicker from '@/components/form/InputDatePicker'
import InputAccountType from '@/components/form/InputAccountType'
import { forEach, pickBy, pick, debounce, remove } from 'lodash-es'
import moment from 'moment'

export default {
  name: 'Form',

  components: {
    InputTextArea,
    InputSwitch,
    InputText,
    InputCategory,
    InputCategoryMulti,
    InputDatePicker,
    InputAccountType
  },

  data () {
    return {
      dateRange: [],
      list_corporate_name: [],
      list_hall_name: [],
      list_sale_in_charge: [],
      searchForm: {
        corporate_name: '',
        hall_name: '',
        sale_in_charge: '',
        account_type: 1
      },
      form: {
        datetime: '',
        message: '',
        url: '',
        is_active: true
      },
      pushCount: 0,
      isSubmit: false,
      currentDate: moment().format('YYYY-MM-DD HH:mm').toString(),
      isAutoSearch: true
    }
  },

  mixins: [Form],

  created () {
    // this.list_corporate_name = this.$route.meta['corporate_name']
    // this.list_hall_name = this.$route.meta['hall_name']
    // this.list_sale_in_charge = this.$route.meta['sale_in_charge']
    this.list_corporate_name = [{id: 1, corporate_name: '選択肢1'}, {id: 2, corporate_name: '選択肢2'}, {id: 3, corporate_name: '選択肢3'}]
    this.list_hall_name = [{id: 1, hall_name: '選択肢1'}, {id: 2, hall_name: '選択肢2'}, {id: 3, hall_name: '選択肢3'}]
    this.list_sale_in_charge = [{id: 1, sale_in_charge: '選択肢1'}, {id: 2, sale_in_charge: '選択肢2'}, {id: 3, sale_in_charge: '選択肢3'}]

    if ('id' in this.$route.params && (this.$route.name === 'push.edit' || this.$route.name === 'push.duplicate')) {
      this.form = {
        ...this.form,
        ...this.$route.meta['detail']
      }
      this.searchForm = pick(this.form, ['corporate_name', 'hall_name', 'sale_in_charge', 'account_type'])
      this.pushCount = this.$route.meta['pushCount']
    }

    this.getPushCount(true)
  },

  computed: {
    currentUser () {
      return store.getters.profile.data
    },

    optionsCorporateName () {
      return {
        data: this.list_corporate_name,
        id: 'id',
        key: 'corporate_name'
      }
    },

    optionsHallName () {
      return {
        data: this.list_hall_name,
        id: 'id',
        key: 'hall_name'
      }
    },

    optionsSaleInChare () {
      return {
        data: this.list_sale_in_charge,
        id: 'id',
        key: 'sale_in_charge'
      }
    }
  },

  methods: {
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },

    disabledDate (current) {
      // Can not select days before today
      return current && current < moment().endOf('day').subtract(1, 'days')
    },

    disabledDateTime (date) {
      return {
        disabledHours: () => remove(this.range(0, 23), item => item < moment().hour()),
        disabledMinutes: () => {
          const currentHour = moment().hour()
          const currentMinute = moment().minutes()
          const selectedHour = date ? date.hour() : currentHour

          return selectedHour > currentHour ? [] : remove(this.range(0, 59), item => item < currentMinute)
        },
        disabledSeconds: () => []
      }
    },

    async getPushCount (isCallApi = false) {
      isCallApi = !this.isAutoSearch ? isCallApi : this.isAutoSearch
      if (!isCallApi) {
        return
      }

      const filter = {}

      for (let property in this.searchForm) {
        filter[`filters[${property}]`] = this.searchForm[property]
      }

      debounce(async () => {
        const resp = await Push.count({
          query: {
            ...filter
          }
        })
        this.pushCount = resp.data.count
      }, 1000)()
    },

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        await this.handleSubmit()
      }
    },

    handleSubmit () {
      this.isSubmit = true
      let data = { ...this.form, ...this.searchForm }

      if (this.$route.name === 'push.edit') {
        this.updatePush(this.$route.params.id, data)
      } else {
        this.createPush(data)
      }
    },

    async updatePush (id, data) {
      try {
        await Push.update(id, data)

        await this.onSuccess(this.$t('message_success'), this.$t('update_message_successfully'))

        await this.$router.push({ name: 'push.index' })
      } catch (err) {
        this.isSubmit = false
      }
    },

    async createPush (data) {
      try {
        const resp = await Push.create(data)

        if (resp && Object.keys(resp).length) {
          await this.onSuccess(this.$t('message_success'), this.$t('create_message_successfully'))

          await this.$router.push({ name: 'push.index' })
        }
      } catch (err) {
        forEach(err.response.data.errors, (item, keyErr) => {
          pickBy(this.$refs.observer.errors, (value, key) => {
            if (keyErr === key) {
              value.push(item[0])
              this.isSubmit = false
            }
          })
        })
        throw err
      }
    },

    onCancel () {
      return this.$router.push({ name: 'push.index' })
    },

    onHandleSearch () {
      this.getPushCount(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    border-top: 3px solid #d2d6de;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  .small-box {
    display: block;

    .inner {
      padding: 10px;
    }

    h3 {
      font-size: 38px;
      font-weight: bold;
      margin: 0;
      white-space: nowrap;
      padding: 0 0 0 15px;
      z-index: 5;
      color: #ffffff;
    }

    p {
      z-index: 5;
      font-size: 15px;
      color: #ffffff;
    }

    &.icon {
      transition: all .3s linear;
      position: absolute;
      top: -10px;
      right: 10px;
      z-index: 0;
      font-size: 90px;
      color: rgba(0, 0, 0, 0.15);
    }
  }

  .bg-yellow {
    background-color: #f39c12;
  }
</style>
