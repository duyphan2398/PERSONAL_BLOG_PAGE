<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container">
      <a class="navbar-brand" href="index.html">Start Bootstrap</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="about.html">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="post.html">Sample Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact.html">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {navigations} from '@/config'
import store from '@/store'
import {
  SettingsIcon,
  LogOutIcon
} from 'vue-feather-icons'

export default {
  name: 'Nav',
  components: {
    SettingsIcon,
    LogOutIcon
  },
  computed: {
    userName () {
      return store.getters.profile ? store.getters.profile.data.name : ''
    }
  },
  data () {
    return {
      navigations
    }
  },
  methods: {
    logoutEvent () {
      this.$emit('logout-event')
    }
  }
}
</script>

<style scoped>
  .active {
    font-weight: bold;
  }
</style>
