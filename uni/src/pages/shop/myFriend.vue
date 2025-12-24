<template>
    <Navbar title="已推好友" />

    <view class="content">
        <wd-card
            v-if="list.length"
            v-for="item in list"
            :key="item.id"
            type="rectangle"
        >
            <template #title>
                <wd-tag v-if="item.friend_status === 'finished'" type="success" round>已完成</wd-tag>
                <wd-tag v-if="item.friend_status === 'pending'" type="warning" round>等待管理员确认</wd-tag>
            </template>
            <view class="flex-col">
                <view class="flex-row info">
                    <Icon name="friend" />
                    <wd-text :text="item.friend_name" size="32rpx" color="#333" />
                </view>
                <view class="flex-row info">
                    <Icon name="phone" />
                    <wd-text :text="item.phone" size="32rpx" color="#333" />
                </view>
                <view class="flex-row info">
                    <Icon name="edit" />
                    <wd-text :text="item.desc" size="32rpx" color="#333" />
                </view>
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
import Icon from '@/components/Icon.vue';
import Navbar from '@/components/Navbar.vue';
import { getFriendList } from '@/api';
import { IMG_URL } from '@/config/api.config';
import { formatDate } from '@/utils/common';

const list = ref([])

getFriendList().then(res => {
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

.info {
    gap: 32rpx;
}
</style>