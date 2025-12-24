<template>

    <view
        class="card"
        :style="{
            backgroundImage: `url(${IMG_URL + (item.img.formats.large?.url ?? item.img.url)})`,
			aspectRatio: radio
        }"
        @click="handleClick"
    >
        <view class="title">
            <wd-text :text="item.title" color="rgba(255, 255, 255, 0.75)" custom-style="text-shadow: 0 0 10rpx #000" />
        </view>
    </view>
</template>

<script setup lang="ts">
import { IMG_URL } from '@/config/api.config'

const {
    item,
	radio
} = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
	radio: {
		type: Number,
		default: 4/6
	}
})

const emit = defineEmits(['click'])

const handleClick = () => {
    emit('click', item)
}

</script>

<style lang="scss" scoped>
.card {
    position: relative;
    width: 100%;
	aspect-ratio: 4/6;
    // height: 720rpx;
    // margin-bottom: 16rpx;
	border-bottom: 16rpx solid #000;
    background-size: cover;
    background-position: center;
}

.title {
    position: absolute;
    bottom: 120rpx;
    left: 50%;
    transform: translateX(-50%);
}
</style>