<!--
<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          &lt;!&ndash;<a href="javascript:;" class="on">短信登录</a>
          <a href="javascript:;" >密码登录</a>&ndash;&gt;
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="computeTime>0" class="get_verification"
                      :class="{right_phone_number:rightPhone}" @click="sendCode">
                {{computeTime ? `已发送(${computeTime}s)` : '获取验证码'}}

              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                &lt;!&ndash;是否显示密码的区域&ndash;&gt;
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>

                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha" alt="captcha"
                     @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们:</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    &lt;!&ndash;@closeTip="closeTip"&ndash;&gt;
    <AlertTip v-if="isShowAlert" :alertText="alertText" @closeTip="closeTip"></AlertTip>
  </div>
</template>
&lt;!&ndash;<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {loginPwd, loginSms, sendCode} from '../../api'

  export default {
    data(){
      return{
        loginWay:true,  //true代表短信登录，false代表的是密码登录
        phone: '', // 手机号
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图片验证码
        computeTime:0, //计数器
        showPwd:false, //是否显示密码
        isShowAlert: false, //显示错误消息对话框
        alertText:'' //警告框的文本

      }
    },
    computed:{
      rightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      async sendCode(){
        //只有手机号合法才发送请求
        //if(this.rightPhone){
          //手机号合法开始计时
          this.computeTime = 30
          //开启计时器进行隔一秒减1
          const intervalId = setInterval(() => {
            this.computeTime&#45;&#45;
            if(this.computeTime ===0){
              clearInterval(intervalId)
            }
          },1000)
          // 发ajax请求, 发送验证码短信
          const result = await sendCode(this.phone)
          if(result.code === 1){
            this.showAlert(result.msg)
            clearInterval(intervalId)
            this.computeTime=0
          }
        //}
      },

      showAlert(text){
        //处理isShowAlert alertText
        this.isShowAlert = true
        this.alertText = text
      },
      async login(){
        let result
        //登录的时候要执行前台和后台验证
        //处理的是手机号登录
        if(this.loginWay){
          //拿到数据
          const {rightPhone , phone , code } = this
          //当手机不合法时提示用户信息
          if(!rightPhone){
            this.showAlert('手机号不正确')
            return
          }else if(!/^\d{6}$/.test(code)){
            this.showAlert('验证码不正确')
            return
          }
          //请求手机号和验证码登录
          result = await loginSms({phone , code})
        }else {//name,pwd,capcha
          //处理的是用户密码登录,得到上面需要判断的东西
          const {name , pwd , capcha} = this
          if(!name){
            this.showAlert('必须指定用户名')
            return
          }else if(!pwd){
            this.showAlert('必须指定密码')
            return
          }else if(capcha){
            this.showAlert('必须指定验证码')
            return
          }
          //请求用户名和密码登录
          result = await loginPwd({name , pwd , capcha})
        }
        //判断是否发送成功
        if(result.code === 1){
          this.showAlert(result.msg)
        }else {
          //成功就把user存到vuex中,从vuex中拿到user
          const user = result.data
          this.$store.dispatch('saveUserInfo' , user)
          //成功之后退到上一级路由
          this.$router.replace('/profile')

        }
      },
      closeTip(){
        this.isShowAlert = false
        this.alertText = ''
      },
      updateCaptcha (event) {
        event.target.src='http://localhost:3000/captcha?time='+Date.now()
      }

    },
    components:{
      AlertTip
    }
  }
