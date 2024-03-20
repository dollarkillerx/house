<template>
    <van-nav-bar title="登录" class="navbar" />

    <!-- 切换语言 -->
    <van-field v-model="langVal" is-link readonly label="语言" placeholder="选择语言" @click="showLangPicker = true" />
    <van-popup v-model:show="showLangPicker" round position="bottom">
        <van-picker :columns="langColumns" @cancel="showLangPicker = false" @confirm="onConfirmLang" />
    </van-popup>
    <!-- 切换语言 -->

    <van-form @submit="onSubmit" class="login-form">
        <van-cell-group class="form-group">
            <div class="form-group-tit">{{ t('app.myinfo') }}</div>
            <van-field v-model="formDataRef.name" :name="t('app.name')" :label="t('app.name')"
                :placeholder="t('app.name')" :rules="formRulesRef.name" />
            <van-field v-model="formDataRef.password" type="password" :name="t('app.password')"
                :label="t('app.password')" :placeholder="t('app.password')" :rules="formRulesRef.password" />
            <van-field v-model="formDataRef.phone" :name="t('app.phone')" :label="t('app.phone')"
                :placeholder="t('app.phone')" :rules="formRulesRef.phone" />
            <van-field v-model="formDataRef.email" :name="t('app.email')" :label="t('app.email')"
                :placeholder="t('app.email')" :rules="formRulesRef.email" />
            <van-field v-model="formDataRef.invitationCode" :name="t('app.invitationCode')"
                :label="t('app.invitationCode')" :placeholder="t('app.invitationCode')"
                :rules="formRulesRef.invitationCode" />
        </van-cell-group>
        <van-cell-group class="form-group">
            <div class="form-group-tit">{{ t('app.rentinfo') }}</div>
            <van-field v-model="formDataRef.budget" :name="t('app.budget')" :label="t('app.budget')"
                :placeholder="t('app.budget')" :rules="formRulesRef.budget" />
            <van-field v-model="formDataRef.school" :name="t('app.school')" :label="t('app.school')"
                :placeholder="t('app.school')" :rules="formRulesRef.school" />

            <!-- 通勤时间 -->
            <van-field v-model="formDataRef.commuteTime" is-link readonly :name="t('app.commuteTime')"
                :label="t('app.commuteTime')" :placeholder="t('app.commuteTime')" :rules="formRulesRef.commuteTime"
                @click="showPicker = true" />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-picker :columns="columns" @confirm="onConfirmTime" @cancel="showPicker = false" />
            </van-popup>
            <!-- 通勤时间 -->

            <van-field v-model="formDataRef.sizeHope" :name="t('app.sizeHope')" :label="t('app.sizeHope')"
                :placeholder="t('app.sizeHope')" :rules="formRulesRef.sizeHope" />

            <!-- 选择入住时间 -->
            <van-field v-model="formDataRef.desiredCheckInTime" is-link readonly :name="t('app.desiredCheckInTime')"
                :label="t('app.desiredCheckInTime')" :placeholder="t('app.desiredCheckInTime')"
                :rules="formRulesRef.desiredCheckInTime" @click="showCalendar = true" />
            <van-calendar class="form-calendar" v-model:show="showCalendar" @confirm="onConfirm" />
            <!-- 选择入住时间 -->

            <!-- 人在日本还是国内 -->
            <van-field :name="t('app.domestic')" :label="t('app.domestic')">
                <template #input>
                    <van-radio-group v-model="formDataRef.domestic" direction="horizontal" class="form-radio">
                        <van-radio name="true">{{ t('app.japanse') }}</van-radio>
                        <van-radio name="false">{{ t('app.chinese') }}</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <!-- 人在日本还是国内 -->

            <!-- 当前联系的中介数量 -->
            <van-field v-model="formDataRef.intermediary" :name="t('app.intermediary')" :label="t('app.intermediary')"
                :placeholder="t('app.intermediary')" :rules="formRulesRef.intermediary" />
            <!-- 当前联系的中介数量 -->

            <!-- 验证码 -->
            <van-field :name="t('app.captchaCode')" :label="t('app.captchaCode')" class="captcha-wrapper">
                <template #input>
                    <img id="outputImage" src="" alt="验证码" class="captcha-img">
                    <button @click.prevent="getCaptcha" class="captcha-btn">{{ t('app.captchaChange') }}</button>
                </template>
            </van-field>

            <!-- 验证码 -->

            <!-- 输入验证码 -->
            <van-field v-model="formDataRef.captchaCode" :name="t('app.captchaInput')" :label="t('app.captchaInput')"
                :placeholder="t('app.captchaCode')" :rules="formRulesRef.captchaCode" />
            <!-- 输入验证码 -->

        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit" class="form-btn">
                提交
            </van-button>
        </div>
    </van-form>
