<template>
  <div id="container" class="center">
    <div id="databox">
      <p>刷新频率：</p>
      <el-select
        style="width: 110px"
        v-model="selectedValue"
        class="m-2"
        placeholder="选择频率"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button>手动刷新数据</el-button>
    </div>
    <el-row :gutter="30">
      <el-col :span="6">
        <div class="ep-bg-purple short" id="hourse">
          <h2>房间</h2>
          <el-icon class="icon"><House /></el-icon>
        </div>
        <div class="ep-bg-purple short" id="number">
          <h2>空调内机</h2>
          <el-icon class="icon"><CreditCard /></el-icon>
        </div>
      </el-col>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" id="data">
          <h2>中央空调内机运行信息</h2>
          <el-icon class="icon"><Cpu /></el-icon>
          <el-table class="center" :data="tableData" style="width: 95%" height="420">
            <el-table-column prop="date" label="房间" width="120" />
            <el-table-column prop="name" label="内机" width="100" />
            <el-table-column prop="state" label="开/关" width="100" />
            <el-table-column prop="city" label="模式" width="100" />
            <el-table-column prop="address" label="风速" width="100" />
            <el-table-column prop="zip" label="温度" width="120" />
            <el-table-column prop="zip" label="室温" width="120" />
            <el-table-column prop="zip" label="状态" width="120" />
          </el-table></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content ep-bg-purple" id="warn">
          <h2>报警信息</h2>
          <el-icon class="icon"><WarnTriangleFilled /></el-icon></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import { post, get } from "../utils/http.js";
import { ref } from "vue";
import reloadTime from "../data/overview/reloadTime";
import machineStatus from "../data/overview/machineStatus"

export default {
  name: "Overview",
  setup() {
    const selectedValue = ref("");
    return {
      selectedValue,
      options: reloadTime.options,
      tableData: machineStatus.tableData
    };
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 90%;
}

.center{
  left: 50%;
  transform: translateX(-50%);
  position: relative;
}

#databox {
  position: relative;
  top: 20px;
  display: flex;
  justify-items: center;
  height: 80px;
  p {
    line-height: 30px;
  }
  button {
    margin-left: 15px;
  }
}

.grid-content {
  height: 520px;
  position: relative;
}

.short {
  height: 250px;
  position: relative;
}
.ep-bg-purple.short:nth-child(2) {
  /* 添加样式，例如修改背景颜色 */
  margin-top: 20px;
}
.ep-bg-purple {
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 4px;
  background-color: rgb(231,238,243);
  h2 {
    display: block;
    margin-top: 20px;
  }
  .icon {
    position: absolute;
    font-size: 65px;
    bottom: 5px;
    right: 25px;
    opacity: 0.2;
  }
}
.ep-bg-purple:hover {
  transform: scale(1.02);
}
/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
 background-color: transparent !important;
}
/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
 background-color: transparent !important;
 border: 0; //去除表格
}
/*去除底边框*/
::v-deep.el-table td.el-table__cell {
 border: 0;
}
::v-deep.el-table th.el-table__cell.is-leaf {
 border: 0;
}
/*去除底部灰条.el-table::before*/
::v-deep .el-table__inner-wrapper::before {
  display: none;
}
</style>