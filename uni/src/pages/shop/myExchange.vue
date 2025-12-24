<template>
    <Navbar title="已兑礼品" />

    <view class="content">
        <wd-card
            v-if="list.length"
            v-for="item in list"
            :key="item.id"
            type="rectangle"
        >
            <template #title>
                <view class="flex-row" style="gap: 32rpx">
                    <wd-text :text="item.shop.name" size="32rpx" color="#333" />
                    <wd-tag v-if="item.exchange_status === 'finished'" type="success" round>已完成</wd-tag>
                    <wd-tag v-if="item.exchange_status === 'delivered'" type="warning" round>已发货</wd-tag>
                    <wd-tag v-if="item.exchange_status === 'pending'" type="warning" round>等待管理员确认</wd-tag>
                </view>
            </template>

            <view class="body flex-row">
                <wd-img 
                    :src="IMG_URL + (item.shop.primary_img.formats.medium?.url ?? item.shop.primary_img.url)"
                    width="180rpx"
                    height="180rpx"
                    mode="aspectFill"
                    radius="16rpx"
                />

                <view class="info flex-col">
                    <wd-text :text="item.address" color="#333" size="32rpx" />
                    <wd-text v-if="item.postscript" :text="item.postscript" />
                </view>
            </view>
            <wd-divider v-if="item.exchange_status === 'delivered'" color="#ccc" />
            <wd-text v-if="item.exchange_status === 'delivered'" :text="`快递单号：${item.courier_number}`" color="#333" size="32rpx" />

            <template #footer>
                <wd-text :text="formatDate(item.createdAt)" />
            </template>
        </wd-card>

        <Nothing v-else />
    </view>

</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { getExchangeList } from '@/api';
import { IMG_URL } from '@/config/api.config';
import { formatDate } from '@/utils/common';
import Nothing from '@/components/result/nothing.vue';

const list = ref([])

getExchangeList().then(res => {
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
    gap: 32rpx;
}

.info {
    height: 180rpx;
    gap: 32rpx;
}
</style>