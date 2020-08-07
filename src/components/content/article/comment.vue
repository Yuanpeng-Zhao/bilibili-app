<template>
  <div class="comment">
    <p class="commentTitle">
      <span>评论</span>
      <span class="span">({{commentLength}})</span>
    </p>

    <div class="commentMyInfo">
      <img :src="userinfo.user_img" alt v-if="userinfo.user_img" />
      <img src="@/assets/img/default_img.jpg" alt v-if="!userinfo.user_img" />
      <input v-model="commentInside" ref="postIpt" type="text" placeholder="说点什么吧" v-if="userinfo.id" />
      <input type="text" placeholder="请先登录" disabled v-if="!userinfo.id" />
      <button @click="commentSubmit">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userinfo"],
  data() {
    return {
      commentLength: null,
      commentInside: "",
    };
  },
  created() {
    this.commentsData();
  },
  mounted() {},
  methods: {
    async commentsData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      this.commentLength = res.data.length;
    },
    commentSubmit(){
      this.$emit('commentSubmit', this.commentInside)
      this.commentInside=''
    },
    focusIpt(){
      this.$refs.postIpt.focus()
    }
  },
};
</script>

<style scoped lang="less">
.commoent {
  padding: 30px 10px;
}
.commentMyInfo {
  padding: 10px 0;
  display: flex;
  img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }
  input {
    background-color: #f4f4f4;
    border-radius: 13px;
    font-size: 12px;
    padding: 0 20px 0 15px;
    margin-left: 10px;
  }
  button {
    border-radius: 12px;
    background-color: #fb7299;
    color: white;
    font-size: 12px;
    padding: 0 15px;
  }
}
.span {
  color: #aaa;
  margin-left: 10px;
}
</style>
