<template>
  <a-card class="card-common">
    <div class="title" slot="title">
      <div class="card-status-top bg-warning"></div>
      <div class="row">
        <h3>{{ $t('title_top_movie_app_top') }}</h3>
      </div>
    </div>
    <div class="row card-content" style="max-height: 500px; min-height: 500px; overflow-y: scroll">
      <draggable
          @add="onAddEvent($event)"
          ghost-class="ghost-movie"
          :list="topMovie"
          v-bind="{group: {name: 'movie'}}"
          tag="div"
          class="col-12 d-flex flex-row flex-wrap">
        <a-card
                :bordered="false"
                :headStyle="{minHeight: '30px', padding: 0}"
                :bodyStyle="{padding: '10px 5px'}"
                v-for="(movie, index) in topMovie"
                :key="movie.id+index"
                class="custom-card-image"
                :data-id="movie.id"
                style="height: 50px">
          <img
              slot="cover"
              :title="movie.movie_title"
              :alt="movie.movie_title"
              v-lazy="movie.movie_thumbnail"
              style="width: 100%; height: 150px; object-fit: cover"/>
          <a-card-meta :title="movie.movie_title" />
        </a-card>
      </draggable>
    </div>
  </a-card>
</template>

<script>
import draggable from 'vuedraggable'
import { findIndex, uniqBy } from 'lodash-es'
export default {
  name: 'TopMovieList',

  model: {
    prop: 'topMovie',
    event: 'change'
  },

  props: {
    topMovie: {
      type: Array,
      default: () => []
    }
  },

  components: {
    draggable
  },

  data () {
    return {
      data: null
    }
  },
  methods: {
    // catch drop event
    onAddEvent (event) {
      let tmpTopMovie = [...this.topMovie]
      if (this.topMovie.length > 5) {
        const index = findIndex(tmpTopMovie, movie => movie.id === event.item.getAttribute('data-id'))
        if (index !== -1) {
          tmpTopMovie.splice(index, 1)
        }
      } else {
        tmpTopMovie = uniqBy(tmpTopMovie, 'id')
      }
      this.$emit('change', tmpTopMovie)
    }
  }
}
</script>

<style scoped>
.card-common.isHideBody .ant-card-body {
  display: none !important
}
.btn_handle{
  cursor: move;
}
</style>
