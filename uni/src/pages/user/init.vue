<template>
    <view class="init flex-center flex-column">
		
		<wd-text text="登录" color="#333" size="48rpx" bold />
		
        <button 
            open-type="chooseAvatar" 
            class="avatar flex-center"
            @chooseavatar="chooseAvatar"
        >
            <Icon v-if="!data.avatar" name="pic" />
            <wd-img 
                v-else
                :src="data.avatar" 
                width="180rpx" 
                height="180rpx" 
                mode="aspectFill" 
            />
        </button>

        <input 
            type="nickname" 
            placeholder="请输入昵称" 
            name="nickname" 
            v-model="data.username"
            class="input"
        />

        <view style="width: 100%; margin-top: 32rpx;">
            <wd-button  
                block
                custom-style="background-color: #000"
                @click="submit"
            >
                确定
            </wd-button>
        </view>
    </view>
    

    <wd-toast />
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { reactive } from 'vue';
import { updateMe } from '@/api/index'
import { useToast } from 'wot-design-uni';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/index'

const toast = useToast()

const {
    isFirstLogin
} = storeToRefs(useUserStore())

const userStore = useUserStore()

const data = reactive({
    avatar: '',
    username: ''
})

const chooseAvatar = (e) => {
    data.avatar = e.detail.avatarUrl
}

const submit = () => {
    updateMe(data).then(async res => {
        if (res.code === 0) {
            isFirstLogin.value = false
            await userStore.setUserInfoAsync()
            uni.redirectTo({
                url: '/pages/index/index',
            })
        } else {
            toast.error(res.message)
        }
    })
}

</script>

<style lang="scss" scoped>

.init {
    width: 100%;
    height: 100vh;
    padding: 120rpx;
    justify-content: center;
    box-sizing: border-box;
}

.avatar {
    width: 180rpx;
    height: 180rpx;
    padding: 0;
    border-radius: 9999rpx;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 120rpx;
    margin-bottom: 40rpx;
}

.input {
    width: 100%;
    padding: 32rpx 0;
    border-bottom: 1px solid #ccc;
}
</style>