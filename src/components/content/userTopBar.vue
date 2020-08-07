<template>
  <div>
    <top-bar>
      <template v-slot:left>
        <div class="logoL" @click="$router.push('/')">
          <img src="@/assets/img/logo.png" alt />
        </div>
      </template>

      <template v-slot:middle>
        <div class="searchBar">
          <p>
            <van-icon name="search" class="iptIcon" />
          </p>
        </div>
      </template>

      <template v-slot:right>
        <div class="logoR">
          <img :src="cuserInfo.user_img" alt v-if="cuserInfo.user_img"  @click="$router.push('/userinfo')" />
          <img src="@/assets/img/default_img.jpg" alt v-else  @click="$router.push('/userinfo')" />
          <p>下载App</p>
        </div>
      </template>
    </top-bar>
  </div>
</template>

<script>
import TopBar from "components/common/TopBar";

export default {
  // props: ['cuserInfo'],
  props: ['cuserInfo'],
  data() {
    return {};
  },
  components: {
    TopBar,
  },
  created() {
    
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.logoL {
  width: 30.556vw;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 88px;
  }
}

.searchBar {
  flex: 1;
  display: flex;
  align-items: center;
  p {
    font-size: 3.333vw;
    line-height: 7.222vw;
    background-color: #f4f4f4;
    height: 6.389vw;
    position: relative;
    padding-left: 6.944vw;
    width: 100%;
    border-radius: 3.611vw;
    color: #aaaaaa;
    .iptIcon {
      position: absolute;
      left: 2.778vw;
      top: 50%;
      transform: translate(0, -40%);
    }
  }
}

.logoR {
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 24px;
    width: 24px;
  }
  p {
    padding: 5px 10px;
    background-color: #fb7299;
    color: white;
    margin: 0 8px;
    font-size: 13px;
    border-radius: 3px;
  }
}
</style>
