<template>
    <wd-navbar 
        left-text="返回" 
        left-arrow 
        fixed 
        placeholder 
        safeAreaInsetTop
    >
        <template #title>
            <span v-if="title" style="color: #fff">{{ title }}</span>
            <wd-img 
                v-else
                :src="IMG_URL + logo"
                width="200px"
                height="45px" 
                mode="aspectFit"
            />
        </template>
        <template #capsule>
            <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
        </template>
    </wd-navbar>
</template>

<script setup lang="ts">
import { getHomeData } from '@/api'
import { IMG_URL } from '@/config/api.config'
// import Logo from '@/assets/images/navlogo.png'

const {
    title
} = defineProps({
    title: {
        type: String,
        default: ''
    }
})

const logo = ref('')

getHomeData().then(res => {
	logo.value = res.data.navbar_logo.url
})

const handleBack = () => {
    uni.navigateBack({})
}

const handleBackHome = () => {
    uni.reLaunch({
        url: '/pages/index/index'
    })
}

</script>

<style scoped></style>