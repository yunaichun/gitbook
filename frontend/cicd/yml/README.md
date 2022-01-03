## 简介

> .gitlab.yml 学习笔记。

## 处理项目

- H5
- NPM
- 微信小程序
- 物料代码片段

## yml 配置

```yml
# use docker image
image: local/infra/node-14.18.1-slim-h5-monorepo:0.0.1

# define stages
stages:
  - install
  - test
  - build
  - pre
  - deploy

# define cache
cache: &global_cache
  key:
    files:
      - common/config/rush/pnpm-lock.yaml
    prefix: ${CI_MERGE_REQUEST_TARGET_BRANCH_NAME}$CI_COMMIT_BRANCH
  paths:
    - qt-*/*/node_modules
    - qt-*/*/.rush
    - common/*
    - rush.json

# define anchor
.scope: &scope
  changes:
    - 'qt-*/**/*.*'
    - 'common/**/*.*'
    - .gitlab-ci.yml
    - rush.json

.runner: &runner
  tags:
    - frontend
  interruptible: true

.before_merged_to_staging_or_master: &before_merged_to_staging_or_master
  rules:
    - if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME =~ /^(master|staging)$/ && $CI_PIPELINE_SOURCE != "schedule"
      <<: *scope

.before_merged_to_staging: &before_merged_to_staging
  rules:
    - if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "staging" && $CI_PIPELINE_SOURCE != "schedule"
      <<: *scope

.before_merged_to_master: &before_merged_to_master
  rules:
    - if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == "master" && $CI_PIPELINE_SOURCE != "schedule"
      <<: *scope

.after_merged_to_staging_or_master: &after_merged_to_staging_or_master
  rules:
    - if: $CI_COMMIT_BRANCH =~ /^(master|staging)$/ && $CI_PIPELINE_SOURCE != "schedule"
      <<: *scope

.after_merged_to_staging: &after_merged_to_staging
  rules:
    - if: $CI_COMMIT_BRANCH == "staging" && $CI_PIPELINE_SOURCE != "schedule"
      <<: *scope

.after_merged_to_master: &after_merged_to_master
  rules:
    - if: $CI_COMMIT_BRANCH == "master" && $CI_PIPELINE_SOURCE != "schedule"
      <<: *scope

.build_cache: &build_cache
  artifacts:
    paths:
      - qt-pages/*/build
      - qt-*/*/dist

# all pipelines

### define job before merged to staging or master
install_test_lint:
  stage: install
  <<: *runner
  <<: *before_merged_to_staging_or_master
  <<: *build_cache
  cache:
    <<: *global_cache
    policy: pull-push
  before_script:
    - git remote set-url origin https://$CI_USERNAME:$CI_PUSH_TOKEN@git2.qingtingfm.com/web/$CI_PROJECT_NAME.git
    - git config --global user.email $GITLAB_USER_EMAIL
    - git config --global user.name $GITLAB_USER_ID
  script:
    # install
    - rush install
    # cache for postinstall
    - rush build-prd
    # unit test
    - rush test
    # lint test
    - git fetch origin
    - git checkout -b $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME origin/$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME
    - JOB=lint node qt-cli/cicd-job/src/h5.monorepo.js
    - git checkout $CI_COMMIT_SHORT_SHA

### define job after merged to staging or master
# define job of install stage
install:
  stage: install
  <<: *runner
  <<: *after_merged_to_staging_or_master
  <<: *build_cache
  cache:
    <<: *global_cache
    policy: pull
  script:
    - rush install

# define job of build stage
build_stg:
  stage: build
  <<: *runner
  <<: *after_merged_to_staging
  <<: *build_cache
  cache:
    <<: *global_cache
    policy: pull
  script:
    - rush build-stg --verbose

build_prd:
  stage: build
  <<: *runner
  <<: *after_merged_to_master
  <<: *build_cache
  cache:
    <<: *global_cache
    policy: pull
  script:
    - rush build-prd

# define job of pre stage
pre_performance:
  stage: pre
  <<: *runner
  <<: *after_merged_to_master
  cache:
    <<: *global_cache
    policy: pull
  script:
    # deploy pre
    - JOB=pre node qt-cli/cicd-job/src/h5.monorepo.js
    # notice
    - JOB=puppeteer node qt-cli/cicd-job/src/h5.monorepo.js

# define job of deploy stage
deploy_stg:
  stage: deploy
  <<: *runner
  <<: *after_merged_to_staging
  cache:
    <<: *global_cache
    policy: pull
  script:
    - JOB=stg node qt-cli/cicd-job/src/h5.monorepo.js

deploy_notice:
  stage: deploy
  <<: *runner
  <<: *after_merged_to_master
  cache:
    <<: *global_cache
    policy: pull
  before_script:
    - git remote set-url origin https://$CI_USERNAME:$CI_PUSH_TOKEN@git2.qingtingfm.com/web/$CI_PROJECT_NAME.git
    - git config --global user.email $GITLAB_USER_EMAIL
    - git config --global user.name $GITLAB_USER_ID
  script:
    - pwd

    # deploy npm
    - rush install
    - rush change -v && rush publish -a -p -b master --add-commit-details --ignore-git-hooks

      # deploy h5、mp、material
    - JOB=prd node qt-cli/cicd-job/src/h5.monorepo.js

    # update readme
    - ts-node qt-cli/readme-generator/src/start.ts readme
    - 'git add -A && git commit -m "docs(release): update README.md [skip ci]" --no-verify && git push origin HEAD:master --no-verify'

    # notice all
    - JOB=notice node qt-cli/cicd-job/src/h5.monorepo.js
  resource_group: h5_npm_mp_material
```

## 参考资料

#### GitLab CI/CD 相关

- [GitLab 官方文档](https://docs.gitlab.com/runner/register/)
- [GitLab CI/CD 系列教程](https://www.bilibili.com/video/BV1iv41177zU/)
- [CSDN 系列博客](https://blog.csdn.net/github_35631540)

#### Jenkins CI/CD 相关

- [从 0 到 1 实现一套 CI/CD 流程](https://juejin.cn/book/6897616008173846543/section/6897634827311251471)
- [CI 持续集成和 CD 持续交付](http://www.pickstyle.cn/CI&CD/1.html)
