import VueRouter from 'vue-router'
import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

import movies from './views/movie/movies.vue'
import movieDetail from './views/movie/movieDetail.vue'
import resultList from './components/resultList.vue'
import movieList from './views/movie/movieList.vue'


Vue.use(VueRouter);

const routes=[
  {path:'/',component:movies},
  {path:'/movies',component:movies},
  {path:'/movies/movieDetail/:id',name:'movieDetail',component:movieDetail},
  {path:'/movies/movieSearch',name:'movieSearch',component:resultList},
  {path:'/movies/list',name:'movieList',component:movieList}
];

const router=new VueRouter({
  routes
});

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app');