</template>
<script setup>
import { ref, reactive, toRef, watchEffect } from 'vue'
import { useI18n } from "vue-i18n";
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { showNotify } from 'vant';
import { useRouter } from 'vue-router';

//切换语言
const { t, locale } = useI18n();
const langColumns = [
    { text: '中文', value: 'zh' },
    { text: '日语', value: 'ja' },
];
const langVal = ref('');
const showLangPicker = ref(false);

const onConfirmLang = ({ selectedOptions }) => {
    showLangPicker.value = false;
    langVal.value = selectedOptions[0].text;
    locale.value = selectedOptions[0].value;
    localStorage.setItem('lang', langVal.value);
};

// 路由
const router = useRouter();

// 表单数据和规则
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
        desiredCheckInTime: "3月20日",
        intermediary: 1,
        domestic: "true"
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
                message: t('app.emailtips'),
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
                message: t('app.invitationCodetips'),
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
                message: t('app.phonetips'),
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
                message: t('app.passwordtips'),
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
                message: t('app.nametips'),
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
        ]
    }

});
const formDataRef = toRef(data, 'formData');
const formRulesRef = toRef(data, 'rules');

// 日期选择器
const showCalendar = ref(false);
const onConfirm = (date) => {
    formDataRef.value.desiredCheckInTime = `${date.getMonth() + 1}月${date.getDate()}日`;
    showCalendar.value = false;
};

//通勤时间选择
const showPicker = ref(false);
const columns = [
    { text: '电车15分钟内', value: '电车15分钟内' },
    { text: '电车25分钟内', value: '电车25分钟内' },
    { text: '电车35分钟内', value: '电车35分钟内' },
    { text: '电车60分钟内', value: '电车60分钟内' },
];
const onConfirmTime = ({ selectedOptions }) => {
    formDataRef.value.commuteTime = selectedOptions[0]?.text;
    showPicker.value = false;
};

//获取验证码
//查询验证码规则
const GqlCaptcha = gql`
query{
  captcha{
    base64Captcha
    captchaId
  }
}
`;
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
        console.log(result.value.captcha.captchaId)
        formDataRef.value.captchaID = result.value.captcha.captchaId;
        transformCode(result.value.captcha.base64Captcha)
    }
});
//更换验证码
const getCaptcha = () => {
    refetch()
    transformCode(result.value.captcha.base64Captcha)
}

//提交表单
const onSubmit = (values) => {
    console.log('submit', values);

    // 创建gql请求
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

    //处理请求返回
    mutate().catch((error) => {
        //错误处理
        const inputString = JSON.stringify(error.graphQLErrors[0].message);
        const cleanedString = inputString.replace(/\\n|\\/g, '');
        const regex = /"code":\s*"(\d+)"/;
        const match = cleanedString.match(regex);

        if (match && match.length > 1) {
            const codeValue = match[1];

            // 根据返回的码判断状态
            if (codeValue == 4008) {
                showNotify({ type: 'danger', message: '验证码错误' });
            } else if (codeValue == 41002) {
                showNotify({ type: 'danger', message: '您已经注册了该账号' });
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
                showNotify({ type: 'danger', message: '注册失败，请稍后重试' });
            } else {
                // 注册成功
                const registeredUser = data.data.registryUser;
                // 在此处处理注册成功后的逻辑，例如显示成功消息或进行下一步操作
                // console.log('注册成功:', registeredUser);
                showNotify({ type: 'success', message: '注册成功' });

                localStorage.setItem('token', registeredUser)
                router.push('/index')
            }
        }
    })
};

</script>
<style scope>
.navbar {
    background-color: var(--deepBlue);

    .van-nav-bar__title {
        color: white;
    }
}

.login-form {
    padding-bottom: 20px;
}

.form-btn {
    background-color: var(--deepBlue);
}

.form-group {
    margin-top: 10px;

    .form-group-tit {
        color: var(--deepBlue);
        font-weight: bold;
        font-size: 14px;
        text-align: left;
        padding: 10px 8px;
    }

    .form-calendar {
        .van-calendar__day {
            color: black;
        }

        .van-calendar__day--disabled {
            color: #c8c9cc;
        }
    }

    .form-radio {}

    .captcha-wrapper {

        .captcha-img {
            width: 100%;
        }

        .captcha-btn {
            background-color: inherit;
            color: var(--deepBlue);
            font-size: 12px;
            min-width: 100px;
        }
    }
}
</style>