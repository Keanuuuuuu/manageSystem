<!-- 
* @description:找回密码的页面 
* @fileName: PWD.vue
* @author: 文洋
* @date: 2023-11-09
* @version:1.0 
!-->
<template>
    <div>
        <div id="container">
            <div id="main">
                <div v-if="firstStep" class="mainBox" id="step1">
                    <div id="captcha">
                        <div id="captchainput">
                            <p>请输入邮箱地址</p>
                            <el-input v-model="mail" clearable />
                        </div>
                        <div id="captchabtn">
                            <el-button color="#2f349a" @click="getCaptcha" :disabled="disableBtn">获取验证码</el-button>
                        </div>
                    </div>
                </div>

                <div v-if="!firstStep" class="mainBox" id="step2">
                    <div id="back" @click="handleBack">
                        <el-icon>
                            <Back />
                        </el-icon>
                    </div>
                    <p>请输入验证码</p>
                    <el-input v-model="captcha" clearable />
                    <p>请输入新密码</p>
                    <el-input v-model="newPassword" clearable />
                    <p>再次输入新密码</p>
                    <el-input v-model="checkPassword" clearable />
                    <!-- 第二步的内容 -->
                </div>

                <el-button color="#2f349a" id="Btn" @click="tryNext">{{ btnContent }}</el-button>

            </div>
            <div id="other" @mousemove="handleMove" @mouseleave="leave">
                <div id="wrapper" :style="{ left: `${moveValue}%` }">
                    <div id="pic"><img src="@/assets/airCondition.png" alt=""></div>
                    <div id="title">
                        <p>中央空调<br>集中管理平台</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { throttle } from "@/utils/Throttling";
import { get,put } from "@/api/http.js";
import { ElMessage } from "element-plus";
import { useIpcRenderer } from "@vueuse/electron"
const ipcRenderer = useIpcRenderer();
const windowClose = () => {
      ipcRenderer.send("PWD-close"); // 向主进程通信
    }

let firstStep = ref(true)
let btnContent = ref("下一步")

const handleBack = () => {
    firstStep.value = true
    btnContent.value = "下一步"
}

const tryNext = () => {
    // 在这里处理点击“下一步”按钮的逻辑
    // 可以根据当前步骤来决定下一个步骤是什么
    if (firstStep.value == true) {
        firstStep.value = false;
        btnContent.value = "完成"
    } else {
        handelChange()
    }
}

let mail = ref("")
let disableBtn = ref(false) //获取验证码控制按钮是否禁用的变量
let infoCode = ref('')  //用以表示身份

//获取验证码
const getCaptcha = async () => {
    if (mail.value.trim() === "") {
        ElMessage({
            showClose: true,
            message: "输入的内容不能为空！",
            type: "error",
            offset: 50
        })
    } else {
        // 禁用按钮
        disableBtn.value = true;
        const response = await get('/password', { email: mail.value });
        console.log(response);
        if (response.code === 200) {
            infoCode.value = response.data.code
            setTimeout(() => {
                disableBtn.value = false;
            }, 60000);
            // 成功获取验证码的逻辑
            ElMessage({
                showClose: true,
                message: `"${response.msg}"`,
                type: "success",
                offset: 50
            })
        } else {
            disableBtn.value = false;
            ElMessage({
                showClose: true,
                message: `"${response.msg}"`,
                type: "error",
                offset: 50
            })
        }
    }
};

let captcha = ref("")
let newPassword = ref("")
let checkPassword = ref("")

//处理忘记密码
const handelChange = async () => {
    if (captcha.value.trim() === "" || newPassword.value.trim() === "" || checkPassword.value.trim() === "") {
        ElMessage({
            showClose: true,
            message: "输入的内容不能为空！",
            type: "error",
            offset: 50
        })
    } else {
        if (newPassword.value !== checkPassword.value) {
            ElMessage({
                showClose: true,
                message: "请确认密码一致！",
                type: "error",
                offset: 50
            })
        } else {
            const response = await put('/password', { code:infoCode.value ,userCode: captcha.value, newPassword: newPassword.value })
            console.log(response);
            if (response.code === 21200) {
                ElMessage({
                    showClose: true,
                    message: "已成功修改密码！",
                    type: "success",
                    offset: 50
                })
                setTimeout(() => {
                    windowClose()
                }, 1000);
            } else if (response.code === 201) {
                ElMessage({
                    showClose: true,
                    message: "验证码过期,请重新获取！",
                    type: "error",
                    offset: 50
                })
            } else {
                ElMessage({
                    showClose: true,
                    message: "验证码错误！",
                    type: "error",
                    offset: 50
                })
            }

        }
    }

}

let moveValue = ref(50)
let previousX = 50

const throttleMove = throttle(move, 10)
function move(event) {
    let currentX = event.clientX
    if (currentX > previousX) {
        // 鼠标向右移动
        moveValue.value = 55
    } else if (currentX < previousX) {
        // 鼠标向左移动
        moveValue.value = 45
    } else {
        moveValue.value = 50
    }
    previousX = currentX;
}
function handleMove(e) {
    throttleMove(e)
}
function leave() {
    moveValue.value = 50
}

</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

#container {
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 35px);
    display: flex;
    flex-direction: column;
    align-items: center;

}

#main {
    margin-top: 10vh;
    width: 450px;
    height: 320px;
    border-radius: $border-radius;
    box-shadow: 0px 0px 40px 15px rgb(233, 239, 248);
    background-color: #fff;
    position: relative;
    display: flex;
    justify-content: center;

    .mainBox {
        margin-top: 10px;
        width: 320px;
    }

    #step1 {
        p {
            color: gray;
            margin-bottom: 5px;
        }

        #captcha {
            position: relative;
            margin-top: 80px;

            #captchainput {
                width: 210px;
            }

            #captchabtn {
                position: absolute;
                top: 25px;
                right: 0px;
            }
        }

    }

    #step2 {
        width: 250px;

        #back {
            cursor: pointer;
            position: absolute;
            left: 15px;
        }

        p {
            color: gray;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        p:nth-child(2) {
            margin-top: 25px;
        }
    }


}

#Btn {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    margin: 15px auto;
    width: 100px;
    height: 40px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 3px;
}

#other {
    position: absolute;
    bottom: 5vh;
    width: 80vw;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    #pic {
        img {
            width: 90px;
            height: 80px;
        }
    }

    #title {
        margin-left: 10px;
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: 800;
    }

    #wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all .7s;
        transform: translateX(-50%);
    }
}
</style>