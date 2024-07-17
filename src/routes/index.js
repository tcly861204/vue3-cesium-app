import { createRouter, createWebHashHistory } from 'vue-router'
const modules = import.meta.glob('/src/pages/**/index.vue')
const childrens = []
Object.keys(modules).forEach((key) => {
  const path = key.slice(10, -10)
  childrens.push({
    path,
    name: path.slice(1).replace(/\//g, '_'),
    component: modules[key]
  })
})
const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/home',
      component: () => import('@/layout/index.vue'),
      children: childrens
    }
  ]
})
export default router
