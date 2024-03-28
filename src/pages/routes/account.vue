<!-- 
* @description: 账号管理页面
* @fileName: account.vue
* @author: 文洋
* @date: 2024-01-10
* @version: 
!-->
<template>
  <div class="account-management">
    <el-button-group>
      <el-button @click="handleAdd">新增</el-button>
      <el-button @click="handleEdit">编辑</el-button>
      <el-button @click="handleDelete">删除</el-button>
    </el-button-group>
    <div class="button-table-divider"></div>

    <div v-if="store.accountTableData && store.accountTableData.length">
      <el-table ref="multipleTableRef"
        :data="store.accountTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe
        :header-cell-style="headerRowStyle" @select="handleSelected">
        <el-table-column type="selection" />
        <el-table-column prop="username" label="账号" selectable="false" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" sortable></el-table-column>
        <el-table-column prop="power" label="角色" sortable>
          <template #default="{ row }">
            {{ getRoleName(row.power) }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
        <el-table-column prop="remark" label="备注">备注信息</el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination :current-page="currentPage" :total="total" :page-sizes="[5, 10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
          @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <div v-else>
      <el-table :data="noData" :header-cell-style="headerRowStyle">
        <el-table-column type="selection" />
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="角色"></el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
        <el-table-column prop="remark" label="备注">备注信息</el-table-column>
      </el-table>
    </div>


    <addAccountDialog :visible="addDialogVisible" @closed="close" @closeDialog="close"></addAccountDialog>

    <editAccountDialog :username="selected" :visible="editDialogVisible" @closed="close" @closeDialog="close" @done="updateSelected">
    </editAccountDialog>

    <delAccountDialog :username="selected" :visible="delDialogVisible" @closed="close" @closeDialog="close" @done="updateSelected">
    </delAccountDialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCustomStore } from '@/store';
import { get, post, del, put } from '@/api/http.js'

import addAccountDialog from '@/components/account/addDialog.vue';
import editAccountDialog from '@/components/account/editDialog.vue';
import delAccountDialog from '@/components/account/delDialog.vue'


const store = useCustomStore();

onMounted(() => {
  getTableData()
  getAuthTree()
})

const multipleTableRef = ref('')

let selected = ref(null)

const handleSelected = (ev) => {
  ev.forEach(evobj => {
    selected.value = evobj.username
  });
  console.log(selected.value);
}

const updateSelected = () => {
  selected.value = null
}

//在表格中将0,1,2对照超级管理员，管理员，普通用户转换
const getRoleName = (power) => {
  switch (power) {
    case 0:
      return '超级管理员';
    case 1:
      return '管理员';
    case 2:
      return '普通用户';
    default:
      return '未知角色';
  }
};

//账号管理列表
const getTableData = async () => {
  const response = await post('/usermanager/users', null)
  store.setAccountTableData(response.data)
  console.log(store.accountTableData);
}

//管理权限树
const getAuthTree = async () => {
  const response = await get('/usermanager')
  store.setAuthTree(response.data[0].children)
}


// 新增账号对话框可见性
const addDialogVisible = ref(false);
// 编辑账号对话框可见性
const editDialogVisible = ref(false);
// 删除账号对话框可见性
const delDialogVisible = ref(false);

// 处理新增按钮点击事件
const handleAdd = () => {
  addDialogVisible.value = true;
};

// 处理编辑按钮点击事件
const handleEdit = () => {
  editDialogVisible.value = true;
};

// 处理删除按钮点击事件
const handleDelete = async () => {
  delDialogVisible.value = true;
};

function close() {
  addDialogVisible.value = false
  editDialogVisible.value = false
  delDialogVisible.value = false
}

// 分页相关数据
const currentPage = ref(1);
const pageSize = ref(10); // 每页显示条数
const total = ref(store.accountTableData.length);

// 处理分页器页码变化事件
function handleSizeChange(val) {
  pageSize.value = val;
}

function handleCurrentChange(val) {
  currentPage.value = val;
}

const headerRowStyle = () => { // 修改表头的回调函数
  return {
    backgroundColor: '#E7EEF3 !important'
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}

.account-management {
  padding: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 10px;
  width: 100%;
  padding: 5px;
  background-color: #fff;
  border-top: 2px solid #ebeef5;
}

.button-table-divider {
  margin-top: 20px;
  /* 添加按钮组和表格之间的上边距 */
  margin-bottom: 20px;
  /* 添加按钮组和表格之间的下边距 */
  border: 2px solid rgb(217, 219, 223);
}
</style>
