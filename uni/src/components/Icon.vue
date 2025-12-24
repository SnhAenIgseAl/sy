<template>
    <view 
        :class="`iconfont icon-${name}`"
        :style="{
            fontSize: size,
            color: color
        }"
        @click="handleClick"
    />
</template>

<script setup lang="ts">

const {
    name,
    size,
    color
} = defineProps({
    name: {
        type: String,
        default: ''
    },
    size: {
        type: Number,
        default: '48rpx'
    },
    color: {
        type: String,
        default: '#333'
    }
})

const emit = defineEmits(['click'])

const handleClick = () => {
    emit('click')
}
</script>

<style lang="scss" scoped>
</style>