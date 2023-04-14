<template>
  <div>
    <!-- 暂时未封装为组件 -->
    <div class="Monitor_display_head"></div>
    <div class="Monitor_display_control"></div>

    <div class="Monitor_the_display_data_list">
      <table class="table">
        <thead>
            <tr>
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

            <!-- 使用v-for遍历数据，并且设置key保证组件唯一性  -->
            <tr v-for="item in array.value? array.value.slice((currentPage - 1) * pageSize, currentPage * pageSize): []" :key="item.number" v-mouse-menu="
            {
              params: item,
              ...options
            }">
                <th scope="row">{{ item.faultCode }}</th>
                <td>{{ item.number }}</td>
                <td>{{ item.mode }}</td>
                <td>{{ item.temperature }}</td>
                <td>{{ item.roomTemperature }}</td>
                <td>{{ item.windSpeed }}</td>
                <td>{{ item.status }}</td>
                <td @click="modifyNode(item)" class="modify">智能控制</td>
            </tr>

        </tbody>
      </table>  
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]" 
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <button @click="getAirconditionPost">刷新数据</button>
    </div>
  </div>
  <el-dialog 
    v-model="dialogVisible"
    :title="titleName"
    width="600px"
    align-center
  >
    <control-dialog></control-dialog>
    <el-button>取消</el-button>
    <el-button @click="confirm">确定</el-button>
  </el-dialog>

</template>
  
<script>

import { post } from '../utils/http.js'
import { switchString } from '../utils/digitalTransformation.js'
import { reactive, toRaw } from 'vue'
import { ref, onMounted, computed } from 'vue'
import { defineComponent } from 'vue'
import { MouseMenuDirective, MouseMenuCtx } from '@howdyjs/mouse-menu'
import controlDialog from '../components/controlDialog.vue'
import { mapMutations, mapState, useStore } from 'vuex'

export default{
  components: { controlDialog },
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
    let titleName = ref('')
    let total = ref(0)
    let currentPage = ref(1)
    let pageSize = ref(10)

    async function getAirconditionPost(){
      const res = await post('/getAllMachineStatus',{
        ip: '59.68.61.4'
      })
      
      array.value = res
      total.value = res.length
    }

    onMounted(() => {
      // 利用页面挂载请求不太好，每次刷新都要请求
      getAirconditionPost()
    })

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
    const storeMutations = mapMutations(['Switch_control', 'Mode_control', 'Wind_control', 'Temperature_control'])

    const numberValue = computed(() => store.state.number)
    const switchValue = computed(() => store.state.Switch)
    const modeValue = computed(() => store.state.Mode)
    const windValue = computed(() => store.state.Wind)
    const temperatureValue = computed(() => store.state.Temperature)

    function confirm() {
      // console.log(switchValue.value, modeValue.value, windValue.value, temperatureValue.value)
      // 拿到数据后发送请求，后期需完善数据是否输入及格式检测
      let res = switchString(switchValue.value, modeValue.value, windValue.value, temperatureValue.value, numberValue.value)
      console.log(res);
      modifyNodePost(res)
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

    return {
      getAirconditionPost,
      modifyNode,
      handleSizeChange,
      handleCurrentChange,
      confirm,
      ...storeMutations,
      array,
      options,
      editVisible,
      editItemData,
      handleEdit,
      handleAdd,
      editSubmit,
      dialogVisible,
      titleName,
      switchValue,
      modeValue,
      windValue,
      temperatureValue,
      numberValue,
      total,
      currentPage,
      pageSize
    }
  }
}

</script>

<style lang="scss">
.modify{
  cursor: pointer;
  color: rgb(33, 66, 214);
}
</style>