import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PasswordView from '@/views/PasswordView.vue'
import { auth } from '@/db/firebase'
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/password',
    name: 'password',
    component: PasswordView,
    meta: {requiresAuth: true}
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// buscas en las ruta actual que es to y la siguente ruta que es next

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if(to.meta.requiresAuth && !user){ 
        next({name: 'login'})
      } 
    else if( user && (to.name == 'login' || to.name == 'register')){
        next({name: 'password'})
      }
    else{
      next()
    } 
  
})

})




export default router
