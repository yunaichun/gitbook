## 简介

> React Native 学习笔记。

## React 项目初始化

```bash
npm install -g npx
npx create-react-app my-app
```

## React Native 项目初始化

> expo 初始化

```bash
$ npm install -g expo-cli

$ expo init my_app

$ npm start
```

> react-native-cli 初始化

```bash
$ cnpm install -g react-native-cli

$ brew install watchman

# 指定版本
$ react-native init my_app --version 0.44.3
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
double click: r

6. 打开调试面板
command + m
```

## iOS 模拟器

```
1. 模拟器下载
xCode -> preference -> components

2. 启动模拟器
open -a Simulator
Hardware -> Device -> 不同系统 -> 选择其他iPhone

3. 刷新 【在模拟器界面操作】
command + r

4. 打开调试面板
command + d
```

### 启动项目

```bash
# 启动 Android
$ react-native run-android

# 启动 iOS
$ react-native run-ios
```

# React Native 打包 Android apk

> 1、生成签名证书

```text
keytool工具位置查找: flutter doctor -v

keytool位置: cd /Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/jre/bin

生成 keystore: ./keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```

> 2、创建 key.properties 文件

```text
位置: my_app/android/key.properties

内容: 
storePassword=***
keyPassword=***
keyAlias=key
storeFile=/Users/yunaichun/key.jks
```

> 3、配置 key 注册

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
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
```

> 4、添加网络权限

```text
位置: my_app/android/app/src/main/AndroidManifest.xml

内容: 
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
```

> 5、生成 apk

```text
进入项目下的android目录: ./gradlew assembleRelease

输出: my_app/build/app/outputs/apk/release/app-release.apk

验证打包后文件: react-native run-android --variant=release
```

# React Native 项目实战

> 项目地址: https://github.com/yunaichun/rn_study

## 参考资料

##### 官网
- [React 新特性介绍](https://github.com/reactjs/rfcs/blob/master/text)
- [React Native 官网](http://facebook.github.io/react-native/docs/getting-started.html)
- [React Native 中文网](https://reactnative.cn/docs/0.47/getting-started.html#content)

##### 布局
- [Flex 布局 - 阮一峰](ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [React Native 布局 - Flex](http://www.devio.org/2016/08/01/Reac-Native%E5%B8%83%E5%B1%80%E8%AF%A6%E7%BB%86%E6%8C%87%E5%8D%97/)

##### 导航器
- [React Native 导航器 - NavigationActions、StackActions](http://www.devio.org/2018/12/15/react-navigation3x/)
- [React Native 导航器 - createStackNavigator](https://www.devio.org/2018/12/24/createStackNavigator/)
- [React Native 导航器 - createMaterialTopTabNavigator](http://www.devio.org/2019/01/03/createMaterialTopTabNavigator/)
- [React Native 导航器 - createBottomTabNavigator](https://www.devio.org/2018/12/30/createBottomNavigator/)
- [React Native 导航器 - createDrawerNavigator](https://www.devio.org/2019/01/20/createDrawerNavigator/)
- [React Native 导航器 - createSwitchNavigator](https://www.devio.org/2019/01/21/createSwitchNavigator/)

##### 高性能列表组件
- [React Native 高性能列表组件 - FlatList](https://www.devio.org/2019/05/19/flatlist/)
- [React Native 高性能列表组件 - SwipeablFlatList](https://medium.com/@rutvikbhatt9/how-to-use-swipeableflatlist-new-react-native-experimental-component-cb792b1c7b0a)，不过在 0.60 版本已经移除
- [React Native 高性能列表组件 - SectionList](https://facebook.github.io/react-native/docs/sectionlist)

##### 离线缓存策略
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Native 缓存 - AsyncStorage](https://www.devio.org/2016/09/05/React-Native%E4%B9%8BAsyncStorage%E5%AD%98%E5%82%A8key%E7%AE%A1%E7%90%86%E5%B0%8F%E6%8A%80%E5%B7%A7/)

##### 混合开发
- [React Native 与 Android 混合开发](https://www.devio.org/2018/08/26/React-Native-Hybrid-Android/)
- [React Native 与 iOS 混合开发](https://www.devio.org/2018/08/26/React-Native-Hybrid-iOS/)

##### 打包和上架
- [React Native 打包 Android](https://www.devio.org/2019/11/08/react-native-Release-APP-Signature-Package-APK/)
- [React Native 打包 iOS](https://www.devio.org/2019/11/08/React-Native-releases-packaged-iOS-apps-for-apps/)
- [iOS App上架流程](https://www.jianshu.com/p/72ec3c1c4c2d)
