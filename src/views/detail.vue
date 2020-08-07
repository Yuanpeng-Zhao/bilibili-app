<template>
  <div v-if="article">
    <user-topBar :cuserInfo="model"></user-topBar>
    <div class="detailInfo">
      <div class="video">
        <video :src="article.content" controls></video>
      </div>

      <div class="detailInfoText">
        <div class="firstLine">
          <span>{{article.category.title}}</span>
          <span>{{article.name}}</span>
        </div>

        <div class="secondLine">
          <span>{{article.userinfo.name}}</span>
          <span>8848次观看</span>
          <span>8848条弹幕</span>
          <span>{{article.date}}</span>
        </div>

        <div class="lastLine">
          <div @click="collectionClick" :class="{activeColor:collectionActive}">
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </div>

          <div @click="subscriptClick" :class="{activeColor:subscriptionActive}">
            <span class="icon-bubble"></span>
            <span>关注</span>
          </div>

          <div>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </div>
        </div>
      </div>

      <div class="singleArticleParent">
        <single-article
          class="singleArticle"
          v-for="(item,index) in commendList"
          :key="index"
          :article="item"
        ></single-article>
      </div>

      <comment :userinfo="model" ref="commentIpt" @commentSubmit="commentSubmit"></comment>
      <comments ref="comments" @pubnishClick="pubnishClick"></comments>
    </div>
  </div>
</template>

<script>
import userTopBar from "components/content/userTopBar";
import singleArticle from "components/content/article/singleArticle";
import comment from "components/content/article/comment";
import comments from "components/content/article/comments";

export default {
  data() {
    return {
      model: {},
      article: null,
      commendList: null,
      postCom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null,
      },
      collectionActive: null,
      subscriptionActive:null
    };
  },
  components: {
    userTopBar,
    singleArticle,
    comment,
    comments,
  },
  created() {
    if (localStorage.getItem("token")) {
      this.userInfoData();
    }
    this.getArticleDetails();
    this.commendData();
    this.collectionInit()
    
    
  },
  watch: {
    $route() {
      this.userInfoData();
      this.getArticleDetails();
      this.commendData();
      this.collectionInit()
    },
  },
  mounted() {},
  methods: {
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
      if(this.model) {
                this.subscriptionInit()
            }
    },

    async getArticleDetails() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.article = res.data[0];
    },

    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    async commentSubmit(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      this.postCom.comment_date = str;
      this.postCom.comment_content = res;
      this.postCom.article_id = this.$route.params.id;
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.postCom
      );
      this.$refs.comments.commentsData();
      this.postCom.parent_id = null;
      if (result.status == 200) {
        this.$msg.fail("评论发送成功");
      }
    },
    pubnishClick(id) {
      this.postCom.parent_id = id;

      this.$refs.commentIpt.focusIpt();
    },
    // 收藏文章
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == '收藏成功') {
          this.collectionActive = true;
        } else {
          this.collectionActive = false;
        }
        this.$msg.fail(res.data.msg)
      }
    },
    // 进入页面后获取是否收藏
    async collectionInit(){
      if(localStorage.getItem('token')){
        const res =await this.$http.get('/collection/'+localStorage.getItem('id'),{
          params:{
            article_id:this.$route.params.id
          }
        })
        this.collectionActive=res.data.success
      }
    },
    // 关注功能
    async subscriptClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post('/sub_scription/'+localStorage.getItem('id'),{sub_id:this.model.userid}
        );
        if (res.data.msg == "关注成功") {
          this.subscriptionActive = true;
        } else {
          this.subscriptionActive = false;
        }
        this.$msg.fail(res.data.msg)
      }
    },
    // async subscriptClick() {
    //        if(localStorage.getItem('token')){
    //            const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'),{sub_id:this.model.userid})
    //            if(res.data.msg == '关注成功'){
    //                this.subscritionActive = true
    //            }else{
    //                this.subscritionActive = false
    //            }
    //            this.$msg.fail(res.data.msg)
               
    //        }
    //     },
    // 进入页面后是否关注用户
    async subscriptionInit(){
      if(localStorage.getItem('token')){
        const res =await this.$http.get('/sub_scription/'+localStorage.getItem('id'),{
          params:{
            sub_id: this.model.userid
          }
        })
        this.subscriptionActive=res.data.success
      }
    },
  },
};
</script>

<style scoped lang="less">
.detailInfo {
  background-color: white;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .detailInfoText {
    padding: 4.167vw;
    .firstLine {
      span:nth-child(1) {
        padding: 0 2.778vw;
        color: #fb7299;
        background-color: #f4f4f4;
        border-radius: 2.778vw;
      }
    }
    .secondLine {
      padding: 2.778vw 2.778vw;
      span {
        color: #aaa;
        font-size: 3.333vw;
      }
      span:nth-child(1) {
        color: black;
        font-size: 4vw;
        padding-right: 2.778vw;
      }
    }
    .lastLine {
      display: flex;
      div {
        display: flex;
        margin-right: 15px;
        align-items: center;
        color: #757575;
        span:nth-child(1) {
          font-size: 21px;
          padding-right: 3px;
        }
        span:nth-child(2) {
          font-size: 13px;
        }
      }
      .activeColor{
        color: #fb7299;
      }
    }
  }
}

.singleArticleParent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .singleArticle {
    width: 45%;
    margin: 1.389vw 0;
  }
}
</style>
