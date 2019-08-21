<template>
    <div id="news">

        <nav v-if="SmallImageUrls" class="news_nav">
            <div class="SmallImageUrls" :style="{backgroundImage:'url('+SmallImageUrls.SmallImageUrl+')'}"></div>
            <div class="back">
                <div>
                    <p>{{SmallImageUrls.Title}}</p>
                    <div class="BriefContent">{{SmallImageUrls.BriefContent}}</div>
                </div>
            </div>
            <!-- <img class="back" src="~/static/images/back.png" alt="" srcset=""> -->
        </nav>

        <div class="news_class">
            <div class="zhenchuang">
                <h2><img class="dengpao" src="~/static/images/dengpao.png" alt="" srcset="">箴创新闻</h2>
                <p v-if="index<6" @click="details(item.Id)" v-for="(item,index) in newList" :key="index">{{item.Title}}</p>
            </div>
            <div class="zhenchuang">
                <h2><img class="feiji" src="~/static/images/feiji.png" alt="" srcset="">跨境新闻</h2>
                <p v-if="index<6" @click="details(item.Id)" v-for="(item,index) in newLists" :key="index">{{item.Title}}</p>
            </div>
        </div>

        <div class="newsList">
            <div class="newsListTab">
                <div class="tabTitle" @click="changeTab(index)" :class="{tabTitleActive: index==newIndex}" v-for="(item,index) in newsCategory" :key="index">
                    <span>{{item.CategoryName}}</span>
                    <section v-if="index==newIndex"></section>
                </div>
            </div>
            <div class="newsLists">
                <div class="newsList_" @click="details(item.Id)" v-for="(item,index) in newIndex == 0?newList:newLists" :key="index">
                    <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                    <div class="contents">
                        <h5>{{item.Title}}</h5>
                        <p><span>时间：{{item.CreateTime}}</span><span>{{item.ViewCount}}已读</span></p>
                        <div class="content">
                            {{item.BriefContent}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="proNews" v-for="(item,index) in newsCategory" :key="index">
            <h5 v-if="newList[index]">{{item.CategoryName}}</h5>
            <div class="proNewsList" v-if="newList[index]">
                <div class="proNewsList_" @click="details(items.Id)" v-for="(items,indexs) in newList[index]" :key="indexs">
                    <section><img :src="items.SmallImageUrl" alt="" srcset=""></section>
                    <span>文章来源</span>
                    <h1>{{items.Title}}</h1>
                    <div>语雀是一款优雅高效的在线文档编辑与协同工具，让每个企业轻松拥有文档中心阿里巴巴集团内部使用多年，众多中小企业首选。</div>
                </div>
                <div class="more" v-if="newList[index].length > 4">更多</div>
            </div>
        </div> -->
        <!-- <div class="CrossNews">
            <h5>跨境新闻</h5>
            <div class="proNewsList">
                <div class="proNewsList_" v-for="(item,index) in 4" :key="index">
                    <section></section>
                    <span>文章来源</span>
                    <h1>心有多大，舞台就有多大</h1>
                    <div>语雀是一款优雅高效的在线文档编辑与协同工具，让每个企业轻松拥有文档中心阿里巴巴集团内部使用多年，众多中小企业首选。</div>
                </div>
                <div class="more">更多</div>
            </div>
        </div> -->

    </div>
</template>
<script>
export default {
    data(){
        return{
            newsCategory:[],
            newIndex:0,
            newList:[],
            newLists:[],
            SmallImageUrls:''
        }
    },
    computed:{

    },
    created(){
        this.$store.dispatch('newsCategory')
        .then(res=>{
            // console.log(res)
            if(res.IsSuccess){
                this.newsCategory = res.Data.List
                // for(let val of res.Data.List){
                //     console.log(val.CategoryId)
                //     this.getList(val.CategoryId)
                // }
                this.getList(0)
                this.getList(1)
            }
        })
    },
    methods:{
        changeTab(index){
            this.newIndex = index
        },
        getList(index){
            this.$store.dispatch('newsList', {CategoryId: this.newsCategory[index].CategoryId, SearchNewsName:''})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    if(index==0){
                        this.SmallImageUrls = res.Data[0]
                        this.newList = res.Data
                    }else{
                        this.newLists = res.Data
                    }
                }
            })
        },
        details(id){
            this.$router.push({name: 'index-newsDetail', query:{id}})
        },
    }
}
</script>
<style lang="less" scoped>
#news{
    width: 100%; min-height: 500px; background-color: #FFFFFF;
}



