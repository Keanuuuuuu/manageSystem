<!-- 
* @description: 
* @fileName: editAccountDialog.vue
* @author: 文洋
* @date: 2024-03-09
* @version: 
!-->

<template>
    <el-dialog title="编辑账号" :modelValue="visible" width="500px">
        <el-scrollbar height="400px">
            <el-form :model="editForm" label-width="100px" :rules="formRules">
                <el-form-item label="账号" prop="username">
                    <el-input placeholder="请选择账号" v-model="props.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="authValue">
                    <el-select v-model="authValue" placeholder="选择角色" style="width: 360px" @change="handleRoleChange">
                        <el-option v-for="item in authOption" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="管理权限">
                    <el-tree ref="treeRef" :data="store.authTree" :expand-on-click-node="true" show-checkbox
                        :node-key="'id'" style="width: 360px">

                        <template #default="{ node, data }">
                            <span>{{ data.label }}</span>
                        </template>
                    </el-tree>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel">
                    <el-input v-model="editForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button @click="handleEditConfirm">确定</el-button>
            </div>
        </el-scrollbar>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useCustomStore } from '@/store';
import { post, put } from '@/api/http.js'
import { ElMessage } from "element-plus";

const store = useCustomStore();

const emit = defineEmits(['closeDialog', 'done'])

const props = defineProps(['visible', 'username'])

const authValue = ref('')
const authOption = [
    {
        value: '超级管理员',
        label: '超级管理员'
    },
    {
        value: '管理员',
        label: '管理员'
    },
    {
        value: '普通用户',
        label: '普通用户'
    },
]


// 新增账号表单数据
const editForm = ref({
    username: '',
    name: '',
    tel: '',
    email: '',
    power: '',
    rooms: ''
});

const formRules = ref({
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    tel: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { max: 20, message: '联系电话不能超过20个字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { max: 45, message: '邮箱地址不能超过45个字符', trigger: 'blur' }
    ]
})

// 处理角色选择变化事件
const handleRoleChange = () => {
    // 根据角色选项的值，映射对应的管理权限值
    switch (authValue.value) {
        case '超级管理员':
            editForm.value.power = 0;
            break;
        case '管理员':
            editForm.value.power = 1;
            break;
        case '普通用户':
            editForm.value.power = 2;
            break;
    }
};

//分配权限树
const treeRef = ref(null)

const getCheckedNodes = () => {
    let roomsArr = treeRef.value.getCheckedNodes(false, false)
    editForm.value.rooms = roomsArr.filter(room => room.id !== '16').map(room => room.id)
}

//账号管理列表
const getTableData = async () => {
    const response = await post('/usermanager/users', null)
    store.setAccountTableData(response.data)
}

// 处理新增对话框确认按钮点击事件
const handleEditConfirm = async () => {
    getCheckedNodes()
    editForm.value.username = props.username
    // 实现新增逻辑
    console.log('编辑账号：', editForm.value);

    if (
        editForm.value.name === '' ||
        editForm.value.tel === '' ||
        editForm.value.email === '' ||
        editForm.value.power === '' ||
        editForm.value.rooms === ''
    ) {
        ElMessage({
            showClose: true,
            message: '请填写所有必选项',
            type: "error",
        });
        return;
    } else {
        const response = await put('/usermanager', JSON.stringify(editForm.value))
        if (response.code === 21201) {
            ElMessage({
                showClose: true,
                message: `修改用户${props.username}成功！`,
                type: "success",
            });
        } else {
            ElMessage({
                showClose: true,
                message: `${response.msg}`,
                type: "error",
            });
        }
    }

    // 清空表单数据
    editForm.value = {
        username: '',
        name: '',
        tel: '',
        email: '',
        power: '',
        rooms: ''
    };
    authValue.value = ''
    emit('closeDialog')
    emit('done') //清除传入的username
    getTableData()
}
</script>

<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>