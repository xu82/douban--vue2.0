<template>
    <div id="movieDetail">
        <!--ha，我是电影的详情页{{$route.params.id}}-->
      <div class="detail-header" :style="{background:headerColor}">
        <!--<div class="bgImg" :style="ObgImg"></div>-->
        <img class="headerImg" :src="imgLink" alt="">
      </div>
      <div class="info">
        <div class="infos">
          <p class="info-title">{{details.title}}</p>
          <p>
            <span>{{details.year}}</span>
            <span>{{types}}</span>
          </p>
          <p v-show="details.original_title!=details.title">原名：{{details.original_title}}</p>
          <p>上映时间：{{details.year}}</p>
          <p>片长：</p>
        </div>
        <div class="rating">
          <span class="average" v-show="details.rating.average!=0">{{details.rating.average}}</span><br>
          <span class="stars" :style="bgPositionY"></span><br>
          <span class="ratings_count">{{details.rating.average!=0?details.ratings_count+'人':'评价人数不足'}}</span>
        </div>
      </div>
      <div class="interest_select">
        <span class="insteresting">想看</span>
        <div class="evaluate">
          <i>看过</i>
          <i class="star1"></i>
          <i class="star2"></i>
          <i class="star3"></i>
          <i class="star4"></i>
          <i class="star5"></i>
        </div>
      </div>
      <div class="story_info">
        <p class="info-top">简介</p>
        <p class="info-content">
          <span>{{details.summary}}</span>
          <span style="color:green;">展开</span>
        </p>
      </div>
      <div class="actor_info">
        <span></span>
        <ul>
          <li>
            <div></div>
          </li>
        </ul>
      </div>
      <loading v-show="isLoading"></loading>
    </div>
</template>

<script type="es6">
  import {getColor} from '../../assets/rgbaster';
  import {fetch} from '../../store/api'
  import loading from '../../components/loading.vue'
  export default{
    components:{
      loading
    },
    data:function(){
      return {
        isLoading:true,
        details:{
          rating:''
        },
        imgLink:'',
        headerColor:''
      }
    },
    mounted:function(){
        this.getDetail();
    },
    methods:{
      getDetail(){
        const _this=this;
        fetch('/v2/movie/subject/'+this.$route.params.id)
          .then(responseData =>{
            console.log(responseData);
            this.details=responseData.data;
            this.imgLink=this.details.images.large;
            getColor().colors(this.imgLink,{
              success: function(payload) {
                // payload.dominant是主色，RGB形式表示
                // payload.secondary是次色，RGB形式表示
                // payload.palette是调色板，含多个主要颜色，数组
                console.log(payload.dominant);
                console.log(payload.secondary);
                console.log(payload.palette);
                _this.headerColor=payload.dominant;
                _this.isLoading=false;
              }
            });
          })
          .catch(function(){
            console.log(error);
        });
      }
    },
    computed:{
      types(){
        return this.details.genres&&(' / '+this.details.genres.join(' / '))
      },
      bgPositionY(){
        if(this.details.rating){
          return (this.details.rating.stars)&&{'background-position-Y':(Number(this.details.rating.stars)-50)*2.2+'px'}
        }
      }
    }
  }
</script>

<style scoped>
  .detail-header{
    width: 100%;
    height: 2.5rem;
    background: pink;
    padding-top: 0.2rem;
  }
  .bgImg{
    position: absolute;
    top:0.2rem;
    width:220px;
    height:315px;
    background-size: contain;
  }
  .headerImg{
    max-width:150px;
    display: block;
    margin:auto;
  }
  .info{
    position: relative;
    width:100%;
    padding:0.1rem;
    padding-right:20%;
    background:floralwhite;
  }
  .infos{
    font-size:0.12rem;
    color: #666;
  }
  .info-title{
    font-size:0.2rem;
    font-weight: 600;
    color:#000;
    height: 0.38rem;
    line-height:0.38rem;
  }
  .rating{
    position: absolute;
    top: 27px;
    right: 31px;
    width: 0.8rem;
    height: 0.8rem;
    background: #fff;
    text-align: center;
    padding-top:0.12rem;
  }
  .average{
    font-size: 0.18rem;
    font-weight: 600;
  }
  .stars{
    display: inline-block;
    width: 55px;
    height: 11px;
    background: url('https://img3.doubanio.com/f/shire/0147ca9efddcac80050854590d26bee587b008df/pics/rating_icons/ic_rating_s@2x.png') no-repeat;
    background-size: cover;
    background-position-x: 0;
  }
  .ratings_count{
    color:#666;

  }
  /*看过、想看*/
  .interest_select{
    background: floralwhite;
    width:100%;
    height:0.8rem;
    padding:0.1rem 6%;
    font-size: 0;
  }
  .insteresting,.evaluate{
    display: inline-block;
    height:0.38rem;
    line-height: 0.38rem;
    text-align: center;
    width:32%;
    font-size:0.14rem;
    font-weight:600;
    color:pink;
    border:2px solid pink;
    border-radius:0.04rem;
  }
  .insteresting{
    margin-right: 6%;
  }
  .evaluate{
    width:62%;
  }
  /*简介*/
  .story_info{
    width: 100%;
    background: floralwhite;
    overflow: hidden;
    border-top: 1px solid #ccc;
    padding-left: 10px;
    padding-top: 20px;
   }
.info-top{
  height: 0.3rem;
  line-height: 0.3rem;
  color: #666;
  font-size: 0.14rem;
}
  .info-content{
    font-size: 0.14rem;
    line-height: 0.3rem;
    color: #333;
    letter-spacing:1px;
  }
</style>
