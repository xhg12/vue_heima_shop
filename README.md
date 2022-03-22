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

## 左侧侧边栏一级分类图标注意点

```
  模板中的标签（在遍历的过程中给i标签动态设置class类从而动态设置图标）
    <!-- 图标 -->
    <i :class="iconsObj[item.id]"></i>
  data中的数据
    iconsObj: {
    125: 'iconfont icon-users',
    103: 'iconfont icon-tijikongjian',
    101: 'iconfont icon-shangpin',
    102: 'iconfont icon-danju',
    145: 'iconfont icon-baobiao',
    },
```

## 在权限管理中的角色列表时

```
删除角色指定权限时
在函数中传入的两个参数(scope.row,rightId)
为什么传scope.row而不传scope.row.id
    因为删除了该角色对应的权限时要刷新该角色下权限，调用接口返回最新的权限数据，方便进行赋值
    scope.row = res.data
```

## 在开发商品管理的分类管理时用到的第三方库

```
npm i vue-table-with-tree-grid -S
```

## 在开发添加商品时碰到的问题

```
:action="uploadURL"

该请求发送请求用的不是ajax请求，用的是内部的请求，请求结果是无效的token

所以必须自定义请求头携带token

 //图片上传组件的headers请求头对象
headersObj: {
  Authorization: window.sessionStorage.getItem('token'),
},
```

See [Configuration Reference](https://cli.vuejs.org/config/).
