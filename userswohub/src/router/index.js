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
    path: '/courses',
    name: 'Courses',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Courses" */ '../views/Courses.vue')
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
    path: '/resume',
    name: 'Resume',
    component: () => import(/* webpackChunkName: "Resume" */ '../views/Resume.vue')
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
    path: '/survey',
    name: 'SurveyView',
    component: ()=> import(/* webpackChunkName: "SurveyView" */ '../views/SurveyView.vue')
  },
  {
    path: '/personal',
    name: 'PersonalScreen',
    component: ()=> import(/* webpackChunkName: "PersonalScreen" */ '../views/PersonalScreen.vue')
  },
  {
    path: '/careerawards',
    name: 'CareerAwardsView',
    component: ()=> import(/* webpackChunkName: "CareerAwardsView" */ '../views/CareerAwardsView.vue')
  }
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
