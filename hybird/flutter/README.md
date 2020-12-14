## 简介

> Flutter 学习笔记。

## Flutter 项目初始化

> pod setup

```bash
$ sudo gem install cocoapods

$ pod setup
```

> 初始化项目

```text
flutter create my_app
```

## Android 模拟器

```text
1. 安装 jdk8
地址: https://www.imooc.com/article/287706
Android SDK 位置: sdk.dir = ~/Library/Android/sdk

2. 安装 Android Studio

3. 模拟器下载
Android Studio -> Tools -> AVD manager
模拟器安装位置: /Users/yunaichun/.android/avd

4. 启动模拟器
$ ~/Library/Android/sdk/emulator/emulator -list-avds
$ ~/Library/Android/sdk/emulator/emulator @Nexus_5X_API_29

5. 刷新 【在模拟器界面操作】
r
```

## iOS 模拟器

```
1. 模拟器下载
xCode -> preference -> components

2. 启动模拟器
open -a Simulator
Hardware -> Device -> 不同系统 -> 选择其他iPhone

3. 刷新 【在模拟器界面操作】
R
```

### 启动项目

> 项目启动

```bash
# 启动 Android
$ flutter run

# 下载依赖
$ flutter pub get

# 环境配置信息
flutter doctor -v

# 查看帮助
flutter -h
```

> flutter run 可能出错，配置以下两项

```text
第一步: 修改掉项目下的android目录下的build.gradle文件，把 google() 和 jcenter() 这两行去掉。改为阿里的链接。

maven { url 'https://maven.aliyun.com/repository/google' }
maven { url 'https://maven.aliyun.com/repository/jcenter' }
maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }

第二步: 修改Flutter SDK包下的flutter.gradle文件, 把 jcenter() 和 maven{} 去掉。改为阿里的链接。【位置在/usr/local/flutter/packages/flutter_tools/gradle/flutter.gradle】

//jcenter()
// maven {
//     url 'https://dl.google.com/dl/android/maven2'
// }
maven{
    url 'https://maven.aliyun.com/repository/jcenter'
}
maven{
    url 'http://maven.aliyun.com/nexus/content/groups/public'
}
```

# Flutter 打包 Android apk

> 1、启动图标

```text
位置:
my_app/android/app/src/main/AndroidManifest.xml

内容:
android:label="flutter_app"   //配置APP的名称，支持中文
android:icon="@mipmap/ic_launcher" //APP图标的文件名称
```

> 2、生成 keystore

```text
keytool工具位置查找: flutter doctor -v

keytool位置: cd /Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/jre/bin

生成 keystore: ./keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

> 3、创建 key.properties 文件

```text
位置: my_app/android/key.properties

内容: 
storePassword=***
keyPassword=***
keyAlias=key
storeFile=/Users/yunaichun/key.jks
```

> 4、配置 key 注册

```text
位置: my_app/android/app/build.gradle

内容1: android{ 这一行前面,加入如下代码
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

内容2:
buildTypes {
    release {
        signingConfig signingConfigs.debug
    }
}
替换为 ->
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

> 5、添加网络权限

```text
位置: android/app/src/main/AndroidManifest.xml

内容: 
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```

> 6、生成 apk

```text
命令: flutter build apk

输出: build/app/outputs/apk/release/app-release.apk

安装到虚拟机: flutter install 【需要flutter run起来项目】
```

# Flutter 项目实战

> 项目地址: https://github.com/yunaichun/flutter_study

## 参考资料

- [CocoaPods安装遇到的问题](https://www.meiwen.com.cn/subject/hmjopttx.html)
- [Flutter 官网](https://flutter.dev/docs/get-started/install)
- [Flutter 中文网](https://flutterchina.club/get-started/install/)
- [Flutter 第一季学习教程 - 环境搭建](https://www.jspang.com/detailed?id=41)
- [Flutter 第二季学习教程 - 常用组件](https://www.jspang.com/detailed?id=42)
- [Flutter 第三季学习教程 - 布局](https://www.jspang.com/detailed?id=43)
- [Flutter 第四季学习教程 - 页面导航和其他](https://www.jspang.com/detailed?id=44)
- [Flutter 20 个实例教程 ](https://www.jspang.com/detailed?id=45)
- [Flutter 实战-移动电商 ](https://www.jspang.com/detailed?id=53)
