import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import CoursesView from "@/views/CoursesView.vue";
import CourseView from "@/views/CourseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Dashboard'
      }
    },
    {
      path: '/courses',
      name: 'Courses',
      component: CoursesView,
      meta: {
        title: 'Courses'
      }
    },
    {
      path: '/courses/:id',
      name: 'Course',
      component: CourseView,
      meta: {
        title: 'Course'
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta && to.meta.title ? to.meta.title : 'Learn Smth New';
  document.title = pageTitle.toString();
  next();
});

export default router
