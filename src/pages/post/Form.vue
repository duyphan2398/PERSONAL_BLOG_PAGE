<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>
    <!--Form-->
    <ValidationObserver tag="form"
                        ref="observer"
                        @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <!--news_title-->
        <InputText v-model="form.title"
                   class="col-md-6 mb-3"
                   rules="required|max:100"
                   vid="news_title"
                   label="field_notice_title"
                   :required="true"/>

        <!--publish_datetime-->
        <InputDateRange v-model="dateRange"
                        class="col-md-6 mb-3"
                        label="field_notice_duration"
                        rules="required"
                        formatDate="YYYY-MM-DD HH:mm"
                        :required="true"/>

        <!--News text-->
        <InputHtmlEditor v-model="form.text"
                         rules="required|max:10000"
                         vid="text"
                         label="field_notice_text"
                         class="col-md-12 mb-3"
                         :required="true"/>

        <!--Thumbnail-->
        <ValidationProvider tag="div"
                            :name="$t('field_notice_thumbnail')"
                            class="mb-3"
                            rules=""
                            v-slot="{ errors }">
          <label class="form-label">{{ $t('field_notice_thumbnail') }}</label>

          <div class="form-control-plaintext">
            <a-popconfirm
                :title="$t('confirm_delete_content')"
                :ok-text="$t('confirm_yes')"
                :cancel-text="$t('confirm_no')"
                @confirm="deleteImage">
              <button type="button" class="btn btn-link p-0">
                <XCircleIcon  class="text-danger" size="22"/>
              </button>
            </a-popconfirm>
            <img class="img-fluid rounded object-cover mb-3 img-thumbnail-150 border border-light"
                 :src="imageShow"
                 alt=""
            />
            <input :value="form.thumbnail" :class="{'is-invalid': errors.length }" hidden>
            <!-- Selected image -->
            <ImageUpload @onUploadImage="onUploadImage" style="width: 150px"/>
            <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!--Is active-->
        <InputSwitch v-model="form.is_active"
                     class="col-md-1 mb-3"
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
                v-if="$route.params.id ? hasPermissionAction(PERMISSIONS.UPDATE_NOTICE) : hasPermissionAction(PERMISSIONS.CREATE_NOTICE)"
                class="btn btn-success float-right mr-1"
                :class="{'btn-loading disabled': isSubmit}">
          <a-icon type="save" class="mr-1"/>
          {{this.$route.name === 'notice.edit' ? $t('btn_update') : $t('btn_save')}}
        </button>
      </div>
    </ValidationObserver>
  </a-card>
</template>

<script>
import { XCircleIcon } from 'vue-feather-icons'
import Notice from '@/models/Notice'
import store from '@/store'
import Form from '@/mixins/form.mixin'
import InputText from '@/components/form/InputText'
import InputCategory from '@/components/form/InputCategory'
import InputTextArea from '@/components/form/InputTextArea'
import InputSwitch from '@/components/form/InputSwitch'
import InputDateRange from '@/components/form/InputDateRange'
import InputCategoryMulti from '@/components/form/InputCategoryMulti'
import { forEach, pickBy, forOwn } from 'lodash-es'
import InputHtmlEditor from '@/components/form/InputHtmlEditor'
import SelectFile from '@/components/file/SelectFile'
import ImageUpload from '@/components/file/ImageUpload'

export default {
  name: 'Form',

  components: {
    ImageUpload,
    SelectFile,
    InputHtmlEditor,
    InputSwitch,
    InputTextArea,
    InputCategory,
    InputText,
    InputDateRange,
    InputCategoryMulti,
    XCircleIcon
  },

  data () {
    return {
      dateRange: [],
      form: {
        title: '',
        publish_start_datetime: '',
        publish_end_datetime: '',
        thumbnail: '',
        text: '',
        display_type: 'no',
        is_active: true,
        is_pushed: true,
        is_preview: false
      },
      isSubmit: false,
      imageShow: '',
      fileUploads: ''
    }
  },

  mixins: [Form],

  created () {
    if ('id' in this.$route.params && this.$route.name === 'notice.edit') {
      this.form = Object.assign(this.form, {
        ...this.$route.meta['detail']
      })

      this.dateRange = [this.form.publish_start_datetime, this.form.publish_end_datetime]
    }

    this.imageShow = this.form.thumbnail || require('../../assets/images/dummy_image.png')
    this.previewFile(this.imageShow, this.form.thumbnail)
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
      this.isSubmit = true
      let data = {...this.form}
      const formData = new FormData()

      data.publish_start_datetime = this.dateRange[0]
      data.publish_end_datetime = this.dateRange[1]
      data.is_active = +this.form.is_active
      data.is_pushed = +this.form.is_pushed
      data.is_preview = +this.form.is_preview

      forOwn(data, (value, key) => {
        if (key !== 'thumbnail') {
          formData.append(key, value)
        }
      })

      if (this.$route.name === 'notice.edit') {
        data.thumbnail = ''
        formData.append('thumbnail', this.fileUploads)
        formData.append('_method', 'PUT')
        this.updateNews(this.$route.params.id, formData)
      } else {
        formData.append('thumbnail', this.fileUploads)
        this.createNews(formData)
      }
    },

    async updateNews (id, data) {
      try {
        await Notice.update(id, data)

        await this.onSuccess(this.$t('message_success'), this.$t('create_message_successfully'))

        this.$router.push({name: 'notice.index'}).catch(_ => {})
      } catch (err) {
        this.checkErrorsAPI(err)
        this.isSubmit = false
      }
    },

    async createNews (data) {
      try {
        const resp = await Notice.create(data)

        if (resp && Object.keys(resp).length) {
          await this.onSuccess(this.$t('message_success'), this.$t('create_message_successfully'))

          this.$router.push({name: 'notice.index'}).catch(_ => {
          })
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
      return this.$router.push({name: 'notice.index'})
    },

    onUploadImage (file) {
      this.imageShow = file.src
      this.fileUploads = file
    },

    async previewFile (url, banner, defaultType = 'image/png,image/jpg,image/jpeg') {
      let response = await fetch(url)
      let data = await response.blob()
      let metadata = {
        type: response.headers.get('content-type') || defaultType
      }

      const filename = response.url.replace(/^.*\/\/[^/]+/, '')
      let pathSplitted = filename.split('?')[0].split('_')[1]
      pathSplitted = !banner ? 'default' : pathSplitted

      this.fileUploads = new File([data], pathSplitted, metadata)
    },

    deleteImage () {
      this.imageShow = require('../../assets/images/dummy_image.png')
      this.form.thumbnail = ''
      this.previewFile(this.imageShow, this.form.thumbnail)
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .form-control-plaintext {
    max-width: 150px;
  }
</style>
