<!-- 
* @description: 
* @fileName: deletAccountDialog .vue
* @author: 文洋
* @date: 2024-03-09
* @version: 
!-->

<template>
    <el-dialog title="删除账号" :modelValue="visible" @closed="close" width="300px" top="30vh">
        <p>当前选中账号：{{ username || '无' }}</p>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button @click="handleDelConfirm(); visible = false">确定</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useCustomStore } from '@/store';
import { post, del } from '@/api/http.js'
import { ElMessage } from "element-plus";

const store = useCustomStore();

const emit = defineEmits(['closeDialog','done'])

const props = defineProps(['visible', 'username'])

//账号管理列表
const getTableData = async () => {
    const response = await post('/usermanager/users', null)
    store.setAccountTableData(response.data)
}

const handleDelConfirm = async () => {
    const response = await del('/usermanager', { username: props.username })
    if (response.code === 21202) {
        ElMessage({
            showClose: true,
            message: `已成功删除账号${props.username}！`,
            type: "success",
        });
    } else {
        ElMessage({
            showClose: true,
            message: `${response.msg}`,
            type: "error",
        });
    }
    emit('closeDialog')
    emit('done') //清除传入的username
    getTableData()
}

</script>

<style lang="scss" scoped>
.dialog-footer {
    margin-top: 35px;
    display: flex;
    justify-content: center;
}
</style>