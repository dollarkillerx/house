import { createI18n } from "vue-i18n";
import zh from "../lang/zh.json"
import ja from "../lang/ja.json"

export default new createI18n({
    legacy:false,
    locale:"zh",
    fallbackLocale:"zh",
    messages:{
        zh,
        ja,
    },
});