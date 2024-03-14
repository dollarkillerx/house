<template>
    <div class="login-container">
        <div class="form-head">
            <div></div>
            <div class="form-title">{{ t('app.register') }}</div>
            <el-select class="localeBtn" v-model="localeVal" placeholder="zh"  style="width: 70px">
                <el-option v-for="item in localeOpts" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <el-form ref="formRef" :model="formDataRef" status-icon :rules="formRulesRef" class="login-form">
            <div class="form-container">
                <div class="form-tit">{{ t('app.myinfo') }}</div>
                <div class="form-main">
                    <div class="form-line">
                        <el-form-item :label="t('app.name')" prop="name">
                            <el-input v-model="formDataRef.name" />
                        </el-form-item>
                        <el-form-item :label="t('app.email')" prop="email">
                            <el-input v-model="formDataRef.email" />
                        </el-form-item>
                        <el-form-item :label="t('app.phone')" prop="phone">
                            <el-input v-model="formDataRef.phone" />
                        </el-form-item>
                    </div>
                    <div class="form-line">
                        <el-form-item :label="t('app.passward')" prop="password">
                            <el-input v-model="formDataRef.password" />
                        </el-form-item>
                        <el-form-item :label="t('app.invitecode')" prop="invitationCode">
                            <el-input v-model="formDataRef.invitationCode" />
                        </el-form-item>
                    </div>
                </div>
            </div>
            <div class="form-container">
                <div class="form-tit">{{ t('app.rentinfo') }}</div>
                <div class="form-main form-main2">
                    <div class="form-line">
                        <el-form-item :label="t('app.school')" prop="school">
                            <el-input v-model="formDataRef.school" />
                        </el-form-item>
                        <el-form-item :label="t('app.budget')" prop="budget">
                            <el-input v-model="formDataRef.budget" />
                        </el-form-item>
                        <el-form-item :label="t('app.commuteTime')" prop="commuteTime">
                            <el-input v-model="formDataRef.commuteTime" />
                        </el-form-item>
                    </div>
                    <div class="form-line">
                        <el-form-item :label="t('app.desiredCheckInTime')" prop="desiredCheckInTime">
                            <el-date-picker v-model="formDataRef.desiredCheckInTime" type="date" placeholder="选择日期"
                                :disabled-date="disabledDate" size="default" value-format="MM-DD" format="MM-DD" />
                        </el-form-item>
                        <el-form-item :label="t('app.sizeHope')" prop="sizeHope">
                            <el-input v-model="formDataRef.sizeHope" />
                        </el-form-item>
                    </div>
                    <div class="form-line">
                        <el-form-item :label="t('app.domestic')" prop="domestic" class="radio-box">
                            <el-radio-group v-model="formDataRef.domestic" class="ml-4">
                                <el-radio :label="false" size="large">{{ t('app.chinese') }}</el-radio>
                                <el-radio :label="true" size="large">{{ t('app.japanse') }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="t('app.intermediary')" prop="intermediary">
                            <el-input v-model="formDataRef.intermediary" />
                        </el-form-item>
                    </div>
                    <div class="form-line">
                        <el-form-item :label="t('app.captchaCode')" prop="captchaID" class="captcha">
                            <img id="outputImage" src="" alt="验证码">
                            <button @click.prevent="getCaptcha">{{ t('app.captchaChange') }}</button>
                        </el-form-item>
                        <el-form-item :label="t('app.captchaInput')" prop="captchaCode">
                            <el-input v-model="formDataRef.captchaCode" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(formRef)">{{ t('app.register') }}</el-button>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref, toRef, onMounted } from "vue";
import { FormInstance } from 'element-plus'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { watchEffect, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useI18n } from "vue-i18n";

//多语言切换
const { t, locale } = useI18n();

const localeVal = ref();

const localeOpts = [
    {
        value: "zh",
        label: "zh",
    },
    {
        value: "ja",
        label: "ja",
    },
]

watchEffect(() => {
    console.log('localeVal 已更改:', localeVal.value);
    if (localeVal.value == undefined) {

    } else {
        locale.value = localeVal.value;
    }

});


// 路由
const router = useRouter();

//查询验证码规则
const GqlCaptcha = gql`
query{
  captcha{
    base64Captcha
    captchaId
  }
}
`;

//日期选择器
const disabledDate = (time) => {
    return time.getTime() < Date.now()
}
const customValueFormat = (date) => {
    if (!date) return '';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
}

//表单数据
const formRef = ref();
const data = reactive({
    formData: {
        email: "adapawang@gmail.com",
        phone: "080-5737-9436",
        name: "WANG",
        invitationCode: "wangye@japanmyhouse.com",
        password: "123456",
        captchaID: "FQ8O3R",
        captchaCode: "xpcj",
        budget: "6.4万",
        school: "京都大学",
        commuteTime: "电车25分钟内",
        sizeHope: "19平以上",
        desiredCheckInTime: "03-19",
        intermediary: 1,
        domestic: false
    },
    rules: {
        email: [
            {
                required: true,
                message: "请输入邮箱",
                trigger: "blur",
            },
            {
                type: "email",
                message: "请输入正确的邮箱格式",
                trigger: ["blur", "change"],
            },
            {
                min: 3,
                max: 50, // 修改为适当的最大长度
                message: "长度不够",
                trigger: "blur",
            }
        ],
        invitationCode: [
            {
                required: true,
                message: "邀请码不可为空",
                trigger: "blur",
            },
            {
                type: "email",
                message: "请输入正确的邀请码",
                trigger: ["blur", "change"],
            },
            {
                min: 3,
                max: 50, // 修改为适当的最大长度
                message: "长度不够",
                trigger: "blur",
            }
        ],
        phone: [
            {
                required: true,
                message: "请输入手机号码",
                trigger: "blur",
            },
            {
                pattern: /^\d{3}-\d{4}-\d{4}$/,
                message: "请输入正确的手机号码格式，例如：080-5737-9436",
                trigger: ["blur", "change"],
            }
        ],
        password: [
            {
                required: true,
                message: "请输入密码",
                trigger: "blur",
            },
            {
                min: 6,
                max: 20,
                message: "密码长度为6-20位",
                trigger: "blur",
            }
        ],
        name: [
            {
                required: true,
                message: "请输入名字",
                trigger: "blur",
            },
            {
                min: 2,
                max: 20,
                message: "名字长度为2-20位",
                trigger: "blur",
            }
        ],
        captchaID: [
            {
                required: true,
                message: "请输入验证码ID",
                trigger: "blur",
            }
        ],
        captchaCode: [
            {
                required: true,
                message: "请输入验证码",
                trigger: "blur",
            }
        ],
        budget: [
            {
                required: true,
                message: "请输入预算",
                trigger: "blur",
            }
        ],
        school: [
            {
                required: true,
                message: "请输入学校",
                trigger: "blur",
            }
        ],
        commuteTime: [
            {
                required: true,
                message: "请输入通勤时间",
                trigger: "blur",
            }
        ],
        sizeHope: [
            {
                required: true,
                message: "请输入期望大小",
                trigger: "blur",
            }
        ],
        desiredCheckInTime: [
            {
                required: true,
                message: "请输入期望入住时间",
                trigger: "blur",
            }
        ],
        domestic: [
            {
                required: false,
                message: "请输入国内地址",
                trigger: "blur",
            }
        ]
    }

});
const formDataRef = toRef(data, 'formData');
const formRulesRef = toRef(data, 'rules');


//转换验证码图片
const yzmImg = ref();
const transformCode = (code) => {
    const base64ImageData = `data:image/png;base64,${code}`;
    // 创建 Image 对象
    var img = new Image();

    // 设置 Image 对象的 src 为 Base64 编码的图片数据
    img.src = base64ImageData;

    // 等待图片加载完成
    img.onload = function () {
        // 获取图片的宽度和高度
        var width = img.width;
        var height = img.height;

        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        // 获取 Canvas 的 2D 渲染上下文
        var ctx = canvas.getContext('2d');

        // 在 Canvas 上绘制图片
        ctx.drawImage(img, 0, 0);

        // 将 Canvas 转换成 Base64 编码的图片数据
        var convertedImageData = canvas.toDataURL('image/png');

        // 将转换后的图片数据设置为图片元素的 src
        document.getElementById('outputImage').src = convertedImageData;
    };
}

//加载验证码图片
const { result, error, loading, refetch } = useQuery(GqlCaptcha);
watchEffect(() => {
    if (result.value) {
        console.log(result.value.captcha)
        formDataRef.value.captchaID = result.value.captcha.captchaId;
        transformCode(result.value.captcha.base64Captcha)
    }
});

//更换验证码
const getCaptcha = () => {
    refetch()
    transformCode(result.value.captcha.base64Captcha)
}

//表单提交
const submitForm = (formEl) => {
    if (!formEl) {
        return;
    }
    formEl.validate((valid) => {
        if (valid) {
            // 发送注册请求
            const { mutate, onDone } = useMutation(gql`
mutation registryUser {
  registryUser(input: {
    captchaID: "${formDataRef.value.captchaID}",
    captchaCode: "${formDataRef.value.captchaCode}", 
    email: "${formDataRef.value.email}",
    phone: "${formDataRef.value.phone}",
    name: "${formDataRef.value.name}",
    invitationCode: "${formDataRef.value.invitationCode}", 
    password: "${formDataRef.value.password}",
    need: {
      budget: "${formDataRef.value.budget}",
      school: "${formDataRef.value.school}", 
      commuteTime: "${formDataRef.value.commuteTime}",
      sizeHope: "${formDataRef.value.sizeHope}",
      desiredCheckInTime: "${formDataRef.value.desiredCheckInTime}",
      intermediary: ${formDataRef.value.intermediary},
      domestic: ${formDataRef.value.domestic}  
    }
  }) 
}
`);

            mutate().catch((error) => {
                const inputString = JSON.stringify(error.graphQLErrors[0].message);
                const cleanedString = inputString.replace(/\\n|\\/g, '');
                const regex = /"code":\s*"(\d+)"/;
                const match = cleanedString.match(regex);

                if (match && match.length > 1) {
                    const codeValue = match[1];

                    // 根据返回的码判断状态
                    if (codeValue == 4008) {
                        ElMessage({
                            message: '验证码错误',
                            type: 'warning',
                        })
                    } else if (codeValue == 41002) {
                        ElMessage({
                            message: '您已经注册了该账号',
                            type: 'warning',
                        })
                    }
                } else {
                    console.error("Code not found in input string");
                }
            });

            onDone((data) => {
                if (data) {
                    // 检查数据是否成功返回
                    if (data.errors) {
                        // 处理错误情况
                        console.error('注册失败:', data.errors);
                    } else {
                        // 注册成功
                        const registeredUser = data.data.registryUser;
                        // 在此处处理注册成功后的逻辑，例如显示成功消息或进行下一步操作
                        // console.log('注册成功:', registeredUser);
                        ElMessage({
                            message: '注册成功',
                            type: 'success',
                        })

                        localStorage.setItem('token', registeredUser)
                        router.push('/index')
                    }
                }
            })

        } else {
            console.log("error submit!");
            return false;
        }
    });
};

</script>
<style scope>

.login-container {
    height: 100%;

    .form-head {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
        background-color: rgb(64, 158, 255);
        color: white;
        padding: 10px;
        width: 100%;
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .form-title {
            /* text-align: center; */
        }

        .localeBtn {
            /* position: absolute;
            top: 10px;
            right: 10px; */
        }
    }

    .login-form {
        background-color: rgb(245, 245, 246);
        padding: 30px 10vw;
        width: 100%;

        .form-container {
            padding: 25px;
            background-color: #fff;
            margin-bottom: 20px;
            border-radius: 5px;

            .form-tit {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 20px;
                padding-bottom: 10px;
                /* border-bottom: 1px solid gray; */

            }

            .form-main {
                .form-line {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-column-gap: 10px;

                    .el-form-item {
                        margin-bottom: 30px;

                        .el-form-item__label {
                            width: 40%;
                            min-width: 100px;
                        }

                        .el-date-editor.el-input,
                        .el-date-editor.el-input__wrapper {
                            width: 100%;
                        }

                        .el-input {
                            position: absolute;
                            top: 0;
                        }

                        .el-button {
                            width: 80%;
                            position: absolute;
                            right: 0;
                            top: 0;
                            padding: 10px 0;
                        }

                        .captcha {
                            /* cursor: pointer;
                            position: absolute;
                            right: 0;
                            bottom: -20px; */
                        }
                    }

                    .radio-box {
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }

    }
}

@media (max-width: 1200px) and (min-width: 600px) {
    .login-form {
        padding: 20px 4vw !important;
    }
}

@media (max-width: 600px) {
    .login-container {
        padding: 0;

        .form-title {
            font-size: 14px;
            font-weight: bold;
            background-color: rgb(64, 158, 255);
            padding-top: 20px;
            padding-bottom: 10px;
            color: white;
            margin-bottom: 0;
        }

        .login-form {
            padding: 0;

            .form-container {
                padding: 15px;

                .form-tit {
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .form-main {
                    .form-line {
                        display: block;

                        .el-form-item {
                            display: grid;
                            grid-template-columns: 1fr 3fr;
                            /* grid-column-gap: 5px; */

                            .el-form-item__label {
                                min-width: 80px;
                            }

                            .el-form-item__content {}

                            .el-date-editor.el-input,
                            .el-date-editor.el-input__wrapper {}

                            .el-input {}

                            .el-button {}

                            .captcha {}
                        }

                        .radio-box {}
                    }
                }

                .form-main2 {
                    .form-line {

                        .el-form-item {
                            display: flex;
                            flex-direction: column;
                            margin-bottom: 8px;

                            .el-form-item__label {
                                min-width: initial;
                                width: 100%;
                                justify-content: flex-start;

                            }

                            .el-form-item__content {
                                width: 100%;

                                .el-input {
                                    position: relative;
                                }

                            }

                            .el-date-editor.el-input,
                            .el-date-editor.el-input__wrapper {}


                            .el-button {
                                width: 100%;
                                margin-top: 20px;
                                position: relative;
                            }

                        }


                        .captcha {
                            .el-form-item__content {
                                display: flex;
                                align-items: flex-end;

                                img {
                                    width: 50%;
                                }

                                button {}
                            }
                        }

                        .radio-box {}
                    }
                }
            }

        }
    }
}
</style>