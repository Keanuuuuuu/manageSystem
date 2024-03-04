<!-- 
* @description: 账号管理页面
* @fileName: acount.vue
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

    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe
      :header-cell-style="headerRowStyle">
      <el-table-column type="selection" />
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="permissions" label="管理权限"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="currentPage" :total="total" :page-sizes="[5, 10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
    </div>


    <el-dialog title="新增账号" :modelValue="addDialogVisible" @closed="close" width="500px">
      <el-scrollbar height="400px">
        <el-form :model="addForm" label-width="100px">
          <el-form-item label="账号" required>
            <el-input v-model="addForm.account" maxlength="2"></el-input>
          </el-form-item>
          <el-form-item label="角色" required>
            <el-select v-model="authValue" placeholder="选择角色" style="width: 360px">
              <el-option v-for="item in authOption" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" required>
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input type="password" v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" required>
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="管理权限">
            <el-tree :data="store.leftTreeData"  :default-expand-all="true"
                :expand-on-click-node="false" show-checkbox>
                <template #default="{ node, data }">
                        <span>{{ data.label }}</span>
                </template>
            </el-tree>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button @click="handleAddConfirm">确定</el-button>
        </div>
      </el-scrollbar>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCustomStore } from '@/store';

const store = useCustomStore();

// 模拟的表格数据
const tableData = ref([
  {
    index: 1,
    account: 'user1',
    role: 'admin',
    name: '张三',
    phone: '123456789',
    permissions: '全部',
    createdAt: '2024-02-26',
    remark: '备注信息'
  },
  {
    index: 2,
    account: 'user1',
    role: 'admin',
    name: '张三',
    phone: '123456789',
    permissions: '全部',
    createdAt: '2024-02-26',
    remark: '备注信息'
  }
]);


const authValue = ref('')
const authOption = [
  {
    value:'超级管理员',
    label:'超级管理员'
  },
  {
    value:'管理员',
    label:'管理员'
  },
  {
    value:'普通用户',
    label:'普通用户'
  },
]

// 新增账号对话框可见性
const addDialogVisible = ref(false);

// 处理新增按钮点击事件
const handleAdd = () => {
  addDialogVisible.value = true;
  console.log(addDialogVisible.value);
};

// 处理新增对话框确认按钮点击事件
const handleAddConfirm = () => {
  // 实现新增逻辑
  console.log('新增账号：', addForm.value);
  addDialogVisible.value = false;
  // 清空表单数据
  addForm.value = {
    account: '',
    name: '',
    password: '',
    phone: '',
    email: '',
    permissions: [],
    remark: ''
  };
};

// 新增账号表单数据
const addForm = ref({
  account: '',
  name: '',
  password: '',
  phone: '',
  email: '',
  permissions: [],
  remark: ''
});


// 处理编辑按钮点击事件
const handleEdit = () => {
  // 实现编辑逻辑
};

// 处理删除按钮点击事件
const handleDelete = () => {
  // 实现删除逻辑
};

function close() {
  addDialogVisible.value = false
  console.log(111);
}

// 分页相关数据
const currentPage = ref(1);
const pageSize = ref(10); // 每页显示条数
const total = ref(tableData.value.length);

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
