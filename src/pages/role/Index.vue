<template>
  <div id="RoleIndex">
    <div class="btn-create">
      <router-link :to="{name: 'role.create'}" class="btn btn-success" tag="button">
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
             @change="onPageChange">

      <!--Custom type table-->
      <template slot="action" slot-scope="action">
        <div class="btn-list justify-content-start">
          <a-tooltip placement="bottom" :title="$t('tooltip_edit')">
            <button @click="handleEdit(action.id)" class="btn btn-primary font-weight-light">
              <EditIcon size="16"/>
            </button>
          </a-tooltip>

          <a-tooltip placement="bottom" :title="$t('tooltip_delete')" v-if="hasPermissionAction(PERMISSIONS.DELETE_ROLE)">
            <a-popconfirm
                :title="$t('confirm_delete_content')"
                :ok-text="$t('confirm_yes')"
                :cancel-text="$t('confirm_no')"
                @confirm="handleDelete(action.id)">
              <button class="btn btn-danger font-weight-light" v-if="(currentUser.roles.id !== action.id) && (action.name !== USER_TYPE.super_admin)">
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
import Role from '@/models/Role'
import Table from '@/mixins/table.mixin'
import Form from '@/mixins/form.mixin'
import { convertPagination } from '@/utils/filters'
import Search from './Search'
import { EditIcon, Trash2Icon, PlusIcon } from 'vue-feather-icons'
import store from '@/store'
export default {
  name: 'Index',

  components: {
    Search,
    EditIcon,
    Trash2Icon,
    PlusIcon
  },

  async beforeRouteEnter (to, from, next) {
    // Get All Roles
    const resp = await Role.paginate({
      query: {
        page: 1,
        per_page: 100,
        'include': 'permissions',
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
      perPage: ''
    }
  },

  mixins: [Table, Form],

  computed: {
    columns () {
      return [
        {
          title: this.$t('column_role_display_name'),
          dataIndex: 'display_name'
        },
        {
          title: this.$t('column_role_name'),
          dataIndex: 'name'
        },
        {
          title: '',
          scopedSlots: { customRender: 'action' }
        }
      ]
    },
    currentUser () {
      return store.getters.profile.data
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

    async handleEdit (id) {
      this.$router.push({
        name: 'role.edit',
        params: {
          id: id
        }
      }).catch(_ => {})
    },

    async handleDelete (id) {
      try {
        await Role.delete_role(id)

        await this.onSuccess(this.$t('message_success'), this.$t('delete_message_successfully'))

        await this.fetchList()
      } catch (err) {
        await this.onError(this.$t('message_error'), this.$t('delete_message_error'))
      }
    },

    async fetchList (params = {}) {
      this.isLoading = true
      const filter = {}

      for (let property in this.filter) {
        filter[`filters[${property}]`] = this.filter[property]
      }

      try {
        const resp = await Role.paginate({
          query: {
            ...params,
            ...filter,
            'include': 'permissions',
            'sortBy[updated_at]': 'desc'
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
