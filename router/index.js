// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import BlogDetail from '../views/BlogDetail.vue';

const routes = [
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetail,
    props: true, // This enables passing props to the component
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
