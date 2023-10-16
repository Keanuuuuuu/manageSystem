<template>
  <div class="content">
    <div class="tree">
      <el-scrollbar>  
        <el-tree 
          :data="data" 
          :props="defaultProps"
          @node-click="handleNodeClick"
          :default-expand-all="true"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node"
              v-mouse-menu = "{
                params:data,
                ...options_tree
              }"
            >
              <span>{{ node.label }}</span>
              <div v-show="!data.children">
                <span>
                  <span>  --color  </span>
                  <!-- 现在只是一个固定的1来表示状态，要换成插值表达式，根据请求返回的故障码我来做一个判断 -->
                  <!-- <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a> -->
                </span>
              </div>
            </span>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <!-- 以上为左侧菜单 -->
    <div class="Monitor">
      <monitor-display-head
        :titleChange="titleChange"
      ></monitor-display-head>
      <!-- 以上为内机监控界面的总览显示 -->
      <monitor-display-control 
        :dialogVisible="dialogVisible"
        :control_dialogValue="control_dialogValue"
        :intelligent_controlValue="intelligent_controlValue"
        :loading="loading"
        @updateDialogVisible="dialogVisible = $event"
        @updateControl_dialogValue="control_dialogValue = $event"
        @updateIntelligent_controlValue="intelligent_controlValue = $event"
        @reload="
          loading = $event,
          getAirconditionPost()
        "
      >
      </monitor-display-control>
      <!-- 以上为内机监控界面的控制显示 -->
      <div class="Monitor_the_display_data_list">
        <el-table
          ref="multipleTableRef"
          :data="tableData?tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize): []"
          v-loading="loading"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          stripe
          max-height="550"
          :header-cell-style="headerRowStyle"
        >
          <!-- 
            1、ele对于列表中每一项数据的展示可以使用property属性，也可以使用template模板 
            2、sortable为设置是否启用排序功能
            3、v-mouse-menu为列表元素右键的菜单设置
            4、tableData.slice为分页相关
            5、selection-change当选择项发生变化时会触发该事件
          -->
          <el-table-column type="selection" width="55" />
          <el-table-column property='name' label="名称" width="110" sortable/>
            <!-- <template #default="scope">{{ scope.row[name] }}</template> -->
          <!-- </el-table-column> -->
          <el-table-column property='status' label="状态" width="110" sortable />
          <el-table-column property='mode' label="模式" width="110" sortable/>
          <el-table-column property='temperature' label="温度" width="110" sortable/>
          <el-table-column property='windSpeed' label="风速" width="110" sortable/>
          <el-table-column property='roomTemperature' label="室温" width="110" sortable/>
          <el-table-column label="详情" width="120">
            <template #default>
              <el-button href="">详情…</el-button>  
            </template>
          </el-table-column>
          <el-table-column label="智能控制" width="120">
            <template #default>
              <el-switch
                size="small"
              />
            </template>
          </el-table-column>
          <el-table-column label="备注" show-overflow-tooltip />
        </el-table>
        <!-- 以上是使用ele列表内容 -->

        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 30, 40]" 
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <!-- 以上是分页器内容 -->
      </div>
    </div>
  </div>
  <el-dialog 
    :modelValue="dialogVisible"
    :title="titleName"
    @closed="close"
    width="600px"
    align-center
  >
    <control-dialog
      v-show="control_dialogValue"
      :value_one="value_one"
      :value_two="value_two"
      :value_three="value_three"
      :num="num"
      :selected="[...selected]"
      @updateDialogValue="value_one = $event"
      @updateDialogMode="value_two = $event"
      @updateDialogWind="value_three = $event"
      @updateDialogNum="num = $event"
    ></control-dialog>
    <add-dialog
      v-show="add_dialogValue"
      @addDialogSubmit="addDialogfn"
    ></add-dialog>
    <intelligent-control
      v-show="intelligent_controlValue"
    ></intelligent-control>
    <el-button @click="cancel">取消</el-button>
    <el-button @click="confirm">确定</el-button>
  </el-dialog>

