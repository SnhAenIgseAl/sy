<template>
    
    <Navbar />
    <view class="page">
        <Card
            v-if="list"
            v-for="(item, index) in list"
            :key="index"
            :item="item"
            @click="goTo(`/pages/work/l2?id=${item.documentId}`)"
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

const list = ref([])
const tWord = ref('')

const main = async () => {
    // tWord.value = await getClassTitle()
    //     .then(res =>
    //         res.data[1].title
    //     )

    list.value = await getClassL1('客片作品')
        .then(res => 
            res.data[0].class_l1
        )
}

main()

</script>

<style scoped lang="scss">
</style>