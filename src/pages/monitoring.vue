<!-- 
* @description: 内机监控核心页面
* @fileName: monitoring.vue
* @author: 刘世博 文洋
* @date: 2024-01-09
* @version: 
!-->


<template>
  <div class="content">
    <!-- 左侧节点树 -->
    <div class="tree">
      <el-scrollbar>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :default-expand-all="true" :expand-on-click-node="false">
          <template #default="{ node, data }">
            <span class="custom-tree-node" v-mouse-menu="{ params: data, ...options_tree }">
              <span>{{ data.label }}</span>
              <div v-show="!data.children">
                <span>
                  <span> --color </span>
                  <!-- 现在只是一个固定的1来表示状态，要换成插值表达式，根据请求返回的故障码我来做一个判断 -->
                  <!-- <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a> -->
                </span>
              </div>
            </span>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>

    <div class="Monitor">
      <monitor-display-head :titleChange="titleChange"></monitor-display-head>
      <!-- 以上为内机监控界面的总览显示 -->

      <monitor-display-control :dialogVisible="dialogVisible" :control_dialogValue="control_dialogValue"
        :intelligent_controlValue="intelligent_controlValue" :loading="loading"
        @updateDialogVisible="dialogVisible = $event" @updateControl_dialogValue="control_dialogValue = $event"
        @updateIntelligent_controlValue="intelligent_controlValue = $event" @reload="
          loading = $event,
          getAirconditionPost(),
          getTreeArr()
          ">
      </monitor-display-control>
      <!-- 以上为内机监控界面的控制显示 -->

      <div class="Monitor_the_display_data_list">
        <el-table ref="multipleTableRef"
          :data="tableData ? tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []"
          v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange" stripe max-height="550"
          :header-cell-style="headerRowStyle">
          <!-- 
            1、ele对于列表中每一项数据的展示可以使用property属性，也可以使用template模板 
            2、sortable为设置是否启用排序功能
            3、v-mouse-menu为列表元素右键的菜单设置
            4、tableData.slice为分页相关
            5、selection-change当选择项发生变化时会触发该事件
          -->
          <el-table-column type="selection" width="55" />
          <el-table-column property='name' label="名称" width="110" sortable />
          <!-- <template #default="scope">{{ scope.row[name] }}</template> -->
          <!-- </el-table-column> -->
          <el-table-column property='status' label="状态" width="110" sortable />
          <el-table-column property='mode' label="模式" width="110" sortable />
          <el-table-column property='temperature' label="温度" width="110" sortable />
          <el-table-column property='windSpeed' label="风速" width="110" sortable />
          <el-table-column property='roomTemperature' label="室温" width="110" sortable />
          <el-table-column label="详情" width="120">
            <template #default>
              <el-button href="">详情…</el-button>
            </template>
          </el-table-column>
          <el-table-column label="智能控制" width="120">
            <template #default>
              <el-switch size="small" />
            </template>
          </el-table-column>
          <el-table-column label="备注" show-overflow-tooltip />
        </el-table>
        <!-- 以上是使用ele列表内容 -->

        <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]" background
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
        <!-- 以上是分页器内容 -->
      </div>
    </div>
  </div>


  <el-dialog :modelValue="dialogVisible" :title="titleName" @closed="close" width="600px" align-center>

    <control-dialog v-show="control_dialogValue" :value_one="value_one" :value_two="value_two" :value_three="value_three"
      :num="num" :selected="[...selected]" @updateDialogValue="value_one = $event" @updateDialogMode="value_two = $event"
      @updateDialogWind="value_three = $event" @updateDialogNum="num = $event">
    </control-dialog>

    <intelligent-control v-show="intelligent_controlValue"></intelligent-control>

    <add-dialog v-show="add_dialogValue" :addType="addType" @addDialogSubmit="addDialogfn"></add-dialog>

    <delete-dialog v-show="delete_dialogValue" :deleteType="deleteType"
      @deleteDialogSubmit="deleteDialogfn"></delete-dialog>

    <el-button v-show="control_dialogValue || intelligent_controlValue" @click="cancel">取消</el-button>
    <el-button v-show="control_dialogValue || intelligent_controlValue" @click="confirm">确定</el-button>
  </el-dialog>
