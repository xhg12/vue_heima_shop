# vue_heima_shop

## 安装路由的时候碰到的问题

```
vue-router版本太高和vue2起冲突了,虽然router4.X的大部分的 Vue Router API 都没有变化,但vue-router 3.x 只能结合 vue2 进行使用~(网上查的说法,我翻了下router官方文档没找到这样的


解决也很简单：**卸载4版本的router,@指定版本装3.x的vue-router即可，我按自己的习惯安装3.5.2的vue-router亲测可用~**命令如下


npm uninstall vue-router
npm i vue-router@3.5.2

```

## 安装 less less-loader 的时候碰到的问题

```
后来发现是less和less-loader的版本过高了 我使用的是4.1 和10.1的版本

我将他们降级之后使用

1.先卸载

  npm uninstall less-loader

2.安装

npm install less-loader@4.1.0 -D

之后就可以使用了

因为Vue是2.X的版本

 less同样

安装

npm install less@3.9.0 -D
```

## 登录组件注意点

```
import axios from 'axios';
//为axios设置一下根路径（配置请求的根路径）
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
Vue.prototype.$http = axios;

重置表单操作
this.$refs.loginFormRef.resetFields();

发送请求前的预验证 (valid是布尔值)
this.$refs.loginFormRef.validate(valid=>{})
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
