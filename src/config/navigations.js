import {
  GlobeIcon,
  UserCheckIcon
} from 'vue-feather-icons'

export const navigations = [
  { id: 'home', type: 'item', title: 'admin', routeName: 'cms.admin.edit', icon: UserCheckIcon, exact: true },
  { id: 'notice', type: 'item', title: 'notice', routeName: 'notice.index', icon: GlobeIcon }
]
