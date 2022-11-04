## 简介

> Renovate 自动升级依赖学习笔记。

## 安装

- 官方提供 cli、docker、安装应用(Github)、克隆项目(Gitlab)等方法注册服务
- 此文章介绍通过克隆项目 [renovate-runner](https://gitlab.com/renovate-bot/renovate-runner) 注册 Gitlab 私有库依赖自动升级服务

#### Github

- 通过安装应用的方法注册服务
- 参考地址: https://docs.renovatebot.com/getting-started/installing-onboarding/

#### Gitlab

- 通过克隆项目的方法注册服务
- 参考地址: https://docs.renovatebot.com/gitlab-bot-security/

```
1、下载项目: https://gitlab.com/renovate-bot/renovate-runner

2、上传到私有 Gitlab 仓库 renovate-runner
```

## 配置 CICD 变量

- renovate-runner 仓库添加以下 CICD 变量

#### RENOVATE_TOKEN

- 位置: Glitlab -> Settings -> Access Tokens -> Create Personal access tokens
- 参考地址: https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#creating-a-personal-access-token

#### GITHUB_COM_TOKEN

- 位置: Glithub -> Settings -> Developer Settings -> Personal access tokens -> Generate new token(classic)
- 参考地址: https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token

#### RENOVATE_EXTRA_FLAGS

- 参考地址: https://git2.qingtingfm.com/yunaichun/renovate-runner

```
--autodiscover=true --autodiscover-filter=yunaichun/project --onboarding=true

autodiscover: 有 renovate.json 文件的项目会自动升级

autodiscover-filter: 有 renovate.json 文件的项目，但是指定了具体的项目文件名 (多个用空格分割)

onboarding: 每次 mr 提交面板都有详细的信息
```

#### RENOVATE_BINARY_SOURCE

```
1、设置为 global: 为 docker 安装指定的工具

2、否则会流水线会报错: https://docs.renovatebot.com/self-hosted-configuration/#binarysource
```

## 配置 GitLab yml 文件

- renovate-runner 修改根目录 .gitlab.yml 文件

```yml
include:
  - project: "yunaichun/renovate-runner"
    file: "/templates/renovate-dind.gitlab-ci.yml"

renovate:
  tags:
    - yourlocagitlabrunnertab
  before_script:
    - EXPO_DEBUG=true
    - npm config set registry yourlocalnpm
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule"'
    - if: '$CI_PIPELINE_SOURCE == "push"'
```

## 配置 GitLab CICD 定时任务

- renovate-runner 修改 CICD 定时任务

```
Description: every day

Interval Pattern: 0 2 * * *

Cron Timezone: Beijing

Target Branch: master

Activated: true
```

## 配置 renovate.json

- 参考地址: https://docs.renovatebot.com/configuration-options/

#### 自动合并

```
platformAutomerge: 是否会自动合并

automergeType: 可选 pr 配合 ignoreTests 为 true 无需等待测试自动合并

ignoreTests: 没有测试但仍希望 Renovate 自动合并 pr

assignees: 每次 pr 发起人的信息

commitMessageSuffix: 自动合并的时候会有一次 commit 提交，最后的 msg
```

```json
{
  "platformAutomerge": true,
  "automergeType": "pr",
  "ignoreTests": true,
  "assignees": ["yunaichun@qingting.fm"],
  "commitMessageSuffix": "[skip ci]"
}
```

#### updateInternalDeps

```
monorepo 仓库使用: 更新依赖的 npm 包
```

```json
{
  "updateInternalDeps": true
}
```

#### rebaseWhen

```
baseBranches: 向哪个分支发送 pr

rebaseWhen: 假如合并的时候有冲突，先 rebase 同步 master 再提交 pr
```

```json
{
  "baseBranches": ["master"],
  "rebaseWhen": "conflicted"
}
```

#### postUpgradeTasks

```
commands: 代表自动 merge 之前 (commit 代码之前) 执行的命令

fileFilters: 会 commit 进来的文件

executionMode: branch-每个分支的 pr 都会执行 commands; update-统一批次的只会执行一次 commands
```

```json
{
  "postUpgradeTasks": {
    "commands": [
      "cd common/autoinstallers/rush-commit-check && pnpm install && cd ../../../",
      "rush update"
    ],
    "fileFilters": ["**/pnpm-lock.yaml", "**/repo-state.json"],
    "executionMode": "branch"
  }
}
```

#### packageRules

```
matchPackageNames: 精确匹配的 npm 包名称

matchPackagePatterns: 模糊匹配上的 npm 包名称

excludePackagePatterns: 排除匹配的 npm 包名称

matchUpdateTypes: major, minor, patch, pin, pinDigest

matchSourceUrlPrefixes + groupName: 针对同一组织，非 monorepo 仓库，保持这一类下的包版本一致(如果是 monorepo 的仓库则不用配置)

automerge: 设置之后会自动合并，外部如果设置了 platformAutomerge 则不用设置了
```

```json
{
  "packageRules": [
    /** 所有版本均会自动合并: 内部包、prettier、测试 */
    {
      "matchPackagePatterns": ["^@qt-", "^@testing-", "^prettier"],
      "excludePackagePatterns": ["@testing-library/react"],
      "automerge": true
    },
    /** 除了大版本会自动合并: webpack、rollup、eslint、babel */
    {
      "matchPackageNames": ["webpack", "webpack-cli", "react-scripts"],
      "matchPackagePatterns": [
        "^eslint",
        "^@babel",
        "-loader$",
        "^@rollup",
        "^rollup"
      ],
      "matchUpdateTypes": ["minor", "patch", "pin", "digest"],
      "automerge": true
    },
    /** 其余所有包小版本会自动合并 */
    {
      "excludePackagePatterns": ["^@microsoft", "typedoc"],
      "matchUpdateTypes": ["patch", "pin", "digest"],
      "automerge": true
    },
    /** webpack 有很多包但不是 monorepo 仓库，保持此类所有包版本一致 */
    {
      "matchUpdateTypes": ["patch", "pin", "digest"],
      "matchSourceUrlPrefixes": ["https://github.com/webpack-contrib"],
      "groupName": "webpack-contrib",
      "automerge": true
    },
    /** taro 已经改为 monorepo 了，此规则可以删除 */
    {
      "matchUpdateTypes": ["patch", "pin", "digest"],
      "matchSourceUrlPrefixes": ["https://github.com/NervJS/taro"],
      "groupName": "tarojs monorepo",
      "automerge": true
    }
  ]
}
```
