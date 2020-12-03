import Vue from 'vue'
import store from '@/store'
import { PERMISSIONS } from '@/enum/permissions.enum'
import { USER_TYPE } from '@/enum/roles_type.enum'

Vue.mixin({
  data () {
    return {PERMISSIONS, USER_TYPE}
  },
  methods: {
    hasPermissionAction (permissionName) {
      const permission = store.getters.currentPermissions.find(permission => permission.name.trim() === permissionName)
      return permission && 'id' in permission
    }
  }
})
