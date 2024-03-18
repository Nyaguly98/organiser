import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'tasks',
    path: '/tasks',
    component: () => import('pages/IndexView.vue'),
  },

  {
    path: '/menu',
    component: () => import('pages/MenuView.vue'),
  },

  {
    path: '/notes',
    component: () => import('pages/NotesView.vue'),
  },

  {
    path: '/calendar',
    component: () => import('pages/CalenderView.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
