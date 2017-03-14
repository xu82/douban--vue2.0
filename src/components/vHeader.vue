<template>
    <div id="header">
        <div class="navSearch">
            <span class="logo">豆瓣电影</span>
            <input @keyup.enter="search" v-model="searchText" id="query" class="search_input" maxlength="66" placeholder="电影、电视剧">
        </div>
        <ul class="navLists">
            <li class="nav-list" @click="selectStyle(item,index)" :class="{active:item.isActive,unActive:!item.isActive}" v-for="(item,index) in items">
                <router-link :to="item.path">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data:function(){
            return {
              searchText:'',
                items:[
                    {title:'选电影',path:'/movies',isActive:true},
                    {title:'电视剧',path:'/television'},
                    {title:'排行榜',path:'/chart'},
                    {title:'影评',path:'/best'}
                ]
            }
        },
        methods:{
            selectStyle:function(item,index){
                const _this=this;
                this.items.forEach(function(v){//遍历items
                  _this.$set(v,'isActive',false);
                });
                this.$set(item,'isActive',true);//这里item是正在点击的栏目，处于被选中状态
            },
          search:function(){
            this.$router.push({path:'/movies/movieSearch',query:{'search_text':this.searchText}});
          }
        }
    }
</script>

<style scoped>
    #header{
        position: fixed;
        top: -1px;
        left: 0;
        z-index: 100;
        width: 100%;
        background: #f0f3f5;
    }
    /*搜索栏*/
    .navSearch{
        width:100%;
        height:0.5rem;
        background: #f0f3f5;
        border-bottom:1px solid #ccc;
    }
    .logo{
        display: inline-block;
        width:30%;
        line-height: 0.5rem;
        padding-left: 0.1rem;
        font-size:0.18rem;
        font-weight:500;
        color: #27a;
    }
    .search_input{
        border:none;
        width: 60%;
        height: 0.3rem;
        border-radius: 0.14rem;
        padding-left:0.1rem;
    }
    /*导航栏*/
    .navLists{
        /*width:100%;*/
        width:7.7rem;
        overflow: hidden;
        background: #f0f3f5;
        height:0.4rem;
        font-size:0;
        padding:0 0.05rem;
    }
    .active{
      border-bottom: 2px solid #27a;
    }
    .unActive{
      border-bottom:none;
    }
    .nav-list{
        display:inline-block;
        width:0.77rem;
        font-size:0.14rem;
        text-align: center;
        height:0.4rem;
        line-height: 0.4rem;
    }
    .nav-list a{
      color: #27a;
      cursor: pointer;
    }
</style>
