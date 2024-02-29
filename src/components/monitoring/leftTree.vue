<!-- 
* @description: 内机监控 左侧节点树 【数据查询/增/删节点】 【备注】：左侧树节点的数据与中心看板的数据并不相同，看板扁平数据由树节点数据id查询得来（初始固定查询id=16）
* @fileName: leftTree.vue
* @author: 文洋 刘世博
* @date: 2024-01-22
* @version: 
!-->
<template>
    <div class="tree">
        <el-scrollbar>
            <el-tree :data="store.leftTreeData" @node-click="handleNodeClick" :default-expand-all="true"
                :expand-on-click-node="false">
                <template #default="{ node, data }">
                    <span class="custom-tree-node" v-mouse-menu="{ params: data, ...options_tree }">
                        <span>{{ data.label }}</span>
                        <span class="node-number" v-if="data.children">(2/{{ data.children.length }})</span>
                        <div v-if="!data.children">
                            <span>
                                <span> --- <img src="@/assets/work.png" title="在线"> </span>
                                <!-- 现在只是一个固定的1来表示状态，要换成插值表达式，根据请求返回的故障码我来做一个判断 -->
                            </span>
                        </div>
                    </span>
                </template>
            </el-tree>
        </el-scrollbar>
    </div>
    <el-dialog :modelValue="dialogVisible" :title="titleName" @closed="close" width="600px" align-center>
        <!-- 新增节点 -->
        <add-dialog v-show="add_dialogValue" :addType="addType" @addDialogSubmit="addDialogfn"></add-dialog>

        <!-- 删除节点 -->
        <delete-dialog v-show="delete_dialogValue" :deleteType="deleteType"
            @deleteDialogSubmit="deleteDialogfn"></delete-dialog>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { post, del } from '@/api/http.js'
import { MouseMenuDirective as vMouseMenu } from '@howdyjs/mouse-menu'
import { ElMessage } from "element-plus"
import { useCustomStore } from '@/store';

import addDialog from '@/components/monitoring/Dialog/addDialog.vue'
import deleteDialog from '@/components/monitoring/Dialog/deleteDialog.vue'

import { dataFlattenById } from '@/utils/treeArr.js'
import systemEventBus from '@/utils/systemEventBus';

const store = useCustomStore();


// 页面挂载时刷新请求
onMounted(() => {
    getTreeArr()
    getAirconditionPost()
    systemEventBus.$on('updateAirconditionPost', () => {
        getAirconditionPost()
    })
})

onBeforeUnmount(() => {
    store.setMonitorHead({
        label: "16栋教学楼",
        length: '34',
    })
})

async function getTreeArr() {
    const res = await post('/leftbar', null, {
        baseURL: 'http://lab.zhongyaohui.club/'
    })
    // console.log('左侧树节点===================》', res.data[0].children);
    store.setLeftTreeData(res.data[0].children)
    // console.log(store.leftTreeData);
}


const airconditionNode = reactive({ id: '16' }) //默认初始时获取16栋的数据
const airconditionNodeArray = ref([])

const handleNodeClick = (data) => {
    airconditionNode.id = data.id;
    airconditionNode.name = data.label;
    let dataFlattenByIdResult = dataFlattenById(data.id, airconditionNodeArray.value) //将有层级的节点数组扁平化
    // console.log(dataFlattenByIdResult);
    store.setMonitorTableData(dataFlattenByIdResult)   //将结果交由pinia 在table中展示
    store.setMonitorHead({ label: data.label, length: dataFlattenByIdResult.length })
    // console.log(store.monitorTableData);
}


// 获取原始列表
async function getAirconditionPost() {
    const res = await post('/machinestate', {
        id: "16"
    }, {
        baseURL: 'http://lab.zhongyaohui.club/'
    })
    // console.log('中心看板内机状态=========================》', res);
    airconditionNodeArray.value = res.data
    handleNodeClick(airconditionNode, airconditionNodeArray.value)
}


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


let dialogVisible = ref(false)

let add_dialogValue = ref(false)
let delete_dialogValue = ref(false)

function close() {
    dialogVisible.value = false
    delete_dialogValue.value = false
    add_dialogValue.value = false
}


function handleSearch(params, currentEl, bindingEl, e) {
    console.log('open', params, currentEl, bindingEl, e)
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

function handleAdd(params) {
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
    delete_dialogValue.value = false
    // 增加节点后刷新
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

function handleDelete(params) {
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
    add_dialogValue.value = false
    // 增加节点后刷新
}

const options_tree = reactive({
    useLongPressInMobile: true,
    menuWrapperCss: {
        background: "#FFFFFF"
    },
    menuList: [
        {
            label: '数据查询',
            tips: 'Search',
            fn: (params, currentEl, bindingEl, e) => {
                handleSearch(params, currentEl, bindingEl, e)
            }
        },
        {
            label: '删除节点',
            tips: 'Delete',
            fn: (params) => {
                handleDelete(params)
            }
        },
        {
            label: '新增节点',
            tips: 'Add',
            fn: (params) => {
                handleAdd(params)
            }
        }
    ]
})

</script>

<style lang="scss" scoped>
.tree {
    border-right: 1px solid black;
    box-sizing: border-box;
    width: 210px;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;

    .node-number {
        margin-left: 10px;
        color: black;
    }
}
</style>