.ellipsis{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}



.news_nav{
    width: 100%; min-width: 1500px; height: 500px; position: relative; display: flex; align-items: center; justify-content: flex-end;
    // background:linear-gradient(193deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.34) 37%,rgba(0,0,0,1) 100%);
    .SmallImageUrls{
        width: 1162px; height: 100%; background-repeat: no-repeat; background-size: 100%; margin-right: 125px;
    }
    .back{
        width: 100%; min-width: 1500px; height: 100%; position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center;
        background: url('../../static/images/back.png') no-repeat; background-size: 100% 100%; color: #FFFFFF; font-size: 20px;
        p{color: #FC6619; font-size: 44px;}
        .BriefContent{max-width: 1200px; margin-top: 13px;.ellipsis;}
    }
}
.news_class{
    width: 100%; min-width: 1200px; padding: 50px 0; background-color: #FFFFFF;
    display: flex; justify-content: center;
    .zhenchuang{
        width: 450px; margin-right: 240px;
        h2{
            font-family:PingFangSC-Regular; font-weight:400; font-size: 24px; margin-bottom: 15px;
            .dengpao{width: 21px; height: 28px; margin-right: 15px; position: relative; top: 5px;}
            .feiji{width: 33px; height: 33px; margin-right: 15px; position: relative; top: 5px;}
        }
        p{
            color: #939393; font-size: 14px; line-height: 25px; cursor: pointer;
        }
    }
    .zhenchuang:last-child{margin-right: 0;}
}




.newsList{
    width: 100%; background-color: #F7F7F7; padding: 35px 0;
    .newsListTab{
        width: 1200px; margin: 0 auto; display: flex;
        .tabTitle{
            margin-right: 80px; font-size: 24px; color: #515356;font-family:PingFangSC-Regular;font-weight:400;
            line-height: 33px; cursor: pointer;
            section{
                width: 64px; height: 4px; margin: 0 auto; 
                background:linear-gradient(270deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
            }
        }
        .tabTitleActive{ color: #333333; }
    }
    .newsLists{
        width: 1200px; margin: 0 auto;
        .newsList_{
            width: 100%; height: 190px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;
            section{
                width: 216px; height: 130px; background-color:#939393; border-radius: 5px;
                img{width: 100%; height: 100%; border-radius: 5px;}
            }
            .contents{
                width: 955px; height: 100%; border-bottom: 1px solid #D5D4D4;
                h5{color: #515356; font-size: 18px; margin-top: 50px;}
                p{span{color: #939393; font-size: 12px; margin-right: 30px;} margin-top: 3px;}
                .content{
                    width: 100%; height: 35px; line-height: 17.5px; font-size: 14px; .ellipsis;
                    color: #515356; margin-top: 15px;
                }
            }
        }
    }
}





// .proNews,.CrossNews{
//     width: 1200px; margin: 40px auto; position: relative;
//     h5{font-size: 24px; color: #333333;font-family:PingFangSC-Regular; font-weight:400;}
//     .proNewsList{
//         width: 100%; display: flex; flex-wrap: wrap; margin-top: 30px; cursor: pointer;
//         .proNewsList_{
//             width: 560px; height: 433px; margin-bottom: 50px; margin-right: 20px;
//             section{width: 100%; height: 301px; background-color: #EEEEEE; margin-bottom: 14px; border-radius: 5px;
//                 img{width: 100%; height: 100%; border-radius: 5px;}
//             }
//             span{font-size: 14px; color: #FC6619;}
//             h1{font-size: 34px; color: #515356;font-family:PingFangSC-Regular;font-weight:400;}
//             div{
//                 width: 100%; font-size: 16px; color: #939393; margin-top: 5px;
//             }
//         }
//         .more{
//             width: 130px; height: 37px; border-radius: 19px; border:1px solid rgba(252,102,25,1); text-align: center;
//             line-height: 37px; color: #FC6619;font-family:PingFangSC-Semibold; font-weight:600; 
//             position: absolute; bottom: 0; left: 510px;
//         }
//     }
// }

// .CrossNews{
//     margin-top: 60px;
// }



</style>

