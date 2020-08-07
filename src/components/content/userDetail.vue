<template>
  <div class="userDetail">
    <div>
      <div class="userImg">
        <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
        <img src="@/assets/img/default_img.jpg" alt v-else />
      </div>
      <div class="userEdit">
        <div>
          <p>
            <span>0</span>
            <span class="userText">粉丝</span>
          </p>
          <p>
            <span>45</span>
            <span class="userText">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="userText">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="userEditBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2>{{userInfo.name}}</h2>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['userInfo'],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.userDetail {
  background-color: white;
  padding: 0 3.333vw;
  > div:nth-child(1) {
    display: flex;
    .userImg {
      img {
        width: 85px;
        height: 85px;
        border-radius: 50%;
      }
    }
    .userEdit {
      flex: 1;
      div:nth-child(1) {
        display: flex;
        p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 13px;
          .userText {
            color: #aaaaaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 1px solid #cccccc;
        }
      }
      div:nth-child(2) {
        padding: 0.556vw 2.778vw;
        .userEditBtn {
          border: 0.278vw solid #fb7a9f;
          padding: 0.833vw;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fb7a9f;
          border-radius: 4px;
        }
      }
    }
  }
  >div:nth-child(2){
    h2{
      margin: 2.778vw 0 0.833vw 0;
      font-weight: 400;
    }
    p{
      margin: 0.389vw 0;
      color:#999 ;
    }
  }
  
}
</style>
