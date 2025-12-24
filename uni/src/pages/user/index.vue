<template>
    <Navbar />
    <view class="page">
        <wd-img 
            :src="IMG_URL + banner" 
            width="100%" 
            height="500rpx" 
            mode="aspectFill" 
        />

        <view 
            v-for="(item, index) in menuList"
            :key="index"
            class="menu"
            @click="goTo(item.link)"
        >
            {{ item.title }}
            <span style="float: right;"> → </span>
        </view>

    </view>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { getHomeData } from '@/api'
import { IMG_URL } from '@/config/api.config'
import { goTo} from '@/utils/common'
// const { onShareAppMessage, onShareTimeline } = useShare()

const menuList = [
    {
        title: '联系我们',
        link: '/pages/user/contact'
    },
    {
        title: '积分商城',
        link: '/pages/shop/shop'
    },
    {
        title: '门店位置',
        link: '/pages/user/contact'
    },
    {
        title: '专属客服',
        link: '/pages/user/service'
    }
]

const banner = ref('')
getHomeData().then(res => {
    banner.value = res.data.user_banner_img.formats.large.url
})

</script>

<!-- <script lang="ts">
export default {
    onShareAppMessage(res) { 
        console.log(res);

        return {
            title: '分享标题',
        }
    },
    onShareTimeline() { }
}
</script> -->

<style lang="scss" scoped>
.menu {
    margin: 32rpx;
    padding: 64rpx; 
    color: #ccc;
    background-color: #222;
    box-sizing: border-box;
}
</style>