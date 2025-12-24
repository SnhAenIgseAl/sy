<template>
    
    <Navbar />
    <view class="page">
        <Card
            v-if="list"
            v-for="item in list"
            :item="item"
            @click="goTo(`/pages/detail/detail?l=3&id=${item.details[0].documentId}`)"
        >
        </Card>
    </view>
    

</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { getClassL3 } from '@/api/index'
import { goTo } from '@/utils/common'
import Card from '@/components/Card.vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';

onShareAppMessage(() => {
	return {
		title: '丽江全城影像'
	}
})

const list = ref([])

onLoad(e => {
    getClassL3(e.id).then(res => {
        list.value = res.data.class_l3
    })
})

</script>

<style scoped lang="scss">
</style>