</template>
  
<script>

import { post, get } from '../utils/http.js'
import { switchString } from '../utils/digitalTransformation.js'
import  Test  from '../utils/treeArr.js'
import { reactive, toRaw } from 'vue'
import { ref, onMounted, computed } from 'vue'
import { MouseMenuDirective, MouseMenuCtx } from '@howdyjs/mouse-menu'
import { mapMutations, mapState, useStore } from 'vuex'
import controlDialog from '../components/controlDialog.vue'
import addDialog from '../components/addDialog.vue'
import intelligentControl from '../components/intelligentControlDialog.vue'
import MonitorDisplayHead from '../components/ControlComponents/Monitor_display_head.vue'
import MonitorDisplayControl from '../components/ControlComponents/Monitor_display_control.vue'
import { ElMessage } from "element-plus"

export default{
  components: { 
    controlDialog, 
    MonitorDisplayHead, 
    MonitorDisplayControl, 
    addDialog, 
    intelligentControl 
  },
  name:'monitoring',
  directives: {
    MouseMenu: MouseMenuDirective
  },
  setup({ emit }) {
    
    let h = true
    const array = reactive([])
    const options = reactive({
        useLongPressInMobile: true,
        menuWrapperCss: {
          background: "#FFFFFF"
        },
        menuItemCss: {

        },
        menuList: [
          {
            label: '添加节点',
            tips: 'Add',
            fn: (params, currentEl, bindingEl, e) => console.log('open', params, currentEl, bindingEl, e)
          },
          {
            label: '修改节点',
            tips: 'Edit',
            fn: (params, currentEl, bindingEl, e) => {
              titleName.value = params.number + "号空调"
              dialogVisible.value = true
              add_dialogValue.value = false
              control_dialogValue.value = true
              // 展示弹窗
              console.log(params.number)
              store.commit('number_control', params.number)
            }
          },
          {
            label: '删除节点',
            tips: 'Delete',
            fn: (params, currentEl, bindingEl, e) => console.log('delete', params, currentEl, bindingEl, e)
          },
          {
            label: '智能控制',
            tips: 'Control',
            fn: (params, currentEl, bindingEl, e) => console.log('rename', params, currentEl, bindingEl, e)
          }
        ]
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
        // {
        //   label: '实时控制',
        //   tips: 'Edit',
        //   fn: (params, currentEl, bindingEl, e) => {
        //     // titleName.value = params.number + "号空调"
        //     dialogVisible.value = true
        //     add_dialogValue.value = false
        //     // 展示对应的内部dialog时，要把别的设置为false
        //     control_dialogValue.value = true
        //     console.log(params.id)
        //     store.commit('Current_control', params.id)
        //     getAirconditionPost()
        //   }
        // },
        {
          label: '删除节点',
          tips: 'Delete',
          fn: (params) => console.log('delete', params)
        },
        {
          label: '新增节点',
          tips: 'Add',
          // hidden: h,
          fn: (params, currentEl, bindingEl, e) => { 
            console.log('rename', params, currentEl, bindingEl, e)
            dialogVisible.value = true
            add_dialogValue.value = true
            // 展示对应的内部dialog时，要把别的设置为false
            control_dialogValue.value = false
            // 增加节点后刷新
          }
        }
      ]
    })
    let dialogVisible = ref(false)
    let control_dialogValue = ref(false)
    let add_dialogValue = ref(false)
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
    const data = reactive([
      {
        id:'16',
        label: '内机监控',
        name:'',
        children: [
          {
            id:'16',
            label: '16',
            name: '16栋',
            children: [
              {
                id:'16_201',
                label: '16_201',
                name: '16栋16_201室',
                children: [
                  {
                    id:'16_201_1',
                    label: '16_201_1',
                    name: '16栋16_201室16_201_1',
                  },
                  {
                    id:'16_201_2',
                    label: '16_201_2',
                    name: '16栋16_201室16_201_2',
                  },
                  {
                    id:'16_201_3',
                    label: '16_201_3',
                    name: '16栋16_201室16_201_3',
                  }
                ]
              },
              {
                id:'16_202',
                label: '16_202',
                name: '16栋16_202室',
                children: [
                  {
                    id:'16_202_1',
                    label: '16_202_1',
                    name: '16栋16_202室16_202_1',
                  },
                  {
                    id:'16_202_2',
                    label: '16_202_2',
                    name: '16栋16_202室16_202_2',
                  },
                  {
                    id:'16_202_3',
                    label: '16_202_3',
                    name: '16栋16_202室16_202_3',
                  },
                  {
                    id:'16_202_4',
                    label: '16_202_4',
                    name: '16栋16_202室16_202_4',
                  }
                ]
              },
              {
                id:'16_203',
                label: '16_203',
                name: '16栋16_203室',
                children: [
                  {
                    id:'16_203_1',
                    label: '16_203_1',
                    name: '16栋16_203室16_203_1',
                  },
                  {
                    id:'16_203_2',
                    label: '16_203_2',
                    name: '16栋16_203室16_203_2',
                  },
                  {
                    id:'16_203_3',
                    label: '16_203_3',
                    name: '16栋16_203室16_203_3',
                  }
                ]
              },
              {
                id:'16_204',
                label: '16_204',
                name: '16栋16_204室',
                children: [
                  {
                    id:'16_204_1',
                    label: '16_204_1',
                    name: '16栋16_204室16_204_1',
                  },
                  {
                    id:'16_204_2',
                    label: '16_204_2',
                    name: '16栋16_204室16_204_2',
                  },
                  {
                    id:'16_204_3',
                    label: '16_204_3',
                    name: '16栋16_204室16_204_3',
                  }
                ]
              },
              {
                id:'16_205',
                label: '16_205',
                name: '16栋16_205室',
                children: [
                  {
                    id:'16_205_1',
                    label: '16_205_1',
                    name: '16栋16_205室16_205_1',
                  },
                  {
                    id:'16_205_2',
                    label: '16_205_2',
                    name: '16栋16_205室16_205_2',
                  },
                  {
                    id:'16_205_3',
                    label: '16_205_3',
                    name: '16栋16_205室16_205_3',
                  },
                ]
              },
              {
                id:'16_206',
                label: '16_206',
                name: '16栋16_206室',
                children: [
                  {
                    id:'16_206_1',
                    label: '16_206_1',
                    name: '16栋16_206室16_206_1',
                  },
                  {
                    id:'16_206_2',
                    label: '16_206_2',
                    name: '16栋16_206室16_206_2',
                  },
                  {
                    id:'16_206_3',
                    label: '16_206_3',
                    name: '16栋16_206室16_206_3',
                  },
                  {
                    id:'16_206_4',
                    label: '16_206_4',
                    name: '16栋16_206室16_206_4',
                  },
                  {
                    id:'16_206_5',
                    label: '16_206_5',
                    name: '16栋16_206室16_206_5',
                  },
                  {
                    id:'16_206_6',
                    label: '16_206_6',
                    name: '16栋16_206室16_206_6',
                  },
                  {
                    id:'16_206_7',
                    label: '16_206_7',
                    name: '16栋16_206室16_206_7',
                  },
                  {
                    id:'16_206_8',
                    label: '16_206_8',
                    name: '16栋16_206室16_206_8',
                  },
                ]
              }
            ],
          },
        ],
      },
    ])
    const defaultProps = reactive({
      children: 'children',
      label: 'label',
    })
    const tableData = reactive([ // 定义列表内表格数据
    ])

    // 获取原始列表
    async function getAirconditionPost() {
      const res = await post('/getMachineStatusById',{
        id: "16"
      })

      // console.log("测试查询接口：",res.data);
      let obj = {
        id:'16'
      }
      array.value = res.data
      handleNodeClick(obj, array.value)
      loading.value = false
    }

    // 获取所有的IP
    async function getAllIP() {
      const res = await post('/getAllIP')
      console.log(res)
    }

    // 获取指定节点下的设备数量
    const getNumberOfMachine = async (id)=> {
      const res = await post('/getNumberOfMachine',{
        id: "16_201"
      })
      console.log("查询设备下的内机数量:",res);
    }

    // 修改节点的POST请求
    async function modifyNodePost(selectedobj, res) {
      console.log(selectedobj, res);
      const changeNode = await post('/controlMachine',
          {
            "name":`${selectedobj}`, 
            "status": `${res[0]}`,
            "mode": `${res[1]}`,
            "temperature": `${res[3]}`,
            "windSpeed": `${res[2]}`
          }
      )
      console.log(changeNode)
    }

    // 页面挂载时刷新请求
    onMounted(() => {
      getAirconditionPost()
    })

    // 获取原始数组列表后，根据故障码渲染内机故障颜色
    function calculateColor(array){

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
    const storeMutations = mapMutations(['Current_control', 'Switch_control', 'Mode_control', 'Wind_control', 'Temperature_control','setUserdata'])

    const currentControlValue = computed(() => store.state.currentControl)
    const numberValue = computed(() => store.state.number)
    const switchValue = computed(() => store.state.Switch)
    const modeValue = computed(() => store.state.Mode)
    const windValue = computed(() => store.state.Wind)
    const temperatureValue = computed(() => store.state.Temperature)
    const userdataValue = computed(() => store.state.userdata)
    console.log('userdata:',userdataValue.value);
    function confirm() {
      console.log(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)
      // 拿到数据后发送请求，后期需完善数据是否输入及格式检测
      let res = switchString(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)

      // 发送请求后关闭窗口
      dialogVisible.value = false
      
      if([...selected.value].length === 0){
        ElMessage({
          showClose: true,
          message: "控制的空调数目为空或控制项不完整",
          type: "warning",
        });
        return
      }

      for(let selectedobj of [...selected.value]){
        modifyNodePost(selectedobj, res)
      }
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

    const handleNodeClick = (data, treeArr) => {
      // 想在下次点击事件触发前把数组删除干净，不过当table数组过长应该性能不好
      let res = Test(data.id, array.value)
      titleChange.value = data.name
      // console.log('111',data.id, treeArr, res);
      tableData.splice(0, tableData.length);
      res.forEach(e => {
        tableData.push(e);
      });
    }

    const handleSelectionChange = (ev) => { // 当选择项发生变化时会触发该事件
      for(let evobj of ev){
        selected.value.add(evobj.name)
      }
    }

    const headerRowStyle = ({ row, rowIndex }) => { // 修改表头的回调函数
      return {
        backgroundColor: '#E7EEF3 !important'
      }
    }

    const addDialogfn = (value) => {
      console.log('fuqin',value);
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
      options, // 列表节点右击配置项
      options_tree, // 菜单栏右击配置项
      editVisible,
      editItemData,
      handleEdit,
      handleAdd,
      editSubmit,
      dialogVisible, // 整个Dialog是否展示控制
      control_dialogValue, // 实时控制弹窗控制
      add_dialogValue, // 添加节点弹窗控制
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
      addDialogfn
    }
  }
}

</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction: row;
  height: 82vh;
  background-repeat: no-repeat;
  // 路由界面的高度百分比 + 顶部路由按键的高度百分比 = 100% 即整个arti组件的高度
}
.Monitor{
  width: 80%;
}
.Monitor_the_display_data_list{
  height: 80%;
  // 在内机控制界面的右侧 列表的高度 + 头部高度 + 控制区域高度 = 100%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table{
    background-color: #E7EEF3;
    border-collapse:collapse; 
  }
}
.tree{
  border-right: 1px solid black;
  box-sizing: border-box;
  width: 20%;
  // overflow-y: scroll;
}
.modify{
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
.el-table tr{
  background-color: #E7EEF3;
}
.el-pagination{
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>