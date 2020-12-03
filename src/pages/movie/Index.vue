<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <ValidationObserver tag="form"
                            ref="observer"
                            @submit.prevent="validateBeforeSubmit">
          <draggable v-model="movieGroupsList"
                     handle=".btn_handle"
                     @start="drag=true"
                     @end="drag=false"
                     v-bind="dragOptions">
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <template v-for="(element, index) in movieGroupsList">
                <MovieGroupComponent
                    :key="index"
                    :value="index"
                    v-model="movieGroupsList[index]"
                >
                  <template #isVisible>
                    <button type="button" class="btn btn-link p-0 ml-1" @click="changeVisible(element)">
                      <MinusCircleIcon v-if="element.isVisible" size="22"/>
                      <PlusCircleIcon v-else size="22"/>
                    </button>
                    <template v-if="hasPermissionAction(PERMISSIONS.DELETE_MOVIE_GROUP)">
                      <span>|</span>
                      <a-popconfirm
                          :title="$t('confirm_delete_content')"
                          :ok-text="$t('confirm_yes')"
                          :cancel-text="$t('confirm_no')"
                          @confirm="deleteMovieGroup(element, index)">
                        <button type="button" class="btn btn-link p-0">
                          <XCircleIcon  class="text-danger" size="22"/>
                        </button>
                      </a-popconfirm>
                    </template>
                  </template>
                  <template #headerMovieGroup>
                    <div class="col-12 col-md-1 d-flex justify-content-center">
                      <button type="button" class="btn btn-link p-0 btn_handle">
                        <MoreVerticalIcon size="20"/>
                      </button>
                    </div>
                    <div class="col-12 col-md-5">
                      <InputText v-model="movieGroupsList[index].group_name"
                                 rules="required|max:255"
                                 :vid="index+'.group_name'"
                                 label="field_movie_group_name"
                                 :hidden-label=true
                      />
                    </div>
                    <div class="col-12 col-md-5 align-self-center ">
                      <InputSwitch v-model="movieGroupsList[index].top_content"
                                   @input="onSwitch(index, $event)"
                                   class="justify-content-center"
                                   label="status_movie"
                                   :vertical="true"/>
                    </div>
                  </template>
                </MovieGroupComponent>
              </template>
            </transition-group>
          </draggable>
            <!-- Action Section Submit & Cancel -->
            <div class="card-footer fixed-bottom bg-light shadow">
              <button type="submit"
                      v-if="hasPermissionAction(PERMISSIONS.VIEW_MOVIE)"
                      class="btn btn-success float-right mr-1"
                      :class="{'btn-loading disabled': isSubmit}">
                <a-icon type="save" class="mr-1"/>
                {{ $t('btn_save') }}
              </button>
            </div>
        </ValidationObserver>
        <div class="text-center">
          <button class="btn btn-link" type="primary" @click="addMovieGroup">
            <PlusIcon size="16" class="mr-1"/>
            {{ $t('btn_add_more_movie_group') }}
          </button>
        </div>
      </div>
      <div class="col-6">
        <MovieList :movies="list"
                   :is-loading="isLoading"
                   :paginator="pagination"
                   :header-title="$t('movie_list')"
                   @onDataChange="onDataChange($event)">
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
import { EditIcon, Trash2Icon, MoreVerticalIcon, PlusCircleIcon, MinusCircleIcon, XCircleIcon, PlusIcon } from 'vue-feather-icons'
import Form from '@/mixins/form.mixin'
import { cloneDeep, forEach, pickBy, slice } from 'lodash-es'
import draggable from 'vuedraggable'
import { DISPLAY_MOVIE_GROUP } from '@/enum/movies.enum'
import MovieGroupComponent from '@/pages/movie/components/MovieGroupComponent'
import MovieList from '@/pages/movie/components/MovieList'
import InputSwitch from '@/components/form/InputSwitch'
import InputText from '@/components/form/InputText'
import Movie from '@/models/Movie'
import MovieGroup from '@/models/MovieGroup'
export default {
  name: 'Index',

  mixins: [Form],

  data () {
    return {
      drag: false,
      movieGroupsList: [],
      isLoading: false,
      list: [],
      pagination: {},
      filter: {
        movie_title: ''
      },
      isSubmit: false,
      perPage: ''
    }
  },

  computed: {
    dragOptions () {
      return {
        group: 'movieGroup',
        animation: 100,
        disabled: false,
        ghostClass: 'ghost-movie-group',
        forceFallback: true,
        scroll: true,
        bubbleScroll: true
      }
    }
  },

  components: {
    InputText,
    InputSwitch,
    MovieList,
    MovieGroupComponent,
    draggable,
    EditIcon,
    Trash2Icon,
    MoreVerticalIcon,
    PlusCircleIcon,
    MinusCircleIcon,
    XCircleIcon,
    PlusIcon
  },

  async beforeRouteEnter (to, from, next) {
    const movieList = await Movie.paginate({
      query: {
        page: 1,
        per_page: 12,
        'sortBy[updated_at]': 'desc'
      }
    })

    const movieGroupList = await MovieGroup.paginate({
      query: {
        per_page: 0,
        'include': 'movies',
        'sortBy[position]': 'asc'
      }
    })

    to.meta['list'] = movieList.data
    movieGroupList.data.forEach((movieGroup) => {
      movieGroup.isVisible = true
    })
    to.meta['movie_groups_list'] = movieGroupList.data
    to.meta['pagination'] = movieList.pagination
    return next()
  },

  created () {
    this.movieGroupsList = this.$route.meta['movie_groups_list']
    this.list = this.$route.meta['list']
    this.pagination = this.$route.meta['pagination']
    this.perPage = this.pagination.perPage
  },

  methods: {
    changeVisible (element) {
      element.isVisible = !element.isVisible
    },

    addMovieGroup () {
      this.movieGroupsList.push(cloneDeep(DISPLAY_MOVIE_GROUP))
    },

    async deleteMovieGroup (element, index) {
      if (element.id) {
        await MovieGroup.deleteMovieGroup(element.id)
      }
      this.movieGroupsList.splice(index, 1)
      await this.onSuccess(this.$t('message_success'), this.$t('delete_message_successfully'))
    },

    async onDataChange (pagination) {
      this.perPage = pagination.pageSize
      const params = {
        page: pagination.page,
        per_page: pagination.pageSize
      }
      return this.fetchMedia(params)
    },

    onSwitch (index, val) {
      if (val) {
        forEach(this.movieGroupsList, (movieGroup, indexMovieGroup) => {
          if (indexMovieGroup !== index) {
            movieGroup.top_content = false
          }
        })
      }
    },

    async onSearch (value) {
      await this.fetchMedia({ page: 1, per_page: this.perPage })
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
        await this.saveMovieGroupList()
      }
    },

    async saveMovieGroupList () {
      try {
        this.isSubmit = true
        this.movieGroupsList.forEach((movieGroup, index) => {
          movieGroup.position = index
        })
        let newMovieGroupList = await MovieGroup.updateMovieGroups(this.movieGroupsList)

        newMovieGroupList.data.forEach((movieGroup, index) => {
          this.movieGroupsList[index] = Object.assign(this.movieGroupsList[index], {...movieGroup})
        })

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
    }
  }
}
</script>

<style scoped>
  .btn_handle{
    cursor: move;
  }
</style>
