<template>
  <div id="PushIndex">
    <div class="btn-create">
      <router-link :to="{name: 'push.create'}" class="btn btn-success" tag="button">
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

      <template slot="is_active" slot-scope="is_active">
        <span class="badge bg-green" v-if="is_active"> {{$t('active')}} </span>
        <span class="badge bg-gray" v-else> {{$t('inactive')}} </span>
      </template>

      <!--Custom type table-->
      <template slot="action" slot-scope="action">
        <div class="btn-list justify-content-start">
          <div class="col-md-6">
            <a-tooltip
                v-if="compareIsAfter(action.datetime, currentDate)"
                placement="bottom"
                :title="$t('tooltip_edit')">
              <button @click="handleEdit(action.id)" class="btn btn-primary font-weight-light">
                <EditIcon size="16"/>
              </button>
            </a-tooltip>
          </div>

          <div class="col-md-6">
            <a-tooltip placement="bottom" :title="$t('tooltip_delete')">
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
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import Push from '@/models/Push'
import Table from '@/mixins/table.mixin'
import Form from '@/mixins/form.mixin'
import { convertPagination } from '@/utils/filters'
import Search from './Search'
import { EditIcon, Trash2Icon, PlusIcon, CopyIcon } from 'vue-feather-icons'
import moment from 'moment'
export default {
  name: 'Index',

  mixins: [Table, Form],

  components: {
    Search,
    EditIcon,
    Trash2Icon,
    PlusIcon,
    CopyIcon
  },

  async beforeRouteEnter (to, from, next) {
    // Get All Push
    const resp = await Push.paginate({
      query: {
        page: 1,
        per_page: 100,
        'sortBy[updated_at]': 'desc'
      }
    })

    // Save data in meta of router
    to.meta['list'] = resp.data
    to.meta['pagination'] = convertPagination(resp.pagination)

    return next()
  },

  data () {
    return {
      isLoading: false,
      list: [],
      pagination: {},
      filter: {},
      sortBy: 'created_at',
      sortDesc: true,
      perPage: '',
      currentDate: moment().format('YYYY-MM-DD HH:mm:ss').toString()
    }
  },

  computed: {
    columns () {
      return [
        {
          title: this.$t('column_push_datetime'),
          dataIndex: 'datetime',
          width: 170
        },
        {
          title: this.$t('column_push_message'),
          dataIndex: 'message',
          width: 400
        },
        {
          title: this.$t('column_push_ios_open_count'),
          dataIndex: 'ios_open_count'
        },
        {
          title: this.$t('column_push_ios_push_count'),
          dataIndex: 'ios_push_count'
        },
        {
          title: this.$t('column_push_android_open_count'),
          dataIndex: 'android_open_count'
        },
        {
          title: this.$t('column_push_android_push_count'),
          dataIndex: 'android_push_count'
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
          align: 'center',
          width: 140
        }
      ]
    }
  },

  created () {
    this.list = this.$route.meta['list']
    this.pagination = this.$route.meta['pagination']
  },

  methods: {
    async onPageChange (pagination, filters, sorter) {
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

    async handleEdit (id) {
      this.$router.push({
        name: 'push.edit',
        params: {
          id: id
        }
      }).catch(_ => {})
    },

    async handleDuplicate (id) {
      this.$router.push({
        name: 'push.duplicate',
        params: {
          id: id
        }
      }).catch(_ => {})
    },

    async handleDelete (id) {
      const params = {
        page: 1,
        per_page: this.perPage || 100,
        'sortBy[updated_at]': 'desc'
      }

      await Push.delete(id)

      await this.fetchList(params)
    },

    async fetchList (params = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Push.paginate({
          query: {
            ...params,
            ...filter,
            'sortBy[updated_at]': 'desc'
          }
        })

        this.list = [...resp.data]
        this.pagination = convertPagination(resp.pagination)
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    },

    handleHighlight (record, index) {
      return record.is_active ? '' : 'inactive'
    },

    compareIsAfter (date1, date2) {
      // date1 greater than date2
      return moment(date1).isAfter(moment(date2))
    }
  }
}
</script>

<style scoped lang="scss">
.ant-table {
  .btn-list {
    position: relative;
    bottom: 4px;
  }
}
</style>
