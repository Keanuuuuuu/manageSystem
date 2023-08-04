<template>
  <div class="content">
    <div class="tree">
      <el-tree 
        :data="data" 
        :props="defaultProps" 
        @node-click="handleNodeClick"
        :default-expand-all="true"
        v-mouse-menu = "{
          ...options_tree
        }"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <div v-show="!data.children">
              <span>
                <span @click="append(data)">  --color  </span>
                <!-- 现在只是一个固定的1来表示状态，要换成插值表达式，根据请求返回的故障码我来做一个判断 -->
                <!-- <a style="margin-left: 8px" @click="remove(node, data)"> Delete </a> -->
              </span>
            </div>
          </span>
        </template>
      </el-tree>
    </div>
    <!-- 以上为左侧菜单 -->
    <div class="Monitor">
      <monitor-display-head></monitor-display-head>
      <!-- 以上为内机监控界面的总览显示 -->
      <monitor-display-control 
        :dialogVisible="dialogVisible"
        :control_dialogValue="control_dialogValue"
        @updateDialogVisible="dialogVisible = $event"
        @updateControl_dialogValue="control_dialogValue = $event"
      >
      </monitor-display-control>
      <!-- 以上为内机监控界面的控制显示 -->
      <div class="Monitor_the_display_data_list">
        <!-- <table>
          <thead>
              <tr class="table">
                  <th scope="col">
                    <el-checkbox></el-checkbox>
                  </th>
                  <th scope="col">名称</th>
                  <th scope="col">编号</th>
                  <th scope="col">模式</th>
                  <th scope="col">温度</th>
                  <th scope="col">室温</th>
                  <th scope="col">风速</th>
                  <th scope="col">状态</th>
              </tr>
          </thead>
          <tbody>

              <tr v-for="item in array.value? 
                array.value.slice((currentPage - 1) * pageSize, currentPage * pageSize): []" 
                :key="item.number" 
                v-mouse-menu="
                {
                  params: item,
                  ...options
                }"
              >
                  <th scope="row">{{ item.faultCode }}</th>
                  <td>
                    <el-checkbox></el-checkbox>
                  </td>
                  <td>{{ item.number }}</td>
                  <td>{{ item.mode }}</td>
                  <td>{{ item.temperature }}</td>
                  <td>{{ item.roomTemperature }}</td>
                  <td>{{ item.windSpeed }}</td>
                  <td>{{ item.status }}</td>
                  <td @click="modifyNode(item)" class="modify">智能控制</td>
              </tr>

          </tbody>
        </table> -->
        <!-- 以上是自定义列表内容 -->

        <el-table
          ref="multipleTableRef"
          :data="tableData?tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize): []"
          style="width: 100%"
          v-mouse-menu="
          {
            // params: item, // 这里还要看下文档，不知道为何写了报错
            ...options
          }"
          @selection-change="handleSelectionChange"
          stripe
          max-height="400"
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
          <el-table-column label="序号" width="120" />
          <el-table-column label="名称" width="120">
            <template #default="scope">{{ scope.row["空调名称"] }}</template>
          </el-table-column>
          <el-table-column property='status' label="状态" width="120" sortable />
          <el-table-column label="模式" width="120" sortable/>
          <el-table-column label="温度" width="120" sortable/>
          <el-table-column label="风速" width="120" sortable/>
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
    width="600px"
    align-center
  >
    <control-dialog
      v-show="control_dialogValue"
      :value_one="value_one"
      :value_two="value_two"
      :value_three="value_three"
      :num="num"
      @updateDialogValue="value_one = $event"
      @updateDialogNum="num = $event"
    ></control-dialog>
    <add-dialog
      v-show="add_dialogValue"
    ></add-dialog>
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
import controlDialog from '../components/controlDialog.vue'
import addDialog from '../components/addDialog.vue'
import MonitorDisplayHead from '../components/control_components/Monitor_display_head.vue'
import MonitorDisplayControl from '../components/control_components/Monitor_display_control.vue'
import { mapMutations, mapState, useStore } from 'vuex'

