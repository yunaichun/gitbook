## 一、简介

> 基于微软的 Rush 的 Monorepo 学习笔记。

#### rush 理念

- Rush 是多项目同一仓库管理的工具，是一个基于 pnpm 包管理的单仓库方案
- Rush 的思想每个仓库即使脱离出去，也可以独立运行

#### rush 优势

**1、依赖总量少 -> 安装快**

- 所有依赖包会安装在 common/temp/node_modules 下，子项目通过软链指向

**2、自动分析依赖 -> 找出差异项目**

- rush change 会找出影响到的包

**3、配置全局命令 -> 批量执行各项目**

- 在 common/config/rush/command-line.json 中配置全局命令

**4、基于 Rush 的 monorepo 仓库会强制让所有子项目保持版本统一**

- 子项目 npm 包如果与全局版本不同，会强制中断依赖安装

## 二、通用命令

#### 1、项目初始化

```sh
# 下载 h5.monorepo 项目
$ git clone localgit:web/h5.monorepo.git

# 进入 h5.monorepo 项目
$ cd h5.monorepo

# 为某一个项目安装依赖
$ rush install -t packageName

# 初始化 h5.monorepo 项目
$ npm install -g @microsoft/rush && rush install && rush update --full
```

#### 2、常用命令

**2.1、根目录常用命令**

```sh
# 为所有项目安装依赖
$ cd h5.monorepo
$ rush install

# 为所有项目更新依赖
$ cd h5.monorepo
$ rush update --full

# 检查项目的依赖是否一致，是否有缺失
$ cd h5.monorepo
$ rush check
```

**2.2、子项目常用命令**

```sh
# 以下以 qt-pages/test-deploy 子项目为例

# 子项目安装依赖包
$ cd qt-pages/test-deploy
$ rush add -p axios

# 子项目执行 scripts 脚本
$ cd qt-pages/test-deploy
$ rushx start
```

## 三、NPM 版本管理

#### 1、子项目添加至仓库前必须配置

- 配置文件位置: h5.monorepo/rush.json. 字段名称: projects
- **H5 项目 shouldPublish 为 false**
- **NPM 项目 shouldPublish 为 true**
- packageName 跟 projectFolder 的规范见下面的 `packageName 命名规范`

```json
{
  "projects": [
    {
      "packageName": "@qt-cli/cicd-job",
      "projectFolder": "qt-cli/cicd-job",
      "shouldPublish": true
    },
    {
      "packageName": "@qt-pages/test-deploy",
      "projectFolder": "qt-pages/test-deploy",
      "shouldPublish": false
    }
  ]
}
```

#### 2、NPM 项目发布前必备操作

**2.1、命令**

```
$ rush change
```

**2.2、何时执行 ```rush change```?**

- 修改了一个或多个 NPM 项目（shouldPublish 为 true）
- 且想发布到私有库

**2.3、```rush change```做了什么?**

- 这个命令会分析出你的更改会影响到哪些 NPM 项目: 修改的 NPM 项目 + 引用到此修改的项目
- 1、会依次询问你每个项目修改了什么内容以及需要更新哪一个版本号: { major, minor, patch, none }
- **2、输入完描述信息并选择更新的版本后会在 common/changes 下多出一个 <branch_name>_<date>.json 文件**

**2.4、```rush change```之后怎么做?**

```sh
# 因为 rush change 会生产 <branch_name>_<date>.json 文件，所以需要再提交一次
# 提交信息建议使用 chore(release): release <Project_Name>
$ git add -A
$ git commit -m "chore(release): release xxx"
$ git push
```

**2.5、git push 之后做了什么?**

- NPN: 合并到 master 分支后自动发布到 NPM 私有库
- H5: 合并到 staging 分支发布到测试环境 Upyun/AliOSS, 合并到 master 分支发布到正式环境 Upyun/AliOSS
- MP: 合并到 staging 分支生成微信小程序预览二维码, 合并到 master 分支上传到微信小程序后台，同时钉钉发送预览二维码

## 三、相关规范

#### 1、什么内容可以放这里

- 项目采用 Typescript，所有不需要经过容器化发布的项目都可以放这里。

