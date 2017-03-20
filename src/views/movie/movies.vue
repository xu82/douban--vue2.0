<template>
    <div id="movies">
        <div class="title">
            <span>电影票 - 杭州</span>
        </div>
        <div class="nowPlaying">
            <div class="mob-title">
                <span>正在上映</span>
                <router-link :to="{name:'movieList',query:{type:'in_theaters'}}">
                  <div class="more">
                    <span>更多</span><i class="arrow"></i>
                  </div>
                </router-link>
            </div>
            <div class="mob-main">
                <ul class="lists">
                  <li class="list-item" v-for="item in inTheaters.subjects">
                    <router-link :to="{name:'movieDetail',params:{id:item.id}}">
                      <div class="list-item-content">
                        <img class="imgs" :src="item.images.medium">
                        <p class="item-name">{{item.title}}</p>
                        <p class="item-rating">
                          <span class="rating-star" :style="item.bgPY" v-if="item.rating.average!=0"></span>
                          <span class="rating-score">{{item.rating.average!=0==0?'暂无评分':item.rating.average}}</span>
                        </p>
                      </div>
                    </router-link>
                  </li>
                </ul>
            </div>
        </div>
        <div class="upComing">
            <div class="mob-title">
                <span>即将上映</span>
                <router-link :to="{name:'movieList',query:{type:comingSoon.type}}">
                  <div class="more">
                    <span>更多</span><i class="arrow"></i>
                  </div>
                </router-link>
            </div>
            <div class="mob-main">
                <ul class="lists">
                  <li class="list-item" v-for="item in comingSoon.subjects">
                    <router-link :to="{name:'movieDetail',params:{id:item.id}}">
                      <div class="list-item-content">
                        <img class="imgs" :src="item.images.medium">
                        <p class="item-name">{{item.title}}</p>
                        <p class="item-collect">
                          {{item.collect_count+'人想看'}}
                        </p>
                      </div>
                    </router-link>
                  </li>
                </ul>
            </div>
        </div>
      <loading v-show="isLoading"></loading>
    </div>
</template>

<script type="es6">
    import {fetch} from '../../store/api'
    import loading from '../../components/loading.vue'
    export default{
        data(){
            return{
              isLoading:true,
              inTheaters:{
                apiUrl:'/v2/movie/in_theaters',
                type:'in_theaters',
                subjects:[]
              },
              comingSoon:{
                apiUrl:'/v2/movie/coming_soon',
                type:'coming_soon',
                subjects:[]
              }
            }
        },
        components:{
            loading
        },
        mounted(){
          this.getHottingMovies();
          this.getComingMovies();
        },
        methods:{
          getHottingMovies(){
            let url=this.inTheaters.apiUrl;
            let oSend={
              city:'杭州',
              start:0,
              count:6
            };
            fetch(url,oSend).then(responseData=>{
              this.inTheaters.subjects=this.inTheaters.subjects.concat(responseData.data.subjects);
              for(let i=0;i<this.inTheaters.subjects.length;i++){
                let oData=this.inTheaters.subjects[i];
                this.$set(oData,'bgPY',{'backgroundPositionY':(Number(oData.rating.stars)-50)*2.2+'px'});
                this.isLoading=false;
              }
            })
          },
            getComingMovies(){
              let url=this.comingSoon.apiUrl;
              let oSend={
                city:'杭州',
                start:0,
                count:6
              }
              fetch(url,oSend)
                .then(responseData=>{
                  // console.log(response);
                  this.comingSoon.subjects=this.comingSoon.subjects.concat(responseData.data.subjects);
                  this.isLoading=false;
                })
            }
        }
    }
</script>

<style scoped>
  #movies{
    background: #f0f0f0;
  }
  .title,.nowPlaying,.upComing{
    background: #fff;
  }
  .upComing{
    margin-top:0.2rem;

  }

    /* 头部部分 */
    .title{
        margin-top: 0.06rem;
        padding-left: 0.06rem;
        font-size: 0.18rem;
        height: 0.3rem;
        line-height: 0.3rem;
    }
    .mob-title{
        position: relative;
        font-size: 0.16rem;
        padding-left: 0.06rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border-bottom: 1px solid #eee;
    }
    .more{
        position: absolute;
        top:0;
        right:0;
        width: 0.6rem;
        height: 0.3rem;
        line-height:0.3rem;
        font-size:0.14rem;
        color: #27a;
    }
    .arrow{
        position: absolute;
        width: 0.1rem;
        height: 0.1rem;
        top: 0.09rem;
        right: 0.18rem;
        transform: rotate(45deg);
        border-top: 2px solid #27a;
        border-right: 2px solid #27a;
    }
    .lists{
        width:100%;
        font-size:0;
        padding-left: 0.06rem;
    }
  /*列表部分*/
  .list-item{
    display: inline-block;
    padding-top:0.1rem;
    width:33%;
  }
  .list-item-content{
    width:100%;
    padding-right:0.1rem;
  }
  .imgs{
    width: 0.93rem;
    height: 1.29rem;
  }
  .item-name{
    width: 100%;
    padding:0.05rem 0.1rem 0 0.02rem;
    font-size: 0.12rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    color: #333;
  }
  .item-collect{
    height: 0.25rem;
    line-height: 0.25rem;
    font-size: 0.12rem;
    color: #666;
  }
  .item-rating{
    width:100%;
  }
  .rating-star{
    display: inline-block;
    width: 55px;
    height: 11px;
    background: url('https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s@2x.png') no-repeat;
    background-size: cover;
    background-position-x: 0;
  }
  .rating-score{
    font-size: 0.12rem;
    padding-left: 0.05rem;
    line-height: 1.62;
    color: #aaa;
  }
</style>