export default{
  components: { controlDialog, MonitorDisplayHead, MonitorDisplayControl, addDialog },
  name:'monitoring',
  directives: {
    MouseMenu: MouseMenuDirective
  },
  setup() {
    
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
          label: '添加节点',
          tips: 'Add',
          fn: (params, currentEl, bindingEl, e) => {
            dialogVisible.value = true
            add_dialogValue.value = true
            // 展示对应的内部dialog时，要把别的设置为false
            control_dialogValue.value = false
            console.log('open', params, currentEl, bindingEl, e)
          }
        },
        {
          label: '修改节点',
          tips: 'Edit',
          fn: (params, currentEl, bindingEl, e) => {
            titleName.value = params.number + "号空调"
            dialogVisible.value = true
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
    const  formItems = reactive([
      { label: '用户姓名', key: 'realName', required: true },
      {
        label: '手机号(登录账号)',
        key: 'phone',
        required: true,
        placeholder: ''
      },
    ])
    let dialogVisible = ref(false)
    let control_dialogValue = ref(true)
    let add_dialogValue = ref(true)
    let titleName = ref('')
    let total = ref(100)
    let currentPage = ref(1)
    let pageSize = ref(10)
    let value_one = ref()
    let value_two = ref()
    let value_three = ref()
    let num = ref()
    const data = reactive([
      {
        label: '内机监控',
        children: [
          {
            id:'16',
            label: '16栋 （23/24）',
            children: [
              {
                id:'201',
                label: '16-201',
                children: [
                  {
                    id:'16-201_1',
                    label: '16-201_1'
                  },
                  {
                    id:'16-201_2',
                    label: '16-201_2'
                  },
                  {
                    id:'16-201_3',
                    label: '16-201_3'
                  }
                ]
              },
              {
                id:'202',
                label: '16-202',
                children: [
                  {
                    id:'16-202_1',
                    label: '16-202_1'
                  },
                  {
                    id:'16-202_2',
                    label: '16-202_2'
                  },
                  {
                    id:'16-202_3',
                    label: '16-202_3'
                  }
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
      {
        date: '2016-05-03',
        name: 'Tom1',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    // 获取原始列表
    async function getAirconditionPost() {
      const res = await post('/getAllMachineStatus',{
        ip: '59.68.61.4'
      })
      
      array.value = res
      total.value = res.length
    }

    // 获取所有的IP
    async function getAllIP() {
      const res = await post('/getAllIP')
      console.log(res)
    }

    // 修改节点的POST请求
    async function modifyNodePost(node) {
      console.log(node);
      const changeNode = await post('/controlMachine',{
        ip: '59.68.61.4',
        instruction: [
          {
            "number": node[4],
            "status": node[0],
            "mode": node[1],
            "temperature": node[3],
            "windSpeed": node[2]
          },
          {
            "number": 2,
            "status": 1,
            "mode": 3,
            "temperature": 20,
            "windSpeed": 1
          }
        ]
      })
      console.log(changeNode)
    }

    // 页面挂载时刷新请求
    onMounted(() => {
      // getAirconditionPost()
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
    const storeMutations = mapMutations(['Switch_control', 'Mode_control', 'Wind_control', 'Temperature_control','role'])

    const numberValue = computed(() => store.state.number)
    const switchValue = computed(() => store.state.Switch)
    const modeValue = computed(() => store.state.Mode)
    const windValue = computed(() => store.state.Wind)
    const temperatureValue = computed(() => store.state.Temperature)
    const roleValue = computed(() => store.state.role)

    console.log(roleValue.value);

    function confirm() {
      // console.log(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)
      // 拿到数据后发送请求，后期需完善数据是否输入及格式检测
      let res = switchString(switchValue.value, modeValue.value, windValue.value, temperatureValue.value, numberValue.value)
      // console.log(res)
      modifyNodePost(res)

      // 发送请求后关闭窗口
      dialogVisible.value = false
    }

    function cancel() {
      // 触发cancel dialog不关闭，数据清空
      store.commit('Switch_control', '')
      num.value = ''
      console.log(num.value)
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
      // 想在下次点击事件触发前把数组删除干净，不过当table数组过长应该性能不好
      let res = Test(data.id)
      tableData.splice(0, tableData.length);
      res.forEach(e => {
        tableData.push(e);
      });
    }

    const handleSelectionChange = (ev) => { // 当选择项发生变化时会触发该事件
      console.log(ev)
    }

    const headerRowStyle = ({ row, rowIndex }) => { // 修改表头的回调函数
      return {
        backgroundColor: 'pink !important'
      }
    }

    return {
      getAirconditionPost,
      modifyNode,
      handleSizeChange,
      handleCurrentChange,
      confirm,
      cancel,
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
      dialogVisible, // 整个Dialog是否展示
      control_dialogValue, // 根据不同右击事件选择展示不同内容：修改节点
      add_dialogValue, // ：添加节点
      titleName,
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
      value_one,
      value_two,
      value_three,
      num,
      tableData, // 定义列表内表格数据
      handleSelectionChange, // 当选择项发生变化时会触发该事件
      headerRowStyle // 修改表头颜色的回调函数
    }
  }
}

</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction: row;
  height: 90%;
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
    background-color: rgb(207, 197, 197);
    border-collapse:collapse; 
  }
}
.tree{
  border-right: 1px solid black;
  box-sizing: border-box;
  width: 20%;
  height: 100%;
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
  background-color: aqua;
}
</style>