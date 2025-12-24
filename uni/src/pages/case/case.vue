<template>
    
    <Navbar />
    <view class="page">
        <Card
            v-if="list"
            v-for="item in list"
            :item="item"
            @click="handleGoTo(item)"
        >
        </Card>
    </view>
    

</template>

<script setup lang="ts">
import { getClassTitle, getClassL1 } from '@/api/index'
import { IMG_URL } from '@/config/api.config'
import { goTo } from '@/utils/common'
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'

const list = ref([])
const tWord = ref('')

const main = async () => {
    // tWord.value = await getClassTitle()
    //     .then(res =>
    //         res.data[0].title
    //     )

    list.value = await getClassL1('样片欣赏')
        .then(res => 
            res.data[0].class_l1
        )
}

main()

const handleGoTo = (item) => {
	if (item.title === '风格参考') {
		goTo(`/pages/case/class?id=${item.documentId}`)
	} else {
		goTo(`/pages/case/l2?id=${item.documentId}`)
	}
}

</script>

<style scoped lang="scss">
.about {
    width: 100%;
    height: 500rpx;
    margin-bottom: 16rpx;
    background-size: cover;
}
</style>