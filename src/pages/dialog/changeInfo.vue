<!-- 
* @description: 修改信息弹窗
* @fileName: changeInfo.vue
* @author: 文洋
* @date: 2024-03-04
* @version: 
!-->

<template>
    <div class="password-box" v-if="!afterIdentify">
        <h2>确认身份</h2>
        <div id="password-input">
            <el-input v-model="password" placeholder="请输入密码" type="password" show-password clearable></el-input>
        </div>
        <div id="password-btn">
            <el-button color="#2f349a" @click="handleVerify">确认</el-button>
        </div>
    </div>
    <el-container v-if="afterIdentify">
        <el-header>
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
                <el-menu-item index="name">修改姓名</el-menu-item>
                <el-menu-item index="tel">修改电话号码</el-menu-item>
                <el-menu-item index="email">修改邮箱</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <el-form ref="formData" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="姓名" prop="name" v-if="activeIndex === 'name'">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="tel" v-if="activeIndex === 'tel'">
                    <el-input v-model="form.tel" clearable></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" v-if="activeIndex === 'email'">
                    <el-input v-model="form.email" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button color="#2f349a" @click="handleSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useIpcRenderer } from '@vueuse/electron';
import { post } from '@/api/http.js'

let afterIdentify = ref(false)
let password = ref('')

const Store = require('electron-store'); 
const Estore = new Store();
const ipcRenderer = useIpcRenderer();

const handleVerify = async () => {
    if (password.value.trim() === "") {
        ElMessage({
            showClose: true,
            message: "输入的内容不能为空！",
            type: "error",
            offset: 50
        });
    } else {
        const response = await post('/user/identify', { password: password.value })
        console.log(response);
        if (response.code === 21201) {
            ElMessage({
                showClose: true,
                message: "身份验证成功！",
                type: "success",
                offset: 50
            });
            afterIdentify.value = true
        } else {
            ElMessage({
                showClose: true,
                message: "身份验证失败！",
                type: "error",
                offset: 50
            });
        }
    }

}

const activeIndex = ref('name');
const form = ref({
    name: '',
    tel: '',
    email: ''
});

const rules = {
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    tel: [
        { required: true, message: '请输入电话号码', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]
};

const handleSelect = (index) => {
    activeIndex.value = index;
};


const changeInfoDialogWindowClose = () => {
    ipcRenderer.send("changeInfoDialog-window-close"); // 向主进程通信
}
const logout = function () {
    Estore.set('logindata', {
        username: null,
        password: null,
    });
    Estore.set('token', null);
    Estore.set('recordPassword', false);
    ipcRenderer.send('login-deny');
}

const handleSubmit = async () => {
    const api = {
        name: 'name',
        tel: 'tel',
        email: 'email'
    };

    let requestData = undefined;
    if (activeIndex.value === 'name') {
        requestData = form.value.name;
    } else if (activeIndex.value === 'tel') {
        requestData = form.value.tel;
    } else if (activeIndex.value === 'email') {
        requestData = form.value.email;
    }

    const response = await post('/user/'+api[activeIndex.value], `{ "${api[activeIndex.value]}":"${requestData }"}`);

    console.log(response);

    if (response.code === 21200) {
        ElMessage({
            showClose: true,
            message: `"已成功修改${api[activeIndex.value]},即将重新登录系统！"`,
            type: "success",
            offset: 50
        })
        setTimeout(() => {
            changeInfoDialogWindowClose()
            logout()
        }, 2000);

    } else {
        ElMessage({
            showClose: true,
            message: `"${response.msg}！"`,
            type: "error",
            offset: 50
        })
    }
};
</script>

<style lang="scss" scoped>
.password-box {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #password-input {
        width: 250px;
        margin-top: 20px;
        margin-bottom: 50px;
    }
}
</style>