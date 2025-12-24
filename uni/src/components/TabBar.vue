<template>
    <view class="tab-bar">
        <wd-tabbar 
            v-model="tabIndex"
            fixed
            :zIndex="9"
            :bordered="false"
            safeAreaInsetBottom
            placeholder
            activeColor="#fff"
            @change="onChange"
            custom-style="background-color: #000; color: #fff;"
        >
            <wd-tabbar-item 
                v-for="(item, index) in tabBarList"
                :key="index"
                :title="item.title" 
            >
            </wd-tabbar-item>
        </wd-tabbar>
    </view>
</template>

<script setup lang="ts">
import { useTabStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

const {
    tabIndex
} = storeToRefs(useTabStore())

const tabBarList = [
    {
        title: '首页'
    },
    {
        title: '关于全城'
    },
    {
        title: '样片欣赏'
    },
    {
        title: '客片作品'
    },
    // {
    //     title: '服装展示'
    // },
    {
        title: '我的'
    }
]

const onChange = ({ value }: { value: string }) => {
    tabIndex.value = parseInt(value)
}
</script>

<style scoped>
.tab-bar {
    z-index: 9;
}
</style>