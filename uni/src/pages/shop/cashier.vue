<template>
    <Navbar title="确认订单" />

    <view v-if="info" class="content">
        <view class="flex-row info">
            <wd-img 
                :src="IMG_URL + info.primary_img.formats.small.url" 
                width="180rpx" 
                height="180rpx"
                mode="aspectFill"
            />

            <view class="flex-col name">
                <wd-text :text="info.name" color="#333" />
                <wd-text :text="`${info.price}积分`" />
            </view>
        </view>
        <wd-form ref="form" :model="data">
            <wd-cell-group border>
                <wd-input
                    label="收获地址"
                    label-width="100px"
                    prop="address"
                    clearable
                    v-model="data.address"
                    placeholder="请输入地址"
                    :rules="[{ required: true, message: '请填写地址' }]"
                />
                <wd-input
                    label="留言"
                    label-width="100px"
                    prop="postscript"
                    clearable
                    v-model="data.postscript"
                    placeholder="你有什么想对商家说的都可以填写在这里哦"
                />  
            </wd-cell-group>
        </wd-form>

        <view class="flex-row bottom">
            <view class="total">
                总计：<wd-text :text="info.price" color="#fe0000" /> 积分
            </view>
            <view class="exchange flex-center" @click="onExchange">
                提交
            </view>
        </view>
    </view>

    <wd-toast />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getShopDetail, exchangeShop } from '@/api'
import { IMG_URL } from '@/config/api.config'
import { onLoad } from '@dcloudio/uni-app';
import { useToast } from 'wot-design-uni'
import { reactive } from 'vue';
import { goTo } from '@/utils/common';

const toast = useToast()

const form = ref()
const info = ref()
const data = reactive({
    address: '',
    postscript: ''
})

onLoad((e) => {
    getShopDetail(e.id).then(res => {
        info.value = res.data
    })
})

const onExchange = async () => {
    console.log(info.value.documentId);

    const isValid = await new Promise<boolean>((resolve, reject) => {
        form.value
            .validate()
            .then(({ valid, errors }) => {
                if (valid) {
                    resolve(true)
                } else {
                    toast.error(errors[0].message)
                    resolve(false)
                }
            })
    })

    if (!isValid) return
    
    exchangeShop(
        info.value.documentId,
        data.address,
        data.postscript
    ).then(res => {
        if (res.code === 0) {
            toast.success('兑换成功')
            goTo('/pages/shop/shop')
        } else {
            toast.error(res.message)
        }
    })
}
</script>

<style lang="scss" scoped>
.content {
    height: 100vh;
    overflow-y: hidden;
    background-color: #efefef;
    padding-top: 32rpx;
}
.info {
    gap: 32rpx;
    padding: 32rpx;
    box-sizing: border-box;
    background-color: #fff;
}

.name {
    height: 180rpx;
    justify-content: space-between;
}
.bottom {
    position: fixed;
    bottom: 0;
    justify-content: space-between;
    padding-left: 32rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    width: calc(100% - 32rpx);
    height: 90rpx;
    align-items: center;
    background-color: #fff;
    box-sizing: content-box;
}


.exchange {
    width: 240rpx;
    height: 100%;
    color: #fff;
    background-color: #000;
}
</style>