#### 2、workspace 目录命名规范

- 基建 qt-base
- 脚手架 qt-cli
- React 组件 qt-rc
- H5 页面 qt-page
- 微信小程序 qt-mp
- 物料 qt-material
  - common (通用物料)
  - member (会员物料)
  - growth (增长物料)
  - activity (活动物料)

#### 3、packageName 命名规范

- **每新增一个子项目，则需要在 rush.json 文件中配置 packageName 和 projectFolder**
- projectFolder 为当前子项目所在目录，如: **qt-common/commit-check**
- packageName 命名规范为 @<workspace目录名称>/<文件夹名称>，如: **@qt-common/commit-check**

#### 4、H5 项目结构规范

```
├── build
├── config
│   └── rush-project.tsx
├── src
│   ├── components
│   │   └── App
│   │       ├── index.tsx
│   │       └── index.css
│   ├── assets
│   │   ├── imgs
│   │   └── fonts
│   └── index.tsx
├── .env
├── .eslintrc.js
├── package.json
├── tsconfig.json
├── CHANGELOG.md
└── README.md
```

#### 5、NPM 项目结构规范

```
├── bin
├── dist
├── config
│   └── rush-project.tsx
├── src
│   ├── test
│   │   └── scripts
│   │       └── xxx.test.ts
│   ├── scripts
│   │   └── xxx.ts
│   └── index.tsx
├── .env
├── .eslintrc.js
├── .npmignore
├── package.json
├── tsconfig.json
├── jest.config.js
├── CHANGELOG.md
└── README.md
```

#### 6、小程序项目结构规范

```
├── dist
├── config
│   └── rush-project.tsx
├── src
│   ├── app.ts
│   ├── app.scss
│   ├── index.html
│   ├── app.config.ts
│   └── common.scss
├── .env
├── .eslintrc.js
├── package.json
├── tsconfig.json
├── babel.config.js
├── project.config.json
├── project.private.config.json
├── CHANGELOG.md
└── README.md
```

#### 7、物料目录结构规范

```
├── src
│   └── image (物料名称)
│     ├── index.js (物料代码)
│     ├── config.json (物料配置)
│     └── README.md (物料使用说明)
├── index.js
├── .env
├── .eslintrc.js
├── package.json
├── CHANGELOG.md
└── README.md
```

## 四、注意事项

#### 1、使用 CRA

- 使用 CRA 创建子项目时，子项目根目录需要添加 .env 文件
- 目的是为了避免我们自己的  eslint 跟 CRA 的 eslint 冲突

```
/** .env */
SKIP_PREFLIGHT_CHECK=true
DISABLE_ESLINT_PLUGIN=true
```

#### 2、添加 config/rush-project.json

- 子项目需要添加 config/rush-project.json
- 目的是用于 Gitlab CI 中指定打包缓存的目录

```
/** rush-project */
{
  /**
   * Specify the folders where your toolchain writes its output files.  If enabled, the Rush build cache will
   * restore these folders from the cache.
   *
   * The strings are folder names under the project root folder.  These folders should not be tracked by Git.
   * They must not contain symlinks.
   */
  "projectOutputFolderNames": ["build"]
}
```

#### 3、package.json 需要排序

- gitlab ci 如果遇到以下错误，需要将 package.json 文件进行排序
- 对于 vscode 可以安装 Sort package.json 插件

```
* EXECUTING: /usr/bin/git checkout master 
error: Your local changes to the following files would be overwritten by checkout:
	qt-cli/cicd-job/package.json
Please commit your changes or stash them before you switch branches.
```

## 参考资料

- [前端100万行代码是怎样的体验？ - Alibaba F2E](https://mp.weixin.qq.com/s/tl7YG6y9j0bggzfFgMo2FQ)
- [Monorepo 的这些坑，我们帮你踩过了！ - 字节教育](https://juejin.cn/post/6972139870231724045)
- [rush解决方案 - Microsoft](https://rushstack.io)
- [pnpm: 最先进的包管理工具](https://mp.weixin.qq.com/s/TcHUoO-uUVU274gN3kx3og)
- [turborepo解决方案](https://turborepo.org/)
