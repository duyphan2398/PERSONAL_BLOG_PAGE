<template>
  <a-card class="card-common" :class="{'isHideBody': !movieGroup.isVisible}">
    <template slot="extra">
      <slot name="isVisible"/>
    </template>
    <div class="title mt-1" slot="title">
      <div class="card-status-top"
           :class="{'bg-success' : movieGroup.top_content, 'bg-warning' : !movieGroup.top_content}"></div>
      <div class="row">
        <slot name="headerMovieGroup"/>
      </div>
    </div>
    <div class="row card-content" style="max-height: 320px; min-height: 200px; overflow-y: scroll">
      <draggable
            @add="onAddEvent($event)"
            :list="movieGroup.movies"
            ghost-class="ghost-movie"
            group="movie"
            tag="div"
            class="col-12 d-flex flex-row flex-wrap">
        <a-card
                :bordered="false"
                :headStyle="{minHeight: '30px', padding: 0}"
                :bodyStyle="{padding: '10px 5px'}"
                v-for="(movie, index) in movieGroup.movies"
                :key="movie.id+index"
                class="custom-card-image"
                :data-id="movie.id">
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
import { uniqBy } from 'lodash-es'

export default {
  name: 'MovieGroupComponent',

  model: {
    prop: 'movieGroup',
    event: 'change'
  },

  props: {
    movieGroup: {
      type: [String, Object],
      default: null
    },
    value: {
      type: Number,
      default: 0
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
    // on add event - check unique the movie
    onAddEvent (event) {
      this.movieGroup.movies = uniqBy(this.movieGroup.movies, 'id')
    }
  }
}
</script>

<style scoped>
.card-common.isHideBody .ant-card-body {
  display: none !important
}
</style>
