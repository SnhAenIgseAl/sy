<template>

	<!-- <Navbar /> -->

	<view>
		<Home v-if="tabIndex === 0" />
		<About v-if="tabIndex === 1" />
		<Case v-if="tabIndex === 2" />
		<Work v-if="tabIndex === 3" />
		<!-- <Clothes v-if="tabIndex === 4" /> -->
		<User v-if="tabIndex === 4" />
	</view>

	<TabBar />
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import TabBar from "@/components/TabBar.vue";
import Home from "@/pages/home/home.vue";
import About from '@/pages/about/about.vue'
import Case from '@/pages/case/case.vue'
import Work from '@/pages/work/work.vue'
// import Clothes from '@/pages/clothes/clothes.vue'
import User from "@/pages/user/index.vue";
import { storeToRefs } from "pinia";
import { useTabStore, useUserStore } from "@/stores";
import { onShareAppMessage } from "@dcloudio/uni-app";

const {
	isLogin
} = storeToRefs(useUserStore())

const userStore = useUserStore()

if (isLogin.value) {
	// userStore.setUserInfoAsync()
	userStore.login()
}

const {
	tabIndex
} = storeToRefs(useTabStore())

onShareAppMessage(() => {
	return {
		title: '丽江全城影像',
		path: '/pages/index/index',
	}
})

</script>

<style></style>
