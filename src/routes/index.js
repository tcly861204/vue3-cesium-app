import { createRouter, createWebHistory } from 'vue-router'
const modules = import.meta.glob('/src/pages/**/index.vue')
import { PUBLIC_PATH } from '@/libs/const'
const childrens = []
Object.keys(modules).forEach((key) => {
  const path = key.slice(10, -10)
  childrens.push({
    path,
    name: path.replace(/\//g, '_'),
    component: modules[key]
  })
})
const router = createRouter({
  history: createWebHistory(PUBLIC_PATH),
  routes: [{
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: childrens
  }]
})
export default router