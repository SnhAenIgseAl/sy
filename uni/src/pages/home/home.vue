<template>
    <view class="button" @click="goTo(clickUrl)">即刻了解</view>

    <view class="content" v-if="videoUrl">
        <video 
			:src="IMG_URL + videoUrl" 
			:autoplay="true"
			:enable-progress-gesture="false"
			:controls="false"
			loop
		>
		</video>
    </view>
</template>

<script setup lang="ts">
import { getHomeData } from '@/api';
import { IMG_URL } from '@/config/api.config';
import { goTo } from '@/utils/common';

const videoUrl = ref('')
const clickUrl = ref('')

getHomeData().then((res) => {
    videoUrl.value = res.data.home_video.url
    clickUrl.value = res.data.home_click_url
});
</script>

<style lang="scss" scoped>
.button {
    position: fixed;
    z-index: 9;
    bottom: 30%;
    left: 50%;
    font-size: 24rpx;
    color: #fff;
    transform: translateX(-50%);
    border-radius: 999rpx;
    padding: 16rpx 64rpx;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.15);
    border: 2px solid #fff;
    box-sizing: border-box;
}

.content {
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100%;

    video {
        width: 100%;
        height: 100%;
    }
}
</style>