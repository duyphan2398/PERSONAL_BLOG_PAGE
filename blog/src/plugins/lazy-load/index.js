import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import {lazyloadImageOptions} from '@/plugins/config'

Vue.use(VueLazyload, lazyloadImageOptions)
