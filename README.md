# ustc-auto-login

## 支持的浏览器

目前支持Chrome和Edge，尚不支持FireFox（FireFox尚不支持Manifest V3，不过应该快了[Manifest V3 migration guide | Firefox Extension Workshop](https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/#:~:text=Turn%20on%20the%20developer%20preview)）

## 功能

- 统一身份认证系统自动登录
- 邮箱系统自动登录

![](assets/demo.gif)

## 使用方法

1. 点击右侧Releases中的Latest，下载Assets中的ustc-auto-login.zip，将其解压到文件夹ustc-auto-login中，注意ustc-auto-login文件夹以后不能删除或移动，建议剪切到合适位置
   
   ![](assets/file_location.gif)

2. Chrome进入chrome://extensions/，从右上角打开开发者模式，点击左上角“加载已解压的扩展程序”，选择ustc-auto-login文件夹安装扩展
   
   ![](assets/chrome_add_extension.png)
   
   Edge进入edge://extensions/，从左侧打开开发人员模式，点击上方的“加载解压缩的扩展”，选择ustc-auto-login文件夹安装扩展
   
   ![](assets/edge_add_extension.png)

3. 点击浏览器右上角扩展按钮，下拉栏中点击“USTC自动登录”插件，在弹出窗口中输入学号、邮箱和密码，会自动保存
   
   ![](assets/enter_info.gif)

## 如何添加自动登录书签

USTC邮件系统使用指定链接：https://mail.ustc.edu.cn

其他需要统一身份认证的地方右键复制其链接，如教务系统为：https://jw.ustc.edu.cn/ucas-sso/login

![](assets/copy_link.png)

## TODO

- 一卡通密码和邮箱密码可能不一致
