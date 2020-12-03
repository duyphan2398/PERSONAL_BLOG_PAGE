<template>
  <div id="file-list">
    <div class="card">
      <div class="card-status-top bg-warning"/>
      <div class="card-header pb-4 pt-4">
        <div class="row">
          <div class="col-12 col-md-7 d-flex align-items-center">
            <b v-if="headerTitle"
                v-text="headerTitle"/>
          </div>
          <div class="col-12 col-md-5">
            <slot name="headerRight"/>
          </div>
        </div>
      </div>

      <div class="card-body position-relative card-body-style">
        <div class="position-absolute w-100 h-100 spin" v-if="isLoading">
          <a-spin/>
        </div>
        <div class="row" v-else>
          <draggable
              @add="onAddEvent($event)"
              ghost-class="ghost-movie"
              :list="movies"
              v-bind="{group: {name: 'movie', pull: 'clone'}}"
              tag="div"
              class="col-12 d-flex flex-row flex-wrap"
              style="min-height: 320px"
          >
            <a-card
                :bordered="false"
                :headStyle="{minHeight: '30px', padding: 0}"
                :bodyStyle="{padding: '10px 5px'}"
                v-for="(movie, index) in movies"
                :key="index"
                class="custom-card-image"
                :data-id="movie.id">
              <img
                  slot="cover"
                  :title="movie.movie_title"
                  :alt="movie.movie_title"
                  v-lazy="movie.movie_thumbnail"
                  style="width: 100%; height: 150px; object-fit: cover"/>
              <a-card-meta :title="movie.movie_title"/>
            </a-card>
          </draggable>
        </div>
      </div>

      <div class="card-footer text-center p-0">
        <a-pagination :default-current="paginator.currentPage"
                      :current="paginator.currentPage"
                      :pageSize="paginator.perPage"
                      :total="paginator.total"
                      @change="onPageChange"
                      show-less-items/>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'ant-design-vue'
import draggable from 'vuedraggable'
import { findIndex } from 'lodash-es'
export default {
  name: 'MovieList',

  props: {
    headerTitle: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    movies: Array,
    paginator: {
      perPage: Number,
      currentPage: Number,
      total: Number
    }
  },

  components: {
    Pagination,
    draggable
  },

  computed: {},

  methods: {
    // catch paginate click event
    onPageChange (page, pageSize) {
      this.$emit('onDataChange', { page, pageSize })
    },
    // catch drop event
    onAddEvent (event) {
      const index = findIndex(this.movies, movie => movie.id === event.item.getAttribute('data-id'))
      if (index !== -1) {
        this.movies.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #file-list {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 80px;
  }
.card-body-style {
  max-height: 320px;
  min-height: 320px;
  overflow-y: scroll
}

.spin {
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: #ffffff85;
}
.card {
  .card-header {
    display: flex;
    h3 {
      width: 50%;
    }
  }
}
.card-footer {
  /deep/ .ant-pagination {
    margin: 5px 20px !important;
  }
}
</style>
