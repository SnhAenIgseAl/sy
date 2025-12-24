<template>
    <Navbar title="我的收藏" />

    <view class="content">
        <wd-card
            v-if="list.length"
            v-for="item in list"
            :key="item.id"
            type="rectangle"
        >

            <view 
                class="flex-row body"
                @click="goTo(`/pages/detail/detail?id=${item.detail.documentId}`)"
            >
                <wd-text :text="item.detail.title" color="#333" size="32rpx" />
                <wd-img 
                    :src="IMG_URL + item.detail.desc_imgs[0].formats.medium.url"
                    width="180rpx"
                    height="180rpx"
                    mode="aspectFill"
                    radius="16rpx"
                />
            </view>

            <template #footer>
                <wd-text :text="formatDate(item.createdAt)" />
            </template>
        </wd-card>

        <Nothing v-else />
    </view>

</template>

<script setup lang="ts">
import Nothing from '@/components/result/nothing.vue';
import Navbar from '@/components/Navbar.vue';
import { getFavorList } from '@/api';
import { IMG_URL } from '@/config/api.config';
import { formatDate, goTo } from '@/utils/common';

const list = ref([])

getFavorList().then(res => {
    console.log(res);
    list.value = res.data
})
</script>

<style scoped lang="scss">
.content {
    padding: 32rpx 0;
    min-height: 100vh;
    background-color: #efefef;
}

.body {
    align-items: flex-start;
    justify-content: space-between;
}
</style>