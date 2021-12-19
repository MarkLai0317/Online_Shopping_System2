import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//import firebase from "firebase/compat/app"
import 'firebase/compat/auth'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/managerHome',
    name: 'ManagerHome',
    component: () => import('../views/ManagerHome.vue')
  },
  
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
        name: 'Buy',
        component: () => import('../components/BuyTable.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'history',
        name: 'History',
        component: ()=> import('../components/CustomerHistory.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: ()=> import('../components/CustomerCart.vue')
        // Cart.vue can never be found
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
        component: () => import('../components/test/NNTest.vue')
      },
      {
        path: 'mark',
        component: () => import('../components/MarkTest.vue')
      },
      {
        path: 'lin',
        component: () => import('../components/test/linTest.vue')
      },
      {
        path: 'chang',
        component: () => import('../components/test/linTest.vue')
      },
      {
        path: 'tsai',
        component: () => import('../components/test/tsaiTest.vue')

      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});*/

export default router
