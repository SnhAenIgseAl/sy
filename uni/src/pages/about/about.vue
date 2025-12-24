<template>
    
    <Navbar />
    <view class="page">
        <Card
            v-if="list"
            v-for="(item, index) in list"
            :key="index"
            :item="item"
			:radio="1/1"
            @click="goTo(`/pages/detail/detail?id=${item.details[0].documentId}&bottom=-1`)"
        >
        </Card>
    </view>
    

</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { getClassTitle, getClassL1 } from '@/api/index'
import { IMG_URL } from '@/config/api.config'
import { goTo } from '@/utils/common'
import Card from '@/components/Card.vue'
import Large from '@/assets/images/large.jpg'

const list = ref([])

const tWord = ref('')

const main = async () => {
    // tWord.value = await getClassTitle()
    //     .then(res =>
    //         res.data[2].title
    //     )

    list.value = await getClassL1('关于全城')
        .then(res => 
            res.data[0].class_l1
        )
}

main()
</script>

<style scoped lang="scss">
</style>