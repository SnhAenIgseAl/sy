<template>
    <view class="page">
        <view v-if="info.desc_video" class="video">
            <video 
                :src="IMG_URL + info.desc_video.url"
            >
            </video>
        </view>

        <view class="flex-col">
            <wd-img
                v-if="info.desc_imgs"
                v-for="item in info.desc_imgs"
                :key="item.id"
                width="100%"
                mode="widthFix"
                lazy-load
                :src="IMG_URL + item.formats.large.url"
                :custom-style="`margin-bottom: ${bottom}rpx;`"
            />
        </view>
    </view>

    <DescAction v-if="info" :info="info" />

</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import DescAction from './DescAction.vue';
import { IMG_URL } from '@/config/api.config'

const {
    info,
	bottom
} = defineProps({
    info: {
        type: Object,
        default: () => ({})
    },
	bottom: {
		type: Number,
		default: 16
	}
})

console.log('desc' + info.documentId);

</script>

<style scoped lang="scss">
.video {
    width: 100%;
    height: 500rpx;

    video {
        width: 100%;
        height: 100%;
    }
}
</style>