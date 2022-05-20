import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Home.vue'),
    meta: {
      authRequired: true,
    },
  },

  {
    path: '/login',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "LogIn" */ '../views/LogIn.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Home.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/goals',
    name: 'Goals',
    component: ()=> import(/* webpackChunkName: "InterestsView" */ '../views/InterestsView.vue')
  },
  {
    path: '/survey',
    name: 'SurveyView',
    component: ()=> import(/* webpackChunkName: "SurveyView" */ '../views/SurveyView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        next();
      }else{
        next({
          path: '/login',
        });
      }
    });

  } else {
    next();
  }
});

export default router;
