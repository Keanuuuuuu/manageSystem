<!-- 
* @description: 
* @fileName: addAccountDialog.vue
* @author: 文洋
* @date: 2024-03-09
* @version: 
!-->

<template>
    <el-dialog title="新增账号" :modelValue="visible" width="500px">
        <el-scrollbar height="400px">
            <el-form :model="addForm" label-width="100px" :rules="formRules">
                <el-form-item label="账号" prop="newUsername">
                    <el-input v-model="addForm.newUsername"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="newName">
                    <el-input v-model="addForm.newName"></el-input>
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
                <el-form-item label="联系电话" prop="newTel">
                    <el-input v-model="addForm.newTel"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="newEmail">
                    <el-input v-model="addForm.newEmail"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="newPassword">
                    <el-input v-model="addForm.newPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button @click="handleAddConfirm">确定</el-button>
            </div>
        </el-scrollbar>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useCustomStore } from '@/store';
import { post } from '@/api/http.js'
import { ElMessage } from "element-plus";

const store = useCustomStore();

const emit = defineEmits(['closeDialog'])

const props = defineProps(['visible'])



const authValue = ref()
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
const addForm = ref({
    newUsername: '',
    newName: '',
    newTel: '',
    newEmail: '',
    newPassword: '',
    newPower: '',
    rooms: ''
});

const formRules = ref({
    newUsername: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { max: 20, message: '账号不能超过20个字符', trigger: 'blur' }
    ],
    newName: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    newTel: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { max: 20, message: '联系电话不能超过20个字符', trigger: 'blur' }
    ],
    newEmail: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { max: 45, message: '邮箱地址不能超过45个字符', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { max: 50, message: '密码不能超过50个字符', trigger: 'blur' }
    ]
})

// 处理角色选择变化事件
const handleRoleChange = () => {
    // 根据角色选项的值，映射对应的管理权限值
    switch (authValue.value) {
        case '超级管理员':
            addForm.value.newPower = 0;
            break;
        case '管理员':
            addForm.value.newPower = 1;
            break;
        case '普通用户':
            addForm.value.newPower = 2;
            break;
    }
};

//分配权限树
const treeRef = ref(null)

const getCheckedNodes = () => {
    let roomsArr = treeRef.value.getCheckedNodes(false, false)
    addForm.value.rooms = roomsArr.filter(room => room.id !== '16').map(room => room.id)
}

//账号管理列表
const getTableData = async () => {
    const response = await post('/usermanager/users', null)
    store.setAccountTableData(response.data)
}

// 处理新增对话框确认按钮点击事件
const handleAddConfirm = async () => {
    getCheckedNodes()
    // 实现新增逻辑
    console.log('新增账号：', addForm.value);
    if (
        addForm.value.newUsername === '' ||
        addForm.value.newName === '' ||
        addForm.value.newTel === '' ||
        addForm.value.newEmail === '' ||
        addForm.value.newPassword === '' ||
        addForm.value.newPower === '' ||
        addForm.value.rooms === ''
    ) {
        ElMessage({
            showClose: true,
            message: '请填写所有必选项',
            type: "error",
        });
        return;
    } else {
        const response = await post('/usermanager', JSON.stringify(addForm.value))
        if (response.code === 21200) {
            ElMessage({
                showClose: true,
                message: '添加用户成功！',
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
    addForm.value = {
        newUsername: '',
        newName: '',
        newTel: '',
        newEmail: '',
        newPassword: '',
        newPower: '',
        rooms: ''
    };
    authValue.value = ''
    emit('closeDialog')
    getTableData()
};
</script>

<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>