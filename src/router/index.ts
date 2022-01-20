import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { authStorage } from '../storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next): void => {

  const isNewUser = authStorage.getters.getStateIsNewUser()
  const auth = localStorage.getItem('auth')
  if (auth) {
    authStorage.mutations.setIsLogged(true)
  }
  const { isLoggedIn } = authStorage.getters.getStateAuth()
  console.log('isLoggedIn', isLoggedIn)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({
        name: 'Login'
      })
    } else {
      if (isNewUser) {
        next()
        // next({
        //   name: 'OnBoarding'
        // })
      } else {
        if (to.name === 'OnBoarding') {
          next({
            name: 'Dashboard'
          })
        } else {
          next()
        }
        console.log('isNewUser', isNewUser)
        console.log('to', to)
        console.log('from', from)
      }
    }
  } else {
    next()
  }
})

export default router;
