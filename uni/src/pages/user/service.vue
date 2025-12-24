<template>
    <Navbar />

    <view class="page">

        <view class="user-info flex-row">

            <wd-img :src="userState!.avatar" width="120rpx" height="120rpx" mode="aspectFill" round custom-style="border: 2px solid #fff;"/>

            <view v-if="isLogin" class="user flex-col">
                <wd-text :text="`Hi, ${ userState!.username }`" color="#fff" size="40rpx" bold />
                <wd-text :text="`ID ${ userState!.id }`" color="#ccc" size="18rpx" />
            </view>

            <view v-if="isLogin" class="user-active">
                <Icon name="edit" color="#999" @click="goTo('/pages/user/update')" />
            </view>
        </view>

        <view class="icon">
            <wd-grid clickable border :column="3" bg-color="#000">
                <wd-grid-item link-type="navigateTo" url="/pages/user/favor">
                    <Icon name="favor" color="#eee" />
                    <view style="margin-top: 16rpx;">我的收藏</view>
                    
                </wd-grid-item>
                <wd-grid-item @itemclick="callPhone('18720063120')">
                    <Icon name="phone" color="#eee" />
                    <view style="margin-top: 16rpx;">客服电话</view>
                </wd-grid-item>
                <wd-grid-item @itemclick="callPhone('18720063120')">
                    <Icon name="service" color="#eee" />
                    <view style="margin-top: 16rpx;">投诉建议</view>
                </wd-grid-item>
            </wd-grid>
        </view>
        

        <view class="menu-group">
            <view class="menu-item" @click="goTo('/pages/shop/shop')">
                <Icon name="cart" color="#666" />
                积分商城
            </view>
            <view class="menu-item" @click="showQrCode = true" >
                <Icon name="qrcode" color="#666"/>
                专属小程序码
            </view>
        </view>

        <view style="padding: 0 64rpx;">
            <wd-divider color="#999"/>
        </view>

        <view class="menu-group">
            <view class="menu-item" @click="goTo('/pages/user/contact')">
                <Icon name="phone" color="#666" />
                联系我们
            </view>
            <view class="menu-item" @click="callPhone('18720063120')">
                <Icon name="service" color="#666" />
                在线客服
            </view>
            <!-- <view class="menu-item" @click="goTo('/pages/user/init')">初始化信息</view> -->
            <!-- <view class="menu-item" @click="userStore.logout()">退出登录</view> -->
        </view>
    </view>

    <wd-overlay 
        :show="showQrCode" 
        @click="showQrCode = false"
    >
        <view class="block flex-row flex-center">
            <view class="qr-content">
                <wd-img :src="QrCode" width="100%" height="360rpx" mode="aspectFill" />
            </view>
        </view>
        
    </wd-overlay>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import Navbar from '@/components/Navbar.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/index'
import { onLoad } from '@dcloudio/uni-app'
import { goTo, callPhone } from '@/utils/common'
import QrCode from '@/assets/images/qrcode.jpg'

const {
    isLogin,
    isFirstLogin,
    userState
} = storeToRefs(useUserStore())

const userStore = useUserStore()

onLoad(async () => {
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

const showQrCode = ref(false)

</script>

<style lang="scss" scoped>

.icon {
    margin: 32rpx 0;
}

.user-info {
    position: relative;
    padding: 64rpx;
    gap: 32rpx;
    padding-bottom: 0;
}

.user-active {
    position: absolute;
    top: 64rpx;
    right: 64rpx;
}
.menu-group {
    color: #ccc;
    box-sizing: border-box;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 32rpx;
    padding: 32rpx 64rpx;
    box-sizing: border-box;
}

.block {
    width: 100%;
    height: 100vh;
}

.qr-content {
    width: 360rpx;
    height: 360rpx;
    padding: 32rpx;
    border-radius: 16rpx;
    background-color: #fff;
}
</style>