import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Default',
    component: () => import(/* webpackChunkName: "DefaultLayout" */ '../layouts/Default.vue'),
    redirect: '/dashboard/home',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/dashboard/home/home.vue'),
        meta: {
          requiresAuth: true
        },
      },
      {
        path: '/guarantee/:id?',
        component: () => import(/* webpackChunkName: "Guarantee" */ '@/views/dashboard/guarantee/guarantee.vue'),
        name: 'Guarantee',
        meta: {
          requiresAuth: true
        },
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/login/login.vue'),

      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/register/register.vue'),
      },
      {
        path: '/verify',
        name: 'Verify',
        component: () => import(/* webpackChunkName: "verify" */ '../views/auth/userVerification/userVerification.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/register/register.vue'),

      },
      {
        path: '/recovery-password',
        name: 'RecoveryPassword',
        component: () => import(/* webpackChunkName: "recovery-password" */ '../views/auth/recoveryPassword/recoveryPassword.vue')
      },
      {
        path: '/user/on-boarding',
        name: 'OnBoarding',
        component: () => import(/* webpackChunkName: "OnBoarding" */ '../views/onBoarding/onBoarding.vue')
      },
      {
        path: '/user/on-boarding/loans/:intention?',
        name: 'Loans',
        component: () => import(/* webpackChunkName: "Guarantee" */ '../views/onBoarding/loans/loans.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Guarantee" */ '../views/dashboard/profile/profile.vue')
      },
      {
        path: '/user/on-boarding/investment/:intention?',
        name: 'Investment',
        component: () => import(/* webpackChunkName: "Investment" */ '../views/onBoarding/investment/investment.vue')
      },
      { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]


export default routes;
