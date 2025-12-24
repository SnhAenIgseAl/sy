<template>
    <Navbar title="积分商城" />

    <wd-img :src="IMG_URL + banner" width="100%" height="480rpx" mode="aspectFill" />
   
    <view>
        <view class="content flex-col">
            <view class="flex-row" style="gap: 16rpx;">
                <wd-text :text="`您好，${userState?.username}`" color="#333" size="32rpx" />
                <wd-text :text="`ID ${userState?.id}`" size="16rpx" />
            </view>

            <view style="padding-bottom: 16rpx; box-sizing: border-box; border-bottom: 1px solid #ccc;">
                <wd-text text="当前积分"/><br />
                <wd-text :text="userState?.score" bold size="72rpx" color="goldenrod" /><br />
            </view>

            <wd-text text="邀请好友得积分" /><br />
        </view>

        <view class="shop-list">
            <view
                v-if="list"
                v-for="item in list"
                :key="item.id"
                class="shop-class"
            >
                <view class="shop-title">
                    <wd-text :text="item.title" bold color="#333" size="32rpx" />
                </view>

                <view class="shop-content">
                    <view
                        v-for="shop in item.shops"
                        :key="shop.id"
                        class="shop-item"
                        @click="goTo(`/pages/shop/detail?id=${shop.documentId}`)"
                    >
                        <wd-img 
                            :src="IMG_URL + (shop.primary_img.formats?.medium?.url ?? shop.primary_img.url)" 
                            width="100%" 
                            height="240rpx"
                            mode="aspectFill"
                        />

                        <view class="shop-name">
                            <wd-text :text="shop.name" color="#333"/><br />
                        </view>
                        <view class="shop-info">
                            <wd-text :text="`${shop.price}积分`" color="goldenrod" /><br />
                            <wd-text v-if="shop.price > userState!.score" :text="`差${shop.price - userState!.score}积分`" />
                        </view>
                    </view>
                </view>
                
            </view>
        </view>

        <view class="bottom-content">
            <view class="action flex-row">
                <view class="action-item flex-col" @click="goTo('/pages/shop/myExchange')">
                    <Icon name="present" color="#333" />
                    <wd-text text="已兑礼品" color="#333" size="24rpx" />
                </view>
                <view class="action-item flex-col" @click="goTo('/pages/shop/myFriend')">
                    <Icon name="friend" color="#333" />
                    <wd-text text="已推好友" color="#333" size="24rpx" />
                </view>
            </view>

            <wd-button 
                custom-style="background-color: #000" 
                @click="show = true"
            >
                推荐好友有礼
            </wd-button>
        </view>
    </view>

    <wd-action-sheet
        v-model="show"
        title="推荐给好友领积分"
        @close="show = false"
    >
        <view style="padding: 32rpx; box-sizing: border-box;">
            <wd-form ref="form" :model="data">
                <wd-cell-group border>
                    <wd-input 
                        v-model="data.friend_name"
                        prop="friend_name"
                        label="好友姓名"
                        label-width="100px"
                        placeholder="请输入意向好友姓名"
                        :rules="[{ required: true, message: '请填写好友姓名' }]"
                    />
                    <wd-input 
                        v-model="data.phone"
                        prop="phone"
                        label="联系方式"
                        label-width="100px"
                        placeholder="请输入好友电话或微信"
                        :rules="[{ required: true, message: '请填写联系方式' }]"
                    />
                    <wd-textarea 
                        v-model="data.desc" 
                        placeholder="推荐描述需要紧急度，朋友预算等"
                        :maxlength="120"
                    />
                    <wd-cell 
                        title="聊天截图" 
                        title-width="100px" 
                        prop="screenshoot"
                    >
                        <wd-upload 
                            :file-list="imgs" 
                            accept="image"
                            image-mode="aspectFill" 
                            multiple
                            :limit="3"
                            name="files"
                            :action="BASE_URL + '/upload'"
                            :successStatus="201"
                            @success="uploadSuccess"
                        />
                    </wd-cell>
                </wd-cell-group>

                <wd-button 
                    custom-style="background-color: #000" 
                    @click="submit"
                    block
                >
                    提交
                </wd-button>
            </wd-form>
        </view>
    </wd-action-sheet>

    <wd-toast />
</template>

<script setup lang="ts">
import { getShopList, getHomeData, createFriend } from '@/api';
import { IMG_URL, BASE_URL } from '@/config/api.config';
import Navbar from '@/components/Navbar.vue';
import Icon from '@/components/Icon.vue';
import { useUserStore } from '@/stores';
import { goTo } from '@/utils/common';
import { reactive } from 'vue';
import { useToast } from 'wot-design-uni';
import { storeToRefs } from 'pinia';
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

onShareAppMessage(() => {
	return {
		title: '丽江全城影像 - 积分商城'
	}
})

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

const toast = useToast()

const list = ref([]);

getShopList().then(res => {
    list.value = res.data;
})

const banner = ref('')
getHomeData().then(res => {
    banner.value = res.data.shop_banner_img.formats.large.url
})

const show = ref(false)
const form = ref()
const imgs = ref([])
const data = reactive({
    friend_name: '',
    phone: '',
    desc: '',
    screenshoot: []
})

const uploadSuccess = ({ file }) => {
    const res = JSON.parse(file.response)[0]
    data.screenshoot.push(res.id as never)
}

const submit = async () => {
    const isValid = await new Promise<boolean>((resolve, reject) => {
        form.value
            .validate()
            .then(({ valid, errors }) => {
                if (valid) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
    })

    if (!isValid) return

    createFriend(data).then(res => {
        if (res.data) {
            toast.success('提交成功')
            show.value = false
            data.friend_name = ''
            data.phone = ''
            data.desc = ''
            imgs.value = []
            data.screenshoot = []
        } else {
            toast.error('提交失败')
        }
    })
}
</script>

<style lang="scss" scoped>

.content {
    position: relative;
    z-index: 9;
    gap: 16rpx;
    padding: 32rpx;
    margin: -32rpx 0;
    border-radius: 16rpx;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
}

.shop-list {
    padding: 32rpx;
    padding-top: 64rpx;
    box-sizing: border-box;
    background-color: #efefef;
}

.shop-title {
    margin-bottom: 32rpx;
}

.shop-content {
    display: flex;
    flex-flow: row wrap;
    gap: 32rpx;
    margin-bottom: 32rpx;
}

.shop-item {
    flex-grow: 1;
    background-color: #fff;
    border-radius: 16rpx;
    overflow: hidden;
}

.shop-name {
    padding: 32rpx;
    box-sizing: border-box;
    padding-bottom: 0;
}

.shop-info {
    padding: 32rpx;
    box-sizing: border-box;
}

.bottom-content {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx 64rpx;
    position: sticky;
    z-index: 9;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
}

.action {
    gap: 64rpx;
}

.action-item {
    gap: 16rpx;
    align-items: center;
}
</style>