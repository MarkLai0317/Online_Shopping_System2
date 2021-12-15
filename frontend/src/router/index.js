import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  /*{
    path: '/login',
    name:'Login',
    component: Login
  },*/
  
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    

  {
    path: '/customerHome',
    name: 'CustomerHome',
    component: ()=> import('../views/CustomerHome.vue'),
    children:[
      {
        path: 'buy',
        component: () => import('../components/BuyTable.vue')
      },
      {
        path: 'history',
        component: ()=> import('../components/CustomerHistory.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component:  () => import('../views/Test.vue'),
    children:[
      {
        path: 'nn',
        component: () => import('../components/NNTest.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
