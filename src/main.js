import { createApp, provide, h, render } from "vue";
import App from "./App.vue";
import {
  Button,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Form,
  Field,
  CellGroup,
  NavBar,
  Calendar,
  RadioGroup,
  Radio,
  Picker,
  Popup,
  Notify,
  Card,
  DropdownMenu, DropdownItem,
  Image as VanImage
} from "vant"; //引入vant组件
import "vant/lib/index.css"; //引入vant组件样式
import "amfe-flexible";
import router from "./router/index.js"; //路由import i18n from "../src/lang/index.js"
import i18n from "../src/lang/index.js";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import {
  DefaultApolloClient,
  provideApolloClient,
} from "@vue/apollo-composable";

const httpLink = createHttpLink({
  uri: "http://43.135.75.195:8101/graphql",
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

provideApolloClient(apolloClient);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});


app.use(i18n);

//注册vant组件
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Swipe);
app.use(SwipeItem);
app.use(Grid);
app.use(GridItem);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(NavBar);
app.use(Calendar);
app.use(RadioGroup);
app.use(Radio);
app.use(Picker);
app.use(Popup);
app.use(Notify );
app.use(Card );
app.use(DropdownMenu );
app.use(DropdownItem );
app.use(VanImage);
//路由
app.use(router);

app.mount("#app");
