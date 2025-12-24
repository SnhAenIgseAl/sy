<template>
    <Navbar />

    <view class="page" style="padding-top: 100rpx;">

        <view class="flex-row flex-center" >
            <wd-img :src="IMG_URL + logo" width="240rpx" height="240rpx" mode="aspectFill" round="9999rpx" />
        </view>

        <view class="content">
            <view class="item flex-row">
                <Icon name="phone" />
                18720063120（微信同号）
            </view>
            <view class="item flex-row">
                <Icon name="location" />
                云南省丽江市古城区束河街道办事处中济居委会普济村二组34号
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import Navbar from '@/components/Navbar.vue'
import { getHomeData } from '@/api'
import { IMG_URL } from '@/config/api.config'
// import Logo from '@/assets/images/logo.png'
import { onShareAppMessage } from '@dcloudio/uni-app'

onShareAppMessage(() => {
	return {
		title: '丽江全城影像 - 联系我们',
	}
})

const logo = ref('')

getHomeData().then(res => {
	logo.value = res.data.logo.url
})

</script>

<style lang="scss" scoped>
.page {
    background-color: #efefef;
}

.content {
    color: #000;
    margin: 64rpx;
    padding: 32rpx;
    border-radius: 32rpx;
    background-color: #fff;
    box-sizing: border-box;
}

.item {
    gap: 32rpx;
    color: #666;
    padding: 16rpx 0;
    box-sizing: border-box;
}
</style>