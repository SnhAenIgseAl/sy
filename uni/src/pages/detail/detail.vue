<template>
    <Navbar />
    
    <Desc v-if="info" :info="info" :bottom="bottom" />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Desc from '@/components/Desc.vue'
import { IMG_URL } from '@/config/api.config'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { getDesc } from '@/api'

const info = ref()
const bottom = ref(0)

onLoad((e) => {
    // level.value = e.l
    // id.value = e.id
	bottom.value = parseInt(e.bottom as string)

    getDesc(e.id as string).then(res => {
        info.value = res.data
    })
})

onShareAppMessage((res) => {
    return {
        title: info.value.title ?? '丽江全城影像',
        imageUrl: IMG_URL + info.value.desc_imgs[0].formats.medium.url,
        path: '/pages/detail/detail?id=' + info.value.documentId
    }
})
</script>

<style lang="scss" scoped>

</style>