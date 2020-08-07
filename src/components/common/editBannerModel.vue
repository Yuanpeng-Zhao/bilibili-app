<template>
    <div class="editBanner" @click="bannerClick">
        <div class="left"><slot name="left"></slot></div>
        <div class="right"><slot name="right"></slot></div>
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
        bannerClick(){
            this.$emit('bannerClick')
        }
    }
};
</script>

<style scoped lang="less">
.editBanner{
    background-color: white;
    color: #333;
    padding: 4.167vw;
    font-size: 3.889vw;
    border-bottom: 0.278vw solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
