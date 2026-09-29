import { createRouter, createWebHistory } from 'vue-router'
import ComprobanteView from '../views/ComprobanteView.vue'

const routes = [
  {
    path: '/comprobante/:hash',
    name: 'Comprobante',
    component: ComprobanteView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