</template>
  
<script>

import { reactive, toRaw, ref, onMounted, computed } from 'vue'
import { post, del, put } from '@/api/http.js'
import { ElMessage } from "element-plus"

import { switchString } from '@/utils/digitalTransformation.js'
import ConcurrencyRequest from '@/utils/ConcurrencyRequest.js'
import { Test } from '@/utils/treeArr.js'

import { MouseMenuDirective } from '@howdyjs/mouse-menu'
import { mapMutations, useStore } from 'vuex'

import controlDialog from '@/components/Dialog/controlDialog.vue'
import intelligentControl from '@/components/Dialog/intelligentControlDialog.vue'
import addDialog from '@/components/Dialog/addDialog.vue'
import deleteDialog from '@/components/Dialog/deleteDialog.vue'

import MonitorDisplayHead from '@/components/ControlComponents/Monitor_display_head.vue'
import MonitorDisplayControl from '@/components/ControlComponents/Monitor_display_control.vue'


export default {
  components: {
    controlDialog,
    MonitorDisplayHead,
    MonitorDisplayControl,
    addDialog,
    deleteDialog,
    intelligentControl
  },
  name: 'monitoring',
  directives: {
    MouseMenu: MouseMenuDirective
  },
  setup({ emit }) {

    // 页面挂载时刷新请求
    onMounted(() => {
      getAirconditionPost()
      getTreeArr()
    })

    const array = ref([])
    const tableData = reactive([])
    const obj = reactive({
      id: '16',
      name: '16栋'
    })
    const options_tree = reactive({
      useLongPressInMobile: true,
      menuWrapperCss: {
        background: "#FFFFFF"
      },
      menuItemCss: {

      },
      menuList: [
        {
          label: '数据查询',
          tips: 'Search',
          fn: (params, currentEl, bindingEl, e) => {
            console.log('open', params, currentEl, bindingEl, e)
          }
        },
        {
          label: '删除节点',
          tips: 'Delete',
          fn: (params) => {
            // deleteType.__buildingId = '若无值请刷新';
            // deleteType._machineId = '若无值请刷新';
            deleteType.__buildingId = params.id.slice(0, 2)
            deleteType.roomName = params.id.slice(0, 6)
            if (params.id.length === 6) {
              deleteType.value = "房间"
            } else if (params.id.length >= 8) {
              deleteType.value = "设备"
              // 在这里获取楼栋ID和房间ID的原因是，根据接口文档，当用户删除设备的时候，这两项是不需要填写或自动填写的
              console.log(params);
              deleteType._machineId = params.id
            } else if (params.id.length === 2) {
              ElMessage({
                showClose: true,
                message: "楼栋节点不支持删除操作",
                type: "warning",
              });
              return;
            }
            dialogVisible.value = true
            delete_dialogValue.value = true
            // 展示对应的内部dialog时，要把别的设置为false
            control_dialogValue.value = false
            add_dialogValue.value = false
            // 增加节点后刷新
          }
        },
        {
          label: '新增节点',
          tips: 'Add',
          fn: (params, currentEl, bindingEl, e) => {
            addType.__buildingId = params.id.slice(0, 2);
            addType.__roomId = params.id.slice(0, 6);
            if (params.id.length === 2 || params.id.length === 4) {
              addType.value = "房间"
            } else if (params.id.length === 6) {
              addType.value = "设备"
              addType.__buildingId = params.id.slice(0, 2)
              addType.__roomId = params.id.slice(0, 6)
            } else if (params.id.length === 8) {
              ElMessage({
                showClose: true,
                message: "设备不支持添加节点",
                type: "warning",
              });
              return;
            }
            dialogVisible.value = true
            add_dialogValue.value = true
            // 展示对应的内部dialog时，要把别的设置为false
            control_dialogValue.value = false
            delete_dialogValue.value = false
            // 增加节点后刷新
          }
        }
      ]
    })


    let dialogVisible = ref(false)
    let control_dialogValue = ref(false)
    let add_dialogValue = ref(false)
    let delete_dialogValue = ref(false)
    let intelligent_controlValue = ref(false)
    let titleName = ref('')
    let total = ref(100)
    let currentPage = ref(1)
    let pageSize = ref(10)
    let value_one = ref()
    let value_two = ref()
    let value_three = ref()
    let num = ref()
    let selected = ref(new Set())
    let loading = ref(true)
    let titleChange = ref(null)
    let addType = reactive({
      value: null,
      __buildingId: '若无值请刷新',
      __roomId: '若无值请刷新'
    })
    let deleteType = reactive({
      value: null,
      __buildingId: '若无值请刷新',
      _machineId: '若无值请刷新'
    })
    let data = ref([
      {
        id: '内机监控',
        label: '内机监控',
        name: '',
        children: []
      },
    ])
    const defaultProps = reactive({
      children: 'children',
      label: 'label',
    })

    // 获取原始列表
    async function getAirconditionPost() {
      const res = await post('/machinestate', {
        id: "16"
      }, {
        baseURL: 'http://lab.zhongyaohui.club/'
      })
      // console.log('中心看板内机状态=========================》',res);
      array.value = res.data
      handleNodeClick(obj, array.value)
      loading.value = false
    }

    async function getTreeArr() {
      const res = await post('/leftbar', null, {
        baseURL: 'http://lab.zhongyaohui.club/'
      })
      // console.log('左侧树节点===================》',res);
      data.value = res.data
    }

    // 获取所有的IP
    async function getAllIP() {
      const res = await post('/getAllIP')
      console.log(res)
    }

    // 获取指定节点下的设备数量
    const getNumberOfMachine = async (id) => {
      const res = await post('/getNumberOfMachine', {
        id: "16_201"
      })
      console.log("查询设备下的内机数量:", res);
    }

    // 修改内机状态的POST请求
    async function modifyNodePost(selectedobj, res) {
      console.log(selectedobj, res);
      return new Promise((resolve, reject) => {
        post('/controlMachine',
          {
            "name": selectedobj,
            "status": `${res[0]}`,
            "mode": `${res[1]}`,
            "temperature": `${res[3]}`,
            "windSpeed": `${res[2]}`
          }, {
          baseURL: 'http://lab.bitstone14.xyz/'
        }
        ).then(async (res) => {
          console.log(res);
          await getAirconditionPost();
          resolve(res)
        }, async (resaon) => {
          reject(resaon);
          await getAirconditionPost();
        })
      })
    }

    // 添加房间
    const addRoom = async (value) => {
      const res = await put('/room', {
        "buildingId": value.BuildingName, //楼栋id
        "id": value.roomName, //房间id
        "label": value.roomName //房间label
      })
      await getTreeArr()
      ElMessage({
        showClose: true,
        message: `"${res.msg}"`,
        type: "warning",
      });
      console.log("添加房间:", res);
    }

    // 添加设备
    const addDevice = async (value) => {
      const res = await put('/machine', {
        "machineId": value._machineId, //内机id（必填，让用户填写）
        "machineName": value._machineName, //内机名称/label（必填，让用户填写）
        "gatewayId": value._gatewayId, //所属网关id（必填，让用户填写）
        "deviceId": value._deviceId, //所属设备id（必填，让用户填写）
        "deviceOrder": +value._deviceOrder, //所属设备地址（必填，让用户填写）
        "machineOrder": +value._machineOrder, //内机地址（必填，让用户填写）
        "roomId": value.__roomId, //所属房间id（必填，前端自带，不让用户填）
        "buildingId": value.__buildingId, //所属楼栋id（必填，前端自带，不让用户填）
        "privateGatewayIp": value.privateGatewayIp, //私有网关ip（非必填，让用户填写）
        "belongToGroup": value.belongToGroup, //所属机组（非必填，让用户填写）
        "headName": value.headName, //负责人名称（非必填，让用户填写）
        "headPhone": value.headPhone, //负责人电话（非必填，让用户填写）
        "headEmail": value.headEmail, //负责人邮箱（非必填，让用户填写）
        "notes": value.notes, //备注（非必填，让用户填写）
      })
      await getTreeArr();
      ElMessage({
        showClose: true,
        message: `"${res.msg}"`,
        type: "warning",
      });
      console.log(res);
    }

    // 删除房间
    const deleteRoom = async (value) => {
      const res = await del('/room', {
        "buildingId": value.BuildingName, //内机的id
        "id": value.roomName //所属房间的id
      }, {
        baseURL: 'http://lab.zhongyaohui.club/'
      })
      await getTreeArr();
      ElMessage({
        showClose: true,
        message: `"${res.msg}"`,
        type: "warning",
      });
      console.log("删除房间:", res);
    }

    // 删除内机
    const deleteMachine = async (value) => {
      console.log('****************************', value._machineId, value.roomName);
      const res = await del('/machine', {
        "machineId": value._machineId, //内机的id
        "roomId": value.roomName //所属房间的id
      }, {
        baseURL: 'http://lab.zhongyaohui.club/'
      })
      console.log(res);
      await getTreeArr();
      ElMessage({
        showClose: true,
        message: `"${res.msg}"`,
        type: "warning",
      });
      console.log("删除内机:", res);
    }

    // 获取原始数组列表后，根据故障码渲染内机故障颜色
    function calculateColor(array) {

    }

    function modifyNode(item) {
      const rawItem = toRaw(item)
      modifyNodePost(rawItem)
    }

    const editVisible = ref(true)
    let editItemData = ref(null)
    const handleEdit = (row) => {
      editVisible.value = true
      editItemData.value = row
    }
    const handleAdd = () => {
      editVisible.value = true
      editItemData.value = null
    }
    const editSubmit = async (row) => {
      // 发送api等..
      ElMessage.success('操作成功')
      editVisible.value = false
    }

    // vuex相关操作
    const store = useStore()
    const storeMutations = mapMutations(['Current_control', 'Switch_control', 'Mode_control', 'Wind_control', 'Temperature_control', 'setUserdata'])

    const currentControlValue = computed(() => store.state.currentControl)
    const numberValue = computed(() => store.state.number)
    const switchValue = computed(() => store.state.Switch)
    const modeValue = computed(() => store.state.Mode)
    const windValue = computed(() => store.state.Wind)
    const temperatureValue = computed(() => store.state.Temperature)
    const userdataValue = computed(() => store.state.userdata)
    // console.log('userdata:',userdataValue.value);
    function confirm() {
      // console.log(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)
      // 拿到数据后发送请求，后期需完善数据是否输入及格式检测
      let res = switchString(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)

      // 发送请求后关闭窗口
      dialogVisible.value = false

      if ([...selected.value].length === 0) {
        ElMessage({
          showClose: true,
          message: "控制的空调数目为空或控制项不完整",
          type: "warning",
        });
        return
      }

      modifyNodePost([...selected.value], res)
      // for(let selectedobj of [...selected.value]){
      //   modifyNodePost(selectedobj, res)
      // }

      // getAirconditionPost();
    }

    function cancel() {
      // 触发cancel dialog不关闭，数据清空
      selected.value.clear()
      // store.commit('Switch_control', '')
      // num.value = ''
      // console.log(num.value)
    }

    function close() {
      selected.value.clear()
      dialogVisible.value = false
      control_dialogValue.value = false
      delete_dialogValue.value = false
      add_dialogValue.value = false
      intelligent_controlValue.value = false
    }

    // 分页相关操作
    const paginatedArray = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = currentPage.value * pageSize.value
      return array.value.slice(start, end)
    })

    function handleSizeChange(val) {
      pageSize.value = val
    }

    function handleCurrentChange(val) {
      currentPage.value = val
    }

    // 菜单相关操作
    const Tree = {
      label: String,
      children: Array
    };

    const handleNodeClick = (data) => {
      obj.id = data.id;
      obj.name = data.name;
      // 想在下次点击事件触发前把数组删除干净，不过当table数组过长应该性能不好
      let res = Test(data.id, array.value)
      titleChange.value = data.name
      tableData.splice(0, tableData.length);
      res.forEach(e => {
        tableData.push(e);
      });
    }

    const handleSelectionChange = (ev) => { // 当选择项发生变化时会触发该事件
      for (let evobj of ev) {
        selected.value.add(evobj.id)
      }
    }

    const headerRowStyle = ({ row, rowIndex }) => { // 修改表头的回调函数
      return {
        backgroundColor: '#E7EEF3 !important'
      }
    }

    const addDialogfn = (value) => {
      console.log('addDialogSubmit', value);
      if (value.nodeProperties === "房间") {
        addRoom(value)
        dialogVisible.value = false
      } else if (value.nodeProperties === "设备") {
        addDevice(value)
        dialogVisible.value = false
      }
    }

    const deleteDialogfn = (value) => {
      console.log('deleteDialogSubmit', value);
      if (value.nodeProperties === "房间") {
        // 调用删除房间的接口
        deleteRoom(value)
        dialogVisible.value = false
      } else if (value.nodeProperties === "设备") {
        // 调用删除内机的接口
        deleteMachine(value);
        dialogVisible.value = false
      }
    }

    return {
      getAirconditionPost,
      modifyNode,
      handleSizeChange,
      handleCurrentChange,
      confirm,
      cancel,
      close,
      loading,
      titleChange,
      handleNodeClick,
      ...storeMutations,
      array,
      options_tree, // 菜单栏右击配置项
      editVisible,
      editItemData,
      handleEdit,
      handleAdd,
      editSubmit,
      dialogVisible, // 整个Dialog是否展示控制
      control_dialogValue, // 实时控制弹窗控制
      add_dialogValue, // 添加节点弹窗控制
      delete_dialogValue, // 删除窗口
      intelligent_controlValue, // 智能控制弹窗控制
      titleName,
      currentControlValue,
      switchValue,
      modeValue,
      windValue,
      temperatureValue,
      numberValue,
      total,
      currentPage,
      pageSize,
      data,
      defaultProps,
      getAllIP,
      getNumberOfMachine,
      value_one,
      value_two,
      value_three,
      num,
      selected,
      tableData, // 定义列表内表格数据
      handleSelectionChange, // 当选择项发生变化时会触发该事件
      headerRowStyle, // 修改表头颜色的回调函数
      addDialogfn,
      deleteDialogfn,
      addType, // 用来判断添加节点时添加房间还是设备
      deleteType, // 用来删除节点
      deleteRoom,
    }
  }
}

</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: row;
  height: 82vh;
  background-repeat: no-repeat;
  // 路由界面的高度百分比 + 顶部路由按键的高度百分比 = 100% 即整个arti组件的高度
}

.Monitor {
  width: 80%;
}

.Monitor_the_display_data_list {
  height: 80%;
  // 在内机控制界面的右侧 列表的高度 + 头部高度 + 控制区域高度 = 100%
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .table {
    background-color: #E7EEF3;
    border-collapse: collapse;
  }
}

.tree {
  border-right: 1px solid black;
  box-sizing: border-box;
  width: 20%;
  // overflow-y: scroll;
}

.modify {
  cursor: pointer;
  color: rgb(33, 66, 214);
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

.el-table tr {
  background-color: #E7EEF3;
}

.el-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>