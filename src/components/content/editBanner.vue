<template>
  <div v-if="model" class="editerView">
    <div class="uploadFile">
      <van-uploader class="uploadImg" preview-size="100vw" :after-read="afterRead" />

      <edit-banner-model>
        <template v-slot:left>
          <span>头像</span>
        </template>
        <template v-slot:right>
          <img :src="model.user_img" alt v-if="model.user_img" />
          <img src="@/assets/img/default_img.jpg" alt v-else />
        </template>
      </edit-banner-model>
    </div>

    <edit-banner-model @bannerClick="show=true">
      <template v-slot:left>
        <span>昵称</span>
      </template>
      <template v-slot:right>
        <a href="javascript:;">{{model.name}}</a>
      </template>
    </edit-banner-model>

    <edit-banner-model>
      <template v-slot:left>
        <span>UID</span>
      </template>
      <template v-slot:right>
        <span>{{model.id}}</span>
      </template>
    </edit-banner-model>

    <edit-banner-model @bannerClick="genderShow=true">
      <template v-slot:left>
        <span>性别</span>
      </template>
      <template v-slot:right>
        <span>{{model.gender?"男":"女"}}</span>
      </template>
    </edit-banner-model>

    <edit-banner-model @bannerClick="textshow=true">
      <template v-slot:left>
        <span>个性签名</span>
      </template>
      <template v-slot:right>
        <span>{{model.user_desc}}</span>
      </template>
    </edit-banner-model>

    <div class="editBack" @click="$router.back()" >返回个人中心</div>

    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @cancel="content=''"
      @confirm="confirmClick"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>

    <van-dialog
      v-model="textshow"
      title="个性签名"
      show-cancel-button
      @cancel="text=''"
      @confirm="textareaClick"
    >
      <van-field v-model="text" type="textarea" autofocus />
    </van-dialog>

    <van-action-sheet v-model="genderShow" :actions="actions" cancel-text="取消" @select="onSelect" />
  </div>
</template>

<script>
import editBannerModel from "components/common/editBannerModel";

export default {
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      content: "",
      text: "",
      genderShow: false,
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 },
      ],
    };
  },

  components: {
    editBannerModel,
  },
  created() {
    this.selectUser();
  },

  mounted() {},
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
      this.$emit('fromChild',this.model)
    },

    async afterRead(file) {
      // 此时可以自行将头像上传至服务器

      const formdata = new FormData();
      formdata.append("file", file.file);
      const res = await this.$http.post("/upload", formdata);
      this.model.user_img = res.data.url;
      this.userUpdata();
    },

    async userUpdata() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg.fail("修改成功");
      }
    },
    confirmClick() {
      this.model.name = this.content;
      this.userUpdata();
    },
    textareaClick() {
      this.model.user_desc = this.text;
      this.userUpdata();
    },
    onSelect(data) {
      this.model.gender = data.val;
      this.userUpdata();
      this.genderShow = false;
    },
  },
};
</script>

<style scoped lang="less">
.editerView a {
  color: #333;
}
.editerView img {
  height: 11.111vw;
  width: 11.111vw;
  border-radius: 50%;
}
.uploadFile {
  position: relative;
  overflow: hidden;
  .uploadImg {
    opacity: 0;
    position: absolute;
  }
}
.editBack{
  background-color: white;
  margin-top: 5.556vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vm;
  color: #999;
  padding: 4.167vw 0;
}
</style>
