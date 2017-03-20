<template>
  <div id="resultList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="rl_head">
      <span>共{{this.resultList.total}}个电影</span>
    </div>
    <ul class="rl_lists">
      <li class="rl_list" v-for="item in resultList.subjects">
        <router-link :to="{name:'movieDetail',params:{id:item.id}}">
          <img :src="item.images.small" alt="">
          <p class="sub_name">{{item.title}}</p>
          <div class="rating">
            <span v-show="item.rating.average!=0" :style="{backgroundPositionY:item.bgPY}" class="stars"></span>
            <span class="score">{{item.rating.average!=0?`&nbsp;&nbsp;${item.rating.average}`:'还没有评分'}}</span>
          </div>
          <p class="daoyan">导演：
            <span v-for="(director,index) in item.directors">{{director.name}}{{index<(item.directors.length-1)?' / ':''}}</span>
          </p>
          <p class="zhuyan">主演：
            <span v-for="(cast,index) in item.casts">{{cast.name}}{{index<(item.casts.length-1)?' / ':''}}</span>
          </p>
        </router-link>
      </li>
    </ul>
    <loading v-show="isLoading"></loading>
  </div>
</template>

<script type="es6">
  import {fetch} from '../store/api'
  import infiniteScroll from 'vue-infinite-scroll'
  import loading from './loading.vue'
  export default{
    directives:{infiniteScroll},
    data(){
      return {
        isLoading:true,
        resultList:{
          subjects:[]
        },
        searchText:'',
        busy:false
      }
    },
    components:{
      loading
    },
    mounted(){
//      alert('在mounted函数只执行一次？答案是是的');
//      console.log(this.$route);
      this.searchText=this.$route.query.search_text;
    },
    watch:{//当该Vue实例被实例化时，会调用$watch(),遍历watch对象的每一个属性
      //'reload' - 方法名
      '$route':'reload'
    },
    methods:{
      reload(){
        this.isLoading=true;
        //要将vue实例的searchText属性的值重新取值下
        this.resultList.subjects = [];
        this.busy = false;
        this.searchText=this.$route.query.search_text;
        this.loadMore();
      },
      loadMore(){
        this.busy=true;//停用下拉刷新功能
        let start=this.resultList.subjects.length;
        fetch(`/v2/movie/search?q=${this.searchText}`,{
          params:{start:start}
        })
          .then(response => {
            console.log(response);
            this.resultList.title=response.data.title;
            this.resultList.total=response.data.total;
            this.resultList.subjects=this.resultList.subjects.concat(response.data.subjects);
            for(let i=0;i<this.resultList.subjects.length;i++){
              let oData=this.resultList.subjects[i];
              this.$set(oData,'bgPY',(Number(oData.rating.stars)-50)*2.2+'px');
            }
            if(this.resultList.subjects.length<this.resultList.total){//当前条数小于总数时
              this.busy=false;//启用下拉可刷新功能
            }
            this.isLoading=false;
          })
          .catch(function(error){
            console.log(error);
          })
      }
    }

  }
</script>

<style scoped>
  .rl_head{
    height:0.4rem;
    line-height:0.4rem;
    padding-left:0.12rem;
    color: #666;
    border-bottom:1px solid #ccc;
    font-size:0.12rem;
  }
  .rl_list {
    position: relative;
    padding: 0.16rem 0 0.16rem 0.95rem;
    height: 1.3rem;
    border-bottom: 1px solid #ccc;
  }
    img{
      position: absolute;
      max-width: 0.65rem;
      top: 0.16rem;
      left: 0.16rem;
    }
    .sub_name{
      font-size: 0.16rem;
      font-weight: 600;
      color: #000;
      height:0.3rem;
      line-height:0.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rating{
      height: 0.2rem;
      line-height: 0.2rem;
      color: #666;
    }
  .stars{
    display: inline-block;
    width: 55px;
    height: 11px;
    background: url('https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s@2x.png') no-repeat;
    background-size: cover;
    background-position-x: 0;
  }
    .daoyan,.zhuyan{
      color: #666;
      height:0.2rem;
      line-height:0.2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow:hidden;
    }

</style>
