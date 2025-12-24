<template>
    
    <Navbar />
    <view class="page">
			<wd-tabs
			    v-model="tab" 
			    swipeable 
			    sticky
			    :offset-top="78"
				slidable="always"
			    @click="switchTab"
			>
        
            <block 
                v-for="item in tabList" 
                :key="item"
            >
                <wd-tab :title="`${ item.title }`">
                    <view class="content">
                        <wd-row :gutter="16">
                            <wd-col
                                v-if="list"
                                v-for="clothes in list"
                                :key="clothes.id"
                                :item="clothes"
                                :span="12"
                            >
                                <view 
									class="clo-item" 
                                    @click="goTo(`/pages/detail/detail?id=${clothes.details[0].documentId}`)"
                                > 
									<view class="clo-img" :style="{backgroundImage: `url(${IMG_URL + clothes.img.formats.medium.url})`}"></view>
                                    <!-- <wd-img
                                        :src="IMG_URL + clothes.img.formats.medium.url"
                                        width="100%"
                                        height="100%"
                                        mode="aspectFill"
										custom-style="aspect-ratio: 4/6;"
                                    /> -->
                                    {{ clothes.title }}
                                </view>
                                
                            </wd-col>
                        </wd-row>
                    </view>
                    
                </wd-tab>
            </block>
        </wd-tabs>
        
    </view>

</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getClassL2, getClassL3 } from '@/api/index'
import { IMG_URL } from '@/config/api.config'
import { goTo } from '@/utils/common'
import Card from '@/components/Card.vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';

const tab = ref(0)
const tabList = ref([])
const list = ref([])

onLoad(async e => {
    await getClassL2(e.id).then(res => {
        tabList.value = res.data.class_l2
    })

    await getClassL3(
        tabList.value[0].documentId
    ).then(res => {
        list.value = res.data.class_l3
    })
})

onShareAppMessage(() => {
	return {
		title: '丽江全城影像',
	}
})

const switchTab = (e) => {
    getClassL3(
        tabList.value[tab.value].documentId
    ).then(res => {
        list.value = res.data.class_l3
    })
}

</script>

<style scoped lang="scss">

.content {
    background-color: #000;
    box-sizing: border-box;
    padding-top: 32rpx;
}
.clo-item {
    // margin: 32rpx;
    // flex-basis: 50%;
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 16rpx;
	margin-bottom: 16rpx;
	aspect-ratio: 4/6;
}

.clo-img {
	width: 100%;
	aspect-ratio: 4/6;
	background-size: cover;
	background-position: center;
}
</style>