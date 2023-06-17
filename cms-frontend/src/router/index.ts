import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Home.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/editor/',
    component: () => import('@/layouts/editor/Default.vue'),
    children: [
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/views/BlogEditor.vue'),
      },
      {
        path: 'page',
        name: 'Page',
        component: () => import('@/views/PageEditor.vue'),
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) =>{
  console.log(to, from);
  // login ellenőrzés
  // return false to cancel navigation
  // return { name: 'login' } redirect to login
});

export default router;
