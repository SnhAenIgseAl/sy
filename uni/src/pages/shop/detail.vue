<template>
    <Navbar v-if="info" :title="info.name" />

    <view v-if="info" class="content">

        <view class="primary">
            <wd-img 
                :src="IMG_URL + (info.primary_img.formats?.large?.url ?? info.primary_img.url)" 
                width="100%" 
                height="900rpx"
                mode="aspectFill"
            />

            <view class="primary-info flex-col">
                <wd-text :text="info.name" bold color="#333" size="32rpx" />
                <wd-text :text="info.price" color="goldenrod"  />
            </view>
        </view>

        <view class="flex-col">
            <wd-img
                v-if="info.info_img"
                v-for="item in info.info_img"
                :key="item.id"
                :src="IMG_URL + (item?.formats?.large?.url ?? item.url)" 
                width="100%" 
                mode="widthFix"
            />
        </view>
    </view>

    <view class="bottom">
        <wd-button 
            size="large"
            block 
            @click="goTo(`/pages/shop/cashier?id=${info.documentId}`)" 
            custom-style="background-color: #000;"
        >
            立即兑换
        </wd-button>
    </view>

    <wd-toast />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getShopDetail, exchangeShop } from '@/api'
import { IMG_URL } from '@/config/api.config'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import { useToast } from 'wot-design-uni'
import { goTo } from '@/utils/common'
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const toast = useToast()

const info = ref()

const {
    isLogin,
    isFirstLogin,
    userState
} = storeToRefs(useUserStore())

const userStore = useUserStore()

onLoad(async (e) => {
	getShopDetail(e.id).then(res => {
	    info.value = res.data
	})
	
    if (!isLogin.value) {
        await userStore.login()
        console.log(isLogin.value);
    } else {
        await userStore.setUserInfoAsync()
    }

    if (isFirstLogin.value) {
        goTo('/pages/user/init')
    }
})

onShareAppMessage(() => {
	return {
		title: '丽江全城影像',
		imageUrl: IMG_URL + info.value.primary_img.url
	}
})

// const onExchange = () => {
//     console.log(info.value.documentId);
    
//     exchangeShop(
//         info.value.documentId
//     ).then(res => {
//         if (res.code === 0) {
//             toast.success('兑换成功')
//         } else {
//             toast.error(res.message)
//         }
//     })
// }

</script>

<style lang="scss" scoped>
.primary-info {
    gap: 32rpx;
    padding: 32rpx;
    border-bottom: 32rpx solid #efefef;
}

.bottom {
    position: sticky;
    bottom: 0;
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    background-color: #fff;
}
</style>