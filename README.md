# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口
    你能从此项目中学到什么?

## 2. 开启项目开发
    使用脚手架创建项目
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构
    stylus的理解和使用
        结构化, 变量, minxin(混合)
    vue-router的理解和使用
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
        <router-link>: 路由链接
        <router-view>: 显示当前路由组件
    项目路由拆分
    底部导航组件: FooterGuide
    导航路由组件: Msite/Search/Order/Profile

## 4. 抽取组件
    头部组件: HeaderTop, 通过slot来实现组件通信标签结构
    商家列表组件: ShopList

## 5. 登陆路由组件
     静态组件
     FooterGuide的显示/隐藏: 通过路由的meta
     
## 6. 前后台交互
    后台接口测试
    ajax函数封装: axios + promise
    接口请求函数封装
    
# day02
## 1. 使用vuex管理状态

## 2. 异步显示数据
    1). 地址
    2). 食品分类轮播
    3). 商家列表
    
## 3. 开发Star组件
    
## 4. login组件
    1). 切换登陆方式
    定义一个loginWay的登录方式，这是一个布尔值
    例如：true代表短信登录，false代表的是密码登录
    :class="{on:loginWay}"添加这个属性来切换
    给标签添加监听切换显示样式@click="loginWay=true"
    
    2). 验证手机号(以1开头, 11位数字)
    验证手机号的时候看接口文档名字最好是一致的phone
    需要参数是phone和code
    "手机号" v-model="phone"
    v-model="code">获取验证码
    "手机/邮箱/用户名" v-model="name"
    "密码" v-model="pwd"
    "验证码" v-model="captcha"
    这些值必须初始化
    
    但是输入手机号的时候有一个灰色的显示就是多一个类名right_phone_number
    &.right_phone_number
      color black
      给类设置一个计算属性rightPhone
    
    3). 倒计时
    button的disable是动态的不是固定的computeTime
    
    4). 密码的显示/隐藏切换
    5). 一次性图片验证码
    
    
    
    
    
    
    
    
    
    
    
