import {
  HomeIcon,
  SmartphoneIcon,
  GridIcon,
  VideoIcon,
  GlobeIcon,
  ShieldIcon,
  UserCheckIcon,
  BellIcon
} from 'vue-feather-icons'

export const navigations = [
  { id: 'home', type: 'item', title: 'home', routeName: 'home', icon: HomeIcon, exact: true },
  { id: 'device', type: 'item', title: 'device', routeName: 'device.index', icon: SmartphoneIcon },
  { id: 'app_top', type: 'item', title: 'app_top', routeName: 'app_top.index', icon: GridIcon },
  { id: 'movie', type: 'item', title: 'movie', routeName: 'movie.index', icon: VideoIcon },
  { id: 'notice', type: 'item', title: 'notice', routeName: 'notice.index', icon: GlobeIcon },
  { id: 'push', type: 'item', title: 'push', routeName: 'push.index', icon: BellIcon },
  { id: 'role', type: 'item', title: 'role', routeName: 'role.index', icon: ShieldIcon },
  { id: 'admin', type: 'item', title: 'admin', routeName: 'admin.index', icon: UserCheckIcon }
]
