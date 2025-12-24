<template>
    <Navbar title="个人资料"/>

    <view style="padding: 32rpx;">
        <wd-form ref="form" :model="data">
            <wd-cell-group border>
                <wd-picker 
                    :columns="['男', '女']" 
                    label="性别" 
                    v-model="data.gender" 
                />
                <wd-datetime-picker 
                    type="date"
                    v-model="data.birthday" 
                    prop="birthday"
                    label="生日" 
                    :rules="[{ required: true, message: '请选择生日' }]"
                />
                <wd-datetime-picker 
                    type="date"
                    v-model="data.wedding_day" 
                    prop="wedding_day"
                    label="结婚日期" 
                    :rules="[{ required: true, message: '请选择结婚日期' }]"
                />
                <wd-datetime-picker 
                    type="date"
                    v-model="data.child_birthday" 
                    prop="child_birthday"
                    label="孩子生日" 
                    :rules="[{ required: true, message: '请选择孩子生日' }]"
                />
                <wd-input 
                    v-model="data.email"
                    prop="email"
                    label="邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"
                />
                <wd-input 
                    v-model="data.phone"
                    prop="phone"
                    label="电话号码"
                    :rules="[{ required: true, message: '请填写电话号码' }]"
                />
                <wd-input 
                    v-model="data.address"
                    prop="address"
                    label="地址"
                    :rules="[{ required: true, message: '请填写地址' }]"
                />
            </wd-cell-group>
            <view class="footer">
                <wd-button 
                    size="large" 
                    @click="submit" 
                    block
                    custom-style="background-color: #000;"
                >
                    确定
                </wd-button>
            </view>
        </wd-form>
    </view>

    <wd-toast />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { ref, reactive } from 'vue';
import { useToast } from 'wot-design-uni'
import { updateMe } from '@/api/index'
import { useUserStore } from '@/stores/index'

const toast = useToast()

const userStore = useUserStore()

const form = ref()
const data = reactive({
    gender: '',
    birthday: '',
    wedding_day: '',
    child_birthday: '',
    email: '',
    phone: '',
    address: ''
})

const submit = () => {
    console.log(data)

    form.value
        .validate()
        .then(({ valid, errors }) => {
            if (valid) {
                data.birthday = data.birthday ? new Date(data.birthday).toISOString() : ''
                data.wedding_day = data.wedding_day ? new Date(data.wedding_day).toISOString() : ''
                data.child_birthday = data.child_birthday ? new Date(data.child_birthday).toISOString() : ''
                console.log(data);
                

                updateMe(data).then(async res => {
                    if (res.code === 0) {
                        toast.success('更新成功')
                        await userStore.setUserInfoAsync()
                    } else {
                        toast.error('更新失败')
                    }
                })
            } else {
                toast.error(errors[0].message)
            }
        })
        .catch((error) => {
            console.log(error, 'error')
        })
}
</script>

<style lang="scss" scoped>
.footer {
    margin-top: 32rpx;
}
</style>