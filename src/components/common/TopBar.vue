<template>
    <div>
      <div class="LoginTop">
          <div class="left"><slot name="left"></slot></div>
          <div class="middle"><slot name="middle"></slot></div>
          <div class="right"><slot name="right"></slot></div>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="less">
.LoginTop{
    height: 45px;
    background: #ffffff;
    display: flex;
    div{
         flex: 1;
         display: flex;
         justify-content: center;
         align-items: center;
    }
}

.right{
    font-size: 3.611vw;
}

.middle{
    font-size: 4.444vw
}
</style>
