<template>
  <div id="PostIndex">
    <div class="btn-create">
      <router-link :to="{name: 'notice.create'}" class="btn btn-success" tag="button">
        <PlusIcon size="18" class="mr-1"/>
        {{$t('btn_create')}}
      </router-link>
    </div>

    <Search @filter-changed="onFilterChange($event)"/>

    <a-table :columns="columns"
             :data-source="list"
             :loading="isLoading"
             :rowKey="randomUniqueID"
             :pagination="{
               ...pagination,
               showSizeChanger: true,
               buildOptionText: buildOptionText,
               pageSizeOptions: ['100', '50', '10'],
               showTotal: showTotal
             }"
             :rowClassName="handleHighlight"
             @change="onPageChange">

      <template slot="thumbnail" slot-scope="thumbnail">
        <img class="avatar avatar-lg img-thumbnail-list" :src="thumbnail | imageThumbnailObject" alt=""/>
      </template>

      <template slot="duration" slot-scope="duration">
        {{ duration.publish_start_datetime }} ~ {{ duration.publish_end_datetime}}
      </template>

      <!--Custom badge active-->
      <template slot="is_active" slot-scope="is_active">
        <span class="badge bg-green" v-if="is_active"> {{$t('active')}} </span>
        <span class="badge bg-gray" v-else> {{$t('inactive')}} </span>
      </template>

      <template slot="news_title" slot-scope="title">
        {{ title }}
      </template>

      <!--Custom type table-->
      <template slot="action" slot-scope="action">
        <div class="btn-list justify-content-start">
          <a-tooltip placement="bottom" :title="$t('tooltip_edit')">
            <button @click="handleEdit(action.id)" class="btn btn-primary font-weight-light">
              <EditIcon size="16"/>
            </button>
          </a-tooltip>

          <a-tooltip placement="bottom" :title="$t('tooltip_delete')" v-if="hasPermissionAction(PERMISSIONS.DELETE_NOTICE)">
            <a-popconfirm
                :title="$t('confirm_delete_content')"
                :ok-text="$t('confirm_yes')"
                :cancel-text="$t('confirm_no')"
                @confirm="handleDelete(action.id)">
              <button class="btn btn-danger font-weight-light">
                <Trash2Icon size="16"/>
              </button>
            </a-popconfirm>
          </a-tooltip>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import Notice from '@/models/Notice'
import Form from '@/mixins/form.mixin'
import Table from '@/mixins/table.mixin'
import { convertPagination } from '@/utils/filters'
import Search from './Search'
import { EditIcon, Trash2Icon, PlusIcon } from 'vue-feather-icons'

export default {
  name: 'Index',

  mixins: [Table, Form],

  components: {
    Search,
    EditIcon,
    Trash2Icon,
    PlusIcon
  },

  async beforeRouteEnter (to, from, next) {
    // const resp = await Notice.paginate({
    //   query: {
    //     page: 1,
    //     per_page: 100,
    //     'sortBy[updated_at]': 'desc'
    //   }
    // })

    // to.meta['list'] = resp.data
    // to.meta['pagination'] = convertPagination(resp.pagination)

    to.meta['list'] = []
    to.meta['pagination'] = []
    return next()
  },

  data () {
    return {
      isLoading: false,
      list: [],
      pagination: {},
      filter: {},
      perPage: ''
    }
  },

  computed: {
    columns () {
      return [
        {
          title: this.$t('column_notice_thumbnail'),
          dataIndex: 'thumbnail',
          scopedSlots: { customRender: 'thumbnail' },
          width: 85
        },
        {
          title: this.$t('column_notice_duration'),
          scopedSlots: { customRender: 'duration' },
          width: 160
        },
        {
          title: this.$t('column_notice_title'),
          dataIndex: 'title'
        },
        {
          title: this.$t('status'),
          dataIndex: 'is_active',
          scopedSlots: {customRender: 'is_active'},
          width: 120,
          align: 'center'
        },
        {
          title: '',
          scopedSlots: { customRender: 'action' },
          width: 150,
          align: 'center'
        }
      ]
    }
  },

  created () {
    this.list = this.$route.meta['list']
    this.pagination = this.$route.meta['pagination']
  },

  methods: {
    async onPageChange (pagination) {
      this.perPage = pagination.pageSize
      const params = {
        page: pagination.current,
        per_page: pagination.pageSize
      }

      await this.fetchList(params)
    },

    async onFilterChange ($event) {
      const params = {
        page: 1,
        per_page: this.perPage || 100
      }

      this.filter = {...$event}

      await this.fetchList(params)
    },

    async fetchList (params = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Notice.paginate({
          query: {
            'sortBy[updated_at]': 'desc',
            ...params,
            ...filter
          }
        })

        this.list = [...resp.data]
        this.pagination = convertPagination(resp.pagination)
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },

    handleHighlight (record) {
      return !record.is_active ? 'active' : ''
    },

    async handleEdit (id) {
      this.$router.push({
        name: 'notice.edit',
        params: {
          id: id
        }
      }).catch(_ => {})
    },

    async handleDelete (id) {
      const params = {
        page: 1,
        per_page: this.perPage || 100
      }

      await Notice.delete(id)

      await this.fetchList(params)
    }
  }
}
</script>

<style scoped>

</style>
