# ustc-auto-login

## 功能

- 统一身份认证系统自动登录
- 邮箱系统自动登录

## 使用方法

FireFox不支持manifest v3，没有去适配

Chrome和Edge使用方法如下：

1. 点击右侧Releases中的Latest，下载Assets中的ustc-auto-login.zip，将其解压到文件夹ustc-auto-login中，注意ustc-auto-login文件夹以后不能删除或移动，建议剪切到合适位置

2. Chrome浏览器进入<chrome://extensions/>，从右上角打开开发者模式，点击左上角“加载已解压的扩展程序”，选择ustc-auto-login文件夹安装扩展

   Edge进入<edge://extensions/>，从左侧打开开发人员模式，点击上方的“加载解压缩的扩展”，选择ustc-auto-login文件夹安装扩展

3. 点击浏览器右上角扩展按钮，下拉栏中点击“USTC自动登录”插件，在弹出窗口中输入学号、邮箱和密码，会自动保存

4. 将书签更改为指定链接

   新版教务系统：https://passport.ustc.edu.cn/login?service=https%3A%2F%2Fjw.ustc.edu.cn%2Fucas-sso%2Flogin

   BB系统：https://passport.ustc.edu.cn/login?service=https%3a%2f%2fwww.bb.ustc.edu.cn%2fwebapps%2fbb-SSOIntegrationDemo-BBLEARN%2fexecute%2fauthValidate%2fcustomLogin%3freturnUrl%3dhttp%3a%2f%2fwww.bb.ustc.edu.cn%2fwebapps%2fportal%2fframeset.jsp%26authProviderId%3d_103_1

   邮件系统：https://mail.ustc.edu.cn

之后点击这些书签就可以免登录了

在其他需要统一身份认证的地方，如个人图书馆、健康打卡，点击按钮也会自动登录