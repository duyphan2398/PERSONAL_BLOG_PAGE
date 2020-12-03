<template>
  <div id="DeviceIndex">
    <Search @filter-changed="onFilterChange($event)"></Search>

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
             @change="onPageChange">

      <!--Custom type table-->
      <template slot="action" slot-scope="action">
        <div class="btn-list justify-content-start">
          <a-tooltip placement="bottom" :title="$t('tooltip_delete')"
                     v-if="hasPermissionAction(PERMISSIONS.DELETE_DEVICE)">
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
import { EditIcon, Trash2Icon, PlusIcon } from 'vue-feather-icons'
import { convertPagination } from '@/utils/filters'
import Device from '@/models/Device'
import Table from '@/mixins/table.mixin'
import Form from '@/mixins/form.mixin'
import Search from '@/pages/device/Search'
export default {
  name: 'Index',

  mixins: [Table, Form],

  components: {
    Search,
    EditIcon,
    Trash2Icon,
    PlusIcon
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
          title: this.$t('column_device_user_email'),
          dataIndex: 'user.email'
        },
        {
          title: this.$t('column_device_id'),
          dataIndex: 'device_id'
        },
        {
          title: this.$t('column_device_created_at'),
          dataIndex: 'created_at'
        },
        {
          title: '',
          scopedSlots: {customRender: 'action'},
          align: 'center'
        }
      ]
    }
  },

  async beforeRouteEnter (to, from, next) {
    // Get All Device
    const resp = await Device.paginate({
      query: {
        page: 1,
        per_page: 100,
        'include': 'user',
        'sortBy[updated_at]': 'desc'
      }
    })
    // Save data in meta of router
    to.meta['list'] = resp.data
    to.meta['pagination'] = convertPagination(resp.pagination)
    next()
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
        name: 'device.edit',
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

      await Device.delete_device(id)

      await this.onSuccess(this.$t('message_success'), this.$t('delete_message_successfully'))

      await this.fetchList(params)
    },

    async fetchList (params = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Device.paginate({
          query: {
            ...params,
            ...filter,
            'sortBy[updated_at]': 'desc',
            'include': 'user'
          }
        })

        this.list = [...resp.data]
        this.pagination = convertPagination(resp.pagination)
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
      }
    }
  }

}
</script>

<style scoped>

</style>
