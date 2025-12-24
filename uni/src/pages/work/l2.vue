<template>
    
    <Navbar />
    <view class="page">
        <view class="content">
            <wd-row :gutter="16">
                <wd-col
                    v-if="list"
                    v-for="item in list"
                    :key="item.id"
                    :item="item"
                    :span="12"
                >
                    <view class="item"
                        @click="goTo(`/pages/detail/detail?id=${item.details[0].documentId}`)"
                    > 
						<view class="item-img" :style="{backgroundImage: `url(${IMG_URL + item.img?.formats?.medium?.url})`}"></view>
                        <!-- <wd-img
                            :src="IMG_URL + item.img.formats.medium.url"
                            width="100%"
                            height="360rpx"
                            mode="aspectFill"
                        /> -->
                        {{ item.title }}
                    </view>
                </wd-col>
            </wd-row>
        </view>
    </view>
    

</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getClassL2 } from '@/api/index'
import { IMG_URL } from '@/config/api.config'
import { goTo } from '@/utils/common'
import Card from '@/components/Card.vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';

onShareAppMessage(() => {
	return {
		title: '丽江全城影像',
		path: '/pages/index/index',
		imageUrl: Logo
	}
})

const list = ref([])

onLoad(e => {
    getClassL2(e.id).then(res => {
        list.value = res.data.class_l2
    })
})

</script>

<style scoped lang="scss">
.content {
    padding-top: 32rpx;
}

.item {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 16rpx;
}

.item-img {
	width: 100%;
	aspect-ratio: 4/6;
	background-size: cover;
	background-position: center;
}
</style>