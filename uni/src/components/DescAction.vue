<template>
    <view class="content">
        <view class="action flex-row">
            <view class="action-item flex-col" @click="showShare = true">
                <Icon name="upload" color="#fff" />
                <wd-text text="分享" color="#fff" size="24rpx" />
            </view>

            <view 
                v-if="!isFavorited"
                class="action-item flex-col" 
                @click="handleFavor(info.documentId)"
            >
                <Icon name="favor" color="#fff" />
                <wd-text text="收藏" color="#fff" size="24rpx" />
            </view>

            <view 
                v-else
                class="action-item flex-col flex-center" 
                @click="handleDisfavor(info.documentId)"
            >
                <Icon name="favorfill" color="orange" />
                <wd-text text="已收藏" color="fff" size="24rpx" />
            </view>

            <view 
                v-if="!isLiked"
                class="action-item flex-col" 
                @click="handleLike(info.documentId)"
            >
                <Icon name="appreciate" color="#fff" />
                <wd-text :text="likeCount" color="#fff" size="24rpx" />
            </view>

            <view 
                v-else
                class="action-item flex-col flex-center" 
                @click="handleDislike(info.documentId)"
            >
                <Icon name="appreciatefill" color="#fe0000" />
                <wd-text :text="likeCount" color="#fff" size="24rpx" />
            </view>
        </view>

        <view class="contact flex-row flex-center" @click="callPhone('18720063120')" >
            <Icon name="weixin" color="#fff"/>
            在线咨询
        </view>
    </view>

    <wd-action-sheet 
        v-model="showShare" 
        @close="showShare = false" 
    >
        <button open-type="share" class="friend">
            转发给微信好友
        </button>
        <!-- <button open-type="share" class="friend">
            生成海报
        </button> -->
    </wd-action-sheet>

    <wd-toast />
    <wd-message-box />
</template>

<script setup lang="ts">
import { useToast, useMessage } from 'wot-design-uni';
import Icon from './Icon.vue';
import { getMyLikeFavor, like, dislike, favor, disfavor } from '@/api'
import { IMG_URL } from '@/config/api.config';
import { callPhone, goTo } from '@/utils/common';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const {
    info
} = defineProps({
    info: {
        type: Object,
        required: true,
    }
})

const userStore = useUserStore()

const {
    isLogin,
    isFirstLogin
} = storeToRefs(useUserStore())

const toast = useToast()
const message = useMessage()

const showShare = ref(false)
// const panels = ref([
//     {
//         iconUrl: '//img12.360buyimg.com/imagetools/jfs/t1/122016/33/6657/1362/5f0692a1E8708d245/e47299e5945a6956.png',
//         title: '微信好友'
//     }
// ])

const isLiked = ref(false)
const isFavorited = ref(false)
const likeCount = ref(info.like_count)

getMyLikeFavor(info.documentId).then(res => {
    if (res.code === 0) {
        isLiked.value = res.data.isLiked
        isFavorited.value = res.data.isFavorited
    }
})

const noLoginMessage = () => {
    message
        .confirm({
            msg: '尚未登录，是否立即登录？',
            title: '提示'
        })
        .then(async () => {
            await userStore.login()

            if (isFirstLogin.value) {
                goTo('/pages/user/init')
            }
        })
}

const handleLike = (id: string) => {

    if (!isLogin.value) {
        noLoginMessage()
        return
    }

    like(id).then(res => {
        if (res.code === 0) {
            toast.success('点赞成功')
            isLiked.value = true
            likeCount.value += 1
        }
    })
}

const handleDislike = (id: string) => {
    dislike(id).then(res => {
        if (res.code === 0) {
            isLiked.value = false
            likeCount.value -= 1
        }
    })
}

const handleFavor = (id: string) => {

    if (!isLogin.value) {
        noLoginMessage()
        return
    }

    favor(id).then(res => {
        if (res.code === 0) {
            toast.success('收藏成功')
            isFavorited.value = true
        }
    })
}

const handleDisfavor = (id: string) => {
    disfavor(id).then(res => {
        if (res.code === 0) {
            isFavorited.value = false
        }
    })
}
</script>

<style scoped lang="scss">
.content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    position: sticky;
    z-index: 9;
    bottom: 0;
    width: calc(100% - 128rpx);
    padding: 32rpx 64rpx;
    color: #eee;
    box-sizing: content-box;
    background-color: #000;
}

.action {
    gap: 64rpx;
}

.action-item {
    align-items: center;
}

.contact {
    gap: 16rpx;
}

.share-item {
    flex-grow: 1;
}
.friend {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: unset;
}
</style>