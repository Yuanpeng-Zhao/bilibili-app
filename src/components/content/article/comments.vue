<template>
  <div class="commentParent">
    <div class="commentChild" v-for="(item,index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img v-if="item.userinfo &&item.userinfo.user_img" :src="item.userinfo.user_img" alt />
          <img v-else src="@/assets/img/default_img.jpg" alt />
        </div>

        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span>{{item.comment_date}}</span>
          </p>

          <div>
            {{item.comment_content}}
            <span class="pubnish" @click="pubnishClick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>

      <div class="cmts2rd">
        <cmts2rd :commentChildInfo="item.child" @postPublish="pubnishClick"></cmts2rd>
      </div>
    </div>
  </div>
</template>

<script>
import cmts2rd from "./cmts2rd";

export default {
  data() {
    return {
      commentList: null,
    };
  },
  components: {
    cmts2rd,
  },
  created() {
    this.commentsData();
  },
  mounted() {},
  methods: {
    async commentsData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentList = this.changeCommentData(res.data);
    },
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }

      return fn(null);
    },
    pubnishClick(id){
      this.$emit('pubnishClick',id)
    }
  },
};
</script>

<style scoped lang="less">
.commentParent {
  padding: 5.556vw 2.778vw;
  .commentChild {
    border-bottom: 0.278vw solid #e7e7e7;
    .commentItem {
      display: flex;
      padding: 2.778vw 0;
      .userImg {
        margin-right: 2.778vw;
        img {
          width: 9.722vw;
          height: 9.722vw;
        }
      }
      .commentContent {
        flex: 1;
        p {
          display: flex;
          justify-content: space-between;
          font-size: 3.611vw;
          color: #555;
          margin-bottom: 1.389vw;
        }
        div {
          position: relative;
          font-size: 3.611vw;
          .pubnish {
            color: red;
            position: absolute;
            right: 15px;
          }
        }
      }
    }
    .cmts2rd {
      padding-left: 30px;
    }
  }
}
</style>
