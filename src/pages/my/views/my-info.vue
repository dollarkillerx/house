<template>
  <div class="my-info-container container">
    <h3 class="head">我的账号信息</h3>
    <div class="my-info-main">
      <div class="my-info-head">修改密码</div>
      <div class="my-info-content">
        <el-form
    ref="formRef"
    :model="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="输入新密码"
      prop="age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' },
      ]"
    >
      <el-input
        v-model.number="numberValidateForm.age"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)"
      class="saveChange">保存修改</el-button>
    </el-form-item>
  </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { FormInstance } from 'element-plus'

const formRef = ref(); 

const numberValidateForm = reactive({ age: "" }); 

const submitForm = (formEl) => { 
  if (!formEl) { 
    return; 
  } 
  formEl.validate((valid) => { 
    if (valid) { 
      console.log("submit!"); 
    } else { 
      console.log("error submit!"); 
      return false; 
    } 
  }); 
}; 

const resetForm = (formEl) => { 
  if (!formEl) { 
    return; 
  } 
  formEl.resetFields(); 
};
</script>
<style scope>
@import "./style.scss";
</style>
