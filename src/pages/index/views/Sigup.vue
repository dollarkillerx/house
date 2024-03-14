<template>
  <el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    @select="menuChange"
  >
    <el-menu-item index="1">短信登录</el-menu-item>
    <el-menu-item index="2">密码登录</el-menu-item>
  </el-menu>
  <!-- 验证码表单 -->
  <el-form
    ref="codeFormRef"
    :model="validateCodeForm"
    label-width="100px"
    class="demo-ruleForm"
    v-if="showCodeForm"
  >
    <el-form-item
      label="手机号码"
      prop="phone"
      :rules="[
        { required: true, message: '请输入手机号码' },
        { type: 'number', message: '请输入数字' },
      ]"
    >
      <el-input
        v-model.number="validateCodeForm.phone"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item
      class="form-line"
      label="验证码"
      prop="code"
      :rules="[
        { required: true, message: '请输入验证码' },
        { type: 'number', message: '请输入数字' },
      ]"
    >
      <el-input
        v-model.number="validateCodeForm.code"
        type="text"
        autocomplete="off"
      />
      <button class="code" @click.prevent="getCode()">
        {{ codeNum }}{{ code }}
      </button>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitCodeForm(codeFormRef)"
        class="login-btn"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
  <!-- 密码表单 -->
  <el-form
    ref="wordFormRef"
    :model="validateWordForm"
    label-width="100px"
    class="demo-ruleForm"
    v-if="!showCodeForm"
  >
    <el-form-item
      label="手机号码"
      prop="phone"
      :rules="[
        { required: true, message: '请输入手机号码' },
        { type: 'number', message: '请输入数字' },
      ]"
    >
      <el-input
        v-model.number="validateWordForm.phone"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item
      class="form-line"
      label="密码"
      prop="passward"
      :rules="[
        { required: true, message: '请输入密码' },
        { type: 'number', message: '请输入数字' },
      ]"
    >
      <el-input
        v-model.number="validateWordForm.passward"
        type="password"
        autocomplete="off"
        show-password
      />
      <button class="forget" @click.prevent="forget()">忘记密码</button>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitWordForm(wordFormRef)"
        class="login-btn"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { FormInstance } from "element-plus";

// 菜单栏
var showCodeForm = ref(true);
const menuChange = (key, keyPath) => {
  //   console.log(key, keyPath)
  if (key == 1) {
    showCodeForm.value = true;
  } else if (key == 2) {
    showCodeForm.value = false;
  }
};

// 获取验证码
const code = ref("获取验证码");
const codeNum = ref();
const getCode = async () => {
  codeNum.value = 60;
  code.value = "s 后重新获取";
  const promise = new Promise(resolve => {
    setInterval(() => {
      if (codeNum.value > 0) {
        codeNum.value--;
      } else {
        resolve();
      }
    }, 1000);
  });

  await promise;
  code.value = "获取验证码";
  codeNum.value = null;
};

// 忘记密码
const forget = () => {};

// 验证码表单
const codeFormRef = ref();
const validateCodeForm = reactive({ phone: "", code: "" });
const submitCodeForm = (formEl) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      console.log("提交!");
    } else {
      console.log("提交失败!");
      return false;
    }
  });
};

// 密码表单
const wordFormRef = ref();
const validateWordForm = reactive({ phone: "", passward: "" });
const submitWordForm = (formEl) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      console.log("提交!");
    } else {
      console.log("提交失败!");
      return false;
    }
  });
};
</script>
<style scope>
/*菜单栏*/
.el-menu--horizontal.el-menu {
}
/*表单*/
.el-form {
  padding: 30px 0;
  width: 433px;
  .el-form-item {
    width: 100%;
  }
  .login-btn {
    width: 80%;
  }

  .form-line {
    .el-form-item__content {
      display: flex;
      flex-direction: row-reverse;
    }
    .code {
      background-color: inherit;
      color: rgb(110, 181, 255);
      cursor: pointer;
    }
    .code:hover {
      color: rgb(45, 146, 255);
    }

    .forget {
      background-color: inherit;
      cursor: pointer;
    }

    .forget:hover {
      font-weight: bold;
    }
  }
}
</style>
