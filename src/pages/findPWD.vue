<!-- 
* @description:找回密码的页面 
* @fileName: findPWD.vue
* @author: 文洋
* @date: 2023-11-09
* @version:1.0 
!-->
<template>
    <div>
        <div id="container">
            <div id="main">
                <div class="mainBox" id="step1">
                    <div class="inputBox">
                        <p>请输入邮箱地址</p>
                        <el-input class="mailbtn" v-model="mail" clearable />
                    </div>
                    <div class="inputBox">
                        <p>请输入验证码</p>
                        <el-input id="captchabtn" v-model="captcha" clearable />
                    </div>
                </div>

                <el-button color="#2f349a" id="Btn" @click="tryNext">下一步</el-button>

            </div>

            <div id="other" @mousemove="handleMove" @mouseleave="leave">
                <div id="wrapper" :style="{ left: `${moveValue}%` }">
                    <div id="pic"><img src="../assets/airCondition.png" alt=""></div>
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
import { throttle } from "../utils/Throttling";


let moveValue = ref(50)
let previousX = 50
let mail = ref(null)
let captcha = ref(null)

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
    width: 500px;
    height: 340px;
    border-radius: $border-radius;
    box-shadow: 0px 0px 40px 15px rgb(233, 239, 248);
    background-color: #fff;
    position: relative;
    display: flex;
    justify-content: center;

    .mainBox {
        margin-top: 25px;
        width: 450px;
        height: 250px;
        border: 1px solid black;
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

.inputBox {
    p {
        float: left;
    }
}

.mailbtn {
    display: block;
    width: 100px;

}
</style>