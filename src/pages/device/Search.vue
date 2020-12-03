<template>
  <a-card class="card-common">
    <div class="card-status-top bg-warning"></div>

    <!--Form-->
    <form role="search" @submit.prevent="search">
      <div class="row">
        <!-- Title -->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{ $t('label_search_device_user_mail') }}</label>
          <a-input v-model.trim="filter.userEmail" />
        </div>

        <!-- Device id -->
        <div class="col-12 col-md-6 mb-2">
          <label class="form-label">{{ $t('label_search_device_id') }}</label>
          <a-input v-model.trim="filter.deviceId" />
        </div>

        <!--Search & Reset-->
        <div class="col-12 col-md-6 ml-auto">
          <label class="form-label" v-html="'&nbsp;'"/>

          <div class="row">
            <div class="col-6">
              <button type="button" @click="reset" class="btn btn-light btn-block border-0">
                <RefreshCwIcon size="14" class="mr-1"/>
                {{$t('btn_reset')}}
              </button>
            </div>

            <div class="col-6">
              <button type="submit" class="btn btn-warning btn-block border-0">
                <SearchIcon size="14" class="mr-1"/>
                {{$t('btn_search')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </a-card>
</template>

<script>
import { RefreshCwIcon, SearchIcon } from 'vue-feather-icons'

export default {
  name: 'Search',
  data () {
    return {
      filter: {
        userEmail: '',
        deviceId: ''
      }
    }
  },

  components: {
    SearchIcon,
    RefreshCwIcon
  },

  methods: {
    search () {
      this.$emit('filter-changed', this.filter)
    },

    reset () {
      // Reset datepicker
      this.dateRange = []

      for (let property in this.filter) {
        if (this.filter.hasOwnProperty(property)) {
          if (property === 'prefecture_id') {
            this.filter[property] = []
          } else {
            this.filter[property] = ''
          }
        }
      }

      this.$emit('filter-changed', this.filter)
    }
  }
}
</script>

<style scoped>

</style>
