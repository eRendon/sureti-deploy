import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { authStorage } from '../storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next): void => {

  const isNewUser = authStorage.getters.getStateIsNewUser()

  const { isLoggedIn } = authStorage.getters.getStateAuth()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({
        name: 'Login'
      })
    } else {
      if (isNewUser) {
        next({
          name: 'OnBoarding'
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router;
