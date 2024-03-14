import { createApp, provide ,h,render} from 'vue'
import App from "./App.vue";
import router from "./router/index.js"; //路由
import ElementPlus from "element-plus"; //element-plus
import "element-plus/dist/index.css"; //element-plus
import { zhCn } from "element-plus/es/locale/lang/zh-cn"; //element-plus
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //图标
import {  ApolloClient,createHttpLink,InMemoryCache } from '@apollo/client/core'
import {DefaultApolloClient,provideApolloClient} from '@vue/apollo-composable'
import i18n from "../src/lang/index.js"

const httpLink = createHttpLink({
    uri:'http://43.135.75.195:8101/graphql',
})

const cache=new InMemoryCache()

const apolloClient = new ApolloClient({
    link:httpLink,
    cache,
})


provideApolloClient(apolloClient);

const app=createApp({
    setup(){
        provide(DefaultApolloClient,apolloClient)
    },

    render:() =>h(App)
})


app.use(router); //路由
app.use(ElementPlus, {
  //element-plus
  locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //图标
  app.component(key, component);
}

app.use(i18n);
app.mount("#app");

