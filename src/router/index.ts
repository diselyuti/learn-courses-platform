import { createRouter, createWebHistory } from 'vue-router'
import CoursesView from "@/views/CoursesView.vue";
import CourseView from "@/views/CourseView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Courses',
      component: CoursesView,
      meta: {
        title: 'Courses'
      }
    },
    {
      path: '/courses/:slug',
      name: 'Course',
      component: CourseView,
      meta: {
        title: 'Course'
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta && to.meta.title ? to.meta.title : 'Learn Smth New';
  document.title = pageTitle.toString();
  next();
});

export default router
