<template>
  <div class="cmts2rd">
    <div class="commentItem" v-for="(item,index) in commentChildInfo" :key="index">
      <div class="userImg">
        <img v-if="item.userinfo &&item.userinfo.user_img" :src="item.userinfo.user_img" alt />
        <img v-else src="@/assets/img/default_img.jpg" alt />
        <p>
          <span v-if="item.userinfo">{{item.userinfo.name}}</span>
          <span v-else>此用户无姓名</span>
          <span>{{item.comment_date}}</span>
        </p>
      </div>

      <div class="commentContent">
        <div v-if="!temp" @click="postItemcomment(item.comment_id)">
          {{item.comment_content}}
          <span 
            class="pubnish" 
            
          >回复</span>
        </div>

        <div v-else @click="postItemcomment(item.comment_id)">
          回复
          <span style="color:#0070ff">@{{item.parent_user_info.name}}</span>
          :{{item.comment_content}}
          <span
            class="pubnish"
            
          >回复</span>
        </div>
      </div>
      <div class="commentChildItem">
        <commentChild-item :commentChildInfo="item.child"  @postChild="postChild" :temp="true"></commentChild-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentChildItem",
  props: ["commentChildInfo", "temp"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    postItemcomment(id) {
      // console.log(id);
      
      this.$emit("postChild", id);
      this.$emit("postPublish", id);
      
      
    },
    postChild(id) {
      console.log(id);
      this.postItemcomment(id);
      
      this.$emit("postPublish", id);
      
    },
  },
};
</script>

<style scoped lang="less">
.cmts2rd {
  .commentItem {
    display: flex;
    flex-direction: column;
    .userImg {
      display: flex;
      img {
        width: 9.722vw;
        height: 9.722vw;
        margin: 0 5px 10px 0;
      }
      p {
        display: flex;
        justify-content: space-between;
        font-size: 3.611vw;
        color: #555;
        margin-bottom: 1.389vw;
        flex: 1;
      }
    }
    .commentContent {
      flex: 1;
      div {
        font-size: 3.611vw;
        position: relative;
        .pubnish {
          color: red;
          position: absolute;
          right: 15px;
        }
      }
    }
    .commentChildItem {
      margin-top: 20px;
    }
  }
}
</style>
