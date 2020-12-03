<template>
  <div id="AppTopIndex">
    <div class="row">
      <ValidationObserver tag="form"
                          ref="observer"
                          @submit.prevent="validateBeforeSubmit">
      <TopImageForm>
        <template #uploadImage>
          <!--Thumbnail-->
          <ValidationProvider tag="div"
                              :name="$t('field_app_top_banner')"
                              class="mb-3"
                              vid="banner"
                              v-slot="{ errors }">
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
              <!-- Selected image -->
              <ImageUpload @onUploadImage="onUploadImage"/>

              <span class="error invalid-feedback" v-if="errors.length">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </template>
        <template #inputTitle>
          <InputText v-model="form.title"
                     class="mb-3"
                     rules="required"
                     vid="title"
                     label="field_app_top_title"
                     :required="true"/>
        </template>
        <template #inputDetail>
          <InputTextArea v-model="form.detail"
                         class="mb-3"
                         rules="required"
                         vid="detail"
                         label="field_app_top_detail"
                         :rows="4"
                         :required="true"/>
        </template>
      </TopImageForm>

        <!-- Action Section Submit & Cancel -->
        <div class="card-footer fixed-bottom bg-light shadow">
          <button type="submit"
                  v-if="hasPermissionAction(PERMISSIONS.UPDATE_APP_TOP)"
                  class="btn btn-success float-right mr-1"
                  :class="{'btn-loading disabled': isSubmit}">
            <a-icon type="save" class="mr-1"/>
            {{ $t('btn_save') }}
          </button>
        </div>
      </ValidationObserver>
    </div>
    <div class="row">
      <div class="col-6">
        <component
            :is="`TopMovieList`"
            v-model="form.movies"/>
      </div>
      <div class="col-6">
        <MovieList :movies="list"
                   :top-movie-count="form.movies.length"
                   :is-loading="isLoading"
                   :paginator="pagination"
                   :header-title="$t('movie_list')"
                   @onDataChange="onDataChange($event)"
                    >
          <template #headerRight>
            <a-input-search
                v-model="filter.movie_title"
                :placeholder="$t('placeholder_filter_movie_name')"
                @search="onSearch"
            />
          </template>
        </MovieList>
      </div>
    </div>
  </div>
</template>

<script>
import { EditIcon, PlusIcon, Trash2Icon, UploadIcon, XCircleIcon } from 'vue-feather-icons'
import Form from '@/mixins/form.mixin'
import TopImageForm from '@/pages/appTop/components/TopImageForm'
import MovieList from '@/pages/appTop/components/MovieList'
import TopMovieList from '@/pages/appTop/components/TopMovieList'
import { forEach, pickBy, slice } from 'lodash-es'
import AppTop from '@/models/AppTop'
import InputText from '@/components/form/InputText'
import InputTextArea from '@/components/form/InputTextArea'
import ImageUpload from '@/components/file/ImageUpload'
import Movie from '@/models/Movie'
export default {
  name: 'Index',
  mixins: [Form],

  data () {
    return {
      form: {
        title: '',
        detail: '',
        banner: '',
        movies: []
      },
      isLoading: false,
      list: [],
      pagination: {},
      filter: {
        movie_title: ''
      },
      fileUploads: '',
      perPage: '',
      imageShow: '',
      isSubmit: false
    }
  },

  components: {
    ImageUpload,
    InputText,
    InputTextArea,
    MovieList,
    TopMovieList,
    TopImageForm,
    EditIcon,
    Trash2Icon,
    PlusIcon,
    UploadIcon,
    XCircleIcon
  },

  async beforeRouteEnter (to, from, next) {
    const movieList = await Movie.paginate({
      query: {
        page: 1,
        per_page: 12,
        'sortBy[updated_at]': 'desc'
      }
    })

    const topContent = await AppTop.paginate({
      query: {
        'include': 'movies'
      }
    })

    to.meta['list'] = movieList.data
    to.meta['top_content'] = topContent.data
    to.meta['pagination'] = movieList.pagination
    return next()
  },

  created () {
    this.list = this.$route.meta['list']
    this.form = Object.assign(this.form, {
      ...this.$route.meta['top_content']
    })
    this.imageShow = this.form.banner || require('../../assets/images/dummy_image.png')
    this.previewFile(this.imageShow, this.form.banner)
    this.pagination = this.$route.meta['pagination']
    this.perPage = this.pagination.perPage
  },

  methods: {
    async onDataChange (event) {
      return this.fetchMedia({ page: event.page, perPage: event.pageSize })
    },

    async onSearch (value) {
      await this.fetchMedia({ page: 1, per_page: this.perPage })
    },

    onUploadImage (file) {
      this.imageShow = file.src
      this.fileUploads = file
    },

    async fetchMedia (queryParams = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Movie.paginate({
          query: {
            ...queryParams,
            ...filter,
            'sortBy[updated_at]': 'desc'
          }
        })

        this.list = [...resp.data]
        this.pagination = {...resp.pagination}
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },

    async validateBeforeSubmit () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        await this.saveTopMovieList()
      }
    },

    async saveTopMovieList () {
      try {
        this.isSubmit = true

        const formData = new FormData()

        await formData.append('title', this.form.title)
        await formData.append('detail', this.form.detail)
        await formData.append('banner', this.fileUploads)

        forEach(this.form.movies, async (o, i) => {
          await formData.append('movie_ids[' + i + ']', o.id)
        })

        await AppTop.updateAppTop(formData)

        await this.onSuccess(this.$t('message_success'), this.$t('update_message_successfully'))
      } catch (err) {
        this.checkErrorsAPI(err)
      }
      this.isSubmit = false
    },

    checkErrorsAPI (err) {
      forEach(err.response.data.errors, (item) => {
        pickBy(this.$refs.observer.errors, (value, key) => {
          if (!item.field.includes(key)) {
            return
          }
          if (item.field.includes('group_name')) {
            let mes = item.message.split('group_name')[1]
            value.push(slice(mes, 2, mes.length).join(''))
          } else {
            value.push(item.message)
          }
        })
      })
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
      this.form.banner = ''
      this.previewFile(this.imageShow, this.form.banner)
    }
  }
}
</script>

<style scoped>
  .card-footer{
    z-index: 100;
  }
</style>