</script>&ndash;&gt;
<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'

  import {loginPwd, loginSms, sendCode} from '../../api'

  export default {
    data () {
      return {
        loginWay: true, // true代表短信登录, false代表密码登录
        phone: '', // 手机号
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图片验证码
        computeTime: 0, // 倒计时的时间
        showPwd: false, // 是否显示密码, 默认不显示
        isShowAlert: false, // 是否显示警告框
        alertText: '', // 警告框的文本
      }
    },

    computed: {
      // 判断是否是合法的手机号
      rightPhone () { // 以1开头, 11位数字
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      async sendCode () {
        // 只有手机号合法, 才计时, 发送验证码请求
        //  开始计时
        this.computeTime = 30
        // 启动循环定时器: 每隔1s将computeTime减1
        const intervalId = setInterval(() => {
          this.computeTime&#45;&#45;
          // 一旦时间为0, 清除定时器
          if(this.computeTime===0) {
            clearInterval(intervalId)
          }
        }, 1000)
        // 发ajax请求, 发送验证码短信
        const result = await sendCode(this.phone)
        if(result.code===1) { // 发送验证码失败
          // 显示提示
          this.showAlert(result.msg)
          // 停止计时
          clearInterval(intervalId)
          this.computeTime = 0
        }
      },
      updateCaptcha (event) {
        event.target.src='http://localhost:3000/captcha?time='+Date.now()
      },

      showAlert(text) {
        this.isShowAlert = true
        this.alertText = text
      },

      async login () {
        let result
        // 前台表单验证, 如果不通过显示对应的提示
        if(this.loginWay) { // phone, code
          const {rightPhone, phone, code} = this
          if(!rightPhone) { // 显示警告框
            this.showAlert('手机号不正确')
            return
          } else if (!/^\d{6}$/.test(code)) {
            this.showAlert('验证码不正确')
            return
          }

          // 请求手机号/验证码登陆
          result = await loginSms({phone, code})

        } else { // name, pwd, captcha
          const {name, pwd, captcha} = this
          if(!name) { // 显示警告框
            this.showAlert('必须指定用户名')
            return
          } else if(!pwd) { // 显示警告框
            this.showAlert('必须指定密码')
            return
          } else if(!captcha) { // 显示警告框
            this.showAlert('必须指定验证码')
            return
          }

          // 请求用户名/密码码登陆
          result = await loginPwd({name, pwd, captcha})
        }

        if(result.code===1) { // 失败
          this.showAlert(result.msg)
        } else { // 成功
          // 将user保存到vuex中
          const user = result.data
          this.$store.dispatch('saveUserInfo', user)
          // 回退到上一个路由
          this.$router.replace('/profile')
        }
      },

      closeTip () {
        this.isShowAlert = false
        this.alertText = ''
      }
    },

    components: {
      AlertTip
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 667px
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(26px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
-->

<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">

              <button :disabled="computeTime>0 || !rightPhone" class="get_verification"
                      :class="{right_phone_number: rightPhone}" @click.prevent="sendCode">
                {{computeTime ? `已发送(${computeTime}s)` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">

                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>

                <div class="switch_button" :class="showPwd ? 'on' : 'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:3000/captcha" alt=""
                     @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip v-if="isShowAlert" :alertText="alertText" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'

  import {loginPwd, loginSms, sendCode} from '../../api'

  export default {
    data () {
      return {
        loginWay: true, // true代表短信登录, false代表密码登录
        phone: '', // 手机号
        code: '', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '', // 图片验证码
        computeTime: 0, // 倒计时的时间
        showPwd: false, // 是否显示密码, 默认不显示
        isShowAlert: false, // 是否显示警告框
        alertText: '', // 警告框的文本
      }
    },

    computed: {
      // 判断是否是合法的手机号
      rightPhone () { // 以1开头, 11位数字
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      async sendCode () {
        // 只有手机号合法, 才计时, 发送验证码请求
        //  开始计时
        this.computeTime = 30
        // 启动循环定时器: 每隔1s将computeTime减1
        const intervalId = setInterval(() => {
          this.computeTime--
          // 一旦时间为0, 清除定时器
          if(this.computeTime===0) {
            clearInterval(intervalId)
          }
        }, 1000)
        // 发ajax请求, 发送验证码短信
        const result = await sendCode(this.phone)
        if(result.code===1) { // 发送验证码失败
          // 显示提示
          this.showAlert(result.msg)
          // 停止计时
          clearInterval(intervalId)
          this.computeTime = 0
        }
      },
      updateCaptcha (event) {
        event.target.src='http://localhost:3000/captcha?time='+Date.now()
      },

      showAlert(text) {
        this.isShowAlert = true
        this.alertText = text
      },

      async login () {
        let result
        // 前台表单验证, 如果不通过显示对应的提示
        if(this.loginWay) { // phone, code
          const {rightPhone, phone, code} = this
          if(!rightPhone) { // 显示警告框
            this.showAlert('手机号不正确')
            return
          } else if (!/^\d{6}$/.test(code)) {
            this.showAlert('验证码不正确')
            return
          }

          // 请求手机号/验证码登陆
          result = await loginSms({phone, code})

        } else { // name, pwd, captcha
          const {name, pwd, captcha} = this
          if(!name) { // 显示警告框
            this.showAlert('必须指定用户名')
            return
          } else if(!pwd) { // 显示警告框
            this.showAlert('必须指定密码')
            return
          } else if(!captcha) { // 显示警告框
            this.showAlert('必须指定验证码')
            return
          }
          // 请求用户名/密码码登陆
          result = await loginPwd({name, pwd, captcha})
        }

        if(result.code===1) { // 失败
          this.showAlert(result.msg)
        } else { // 成功
          // 将user保存到vuex中
          const user = result.data
          this.$store.dispatch('saveUserInfo', user)
          // 回退到上一个路由
          this.$router.replace('/profile')
        }
      },

      closeTip () {
        this.isShowAlert = false
        this.alertText = ''
      }
    },

    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 667px
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(26px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
