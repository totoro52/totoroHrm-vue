import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Index from '../views/Index.vue'
import Users from '../views/Users/Users.vue'
import AddUser from '../views/Users/AddUser.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {path:'/',name:"About",component:About},
      {path:'Users',name:"Users",component:Users},
      {path:'AddUser',name:"AddUser",component:AddUser},
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
