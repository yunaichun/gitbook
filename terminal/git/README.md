## 简介

> Git 学习笔记。

## 配置用户

```bash
# 1、配置
git config --global user.name "name" user.email "email"

# 2、初始化目录
git init

# 3、生成 ssh-key
ssh-keygen -t rsa -C "email"

# 4、本地目录关联远程项目
git remote add origin git@github.com:git账号/项目名.git
```

## 版本创建流程

```bash
# 1、工作区添加至缓存区
git add file

# 2、缓存区至版本库  
git commit -m ""

# 3、在git add 之前查看变化
git diff file

# 4、查看状态
git status

# 5、查看版本流水线
git log --pretty=oneline

# 6、查看历史命令
git reflog
```

## 撤销修改

```bash
# 1、add 之前
git checkout -- fileName（可以恢复没有git add 但是rm file的操作）

# 2、add 之后，commit 之前
git reset HEAD fileName

# 3、commit 之后
git reset --hard commitid
```

## 本地分支操作

```bash
# 1、查看本地分支
git branch

# 2、查看远程分支
git branch -a

# 3、创建本地分支
git branch dev

# 4、切换分支
git checkout dev(上面两步等价于 git checkout -b dev)

# 5、删除本地分支
git branch -d dev

# 6、合并本地分支至master分支（在master分支执行操作）
git merge --no-ff -m ""  dev 

# 7、合并其他分支指定 commit 至指定分支（在当前分支执行操作）
git cherry-pick commitid

# 8、合并提交记录（https://segmentfault.com/a/1190000007748862）
git rebase -i HEAD~3

# 9、解决冲突（本地在dev分支执行命令）
git pull origin staging
git rebase origin/staging -X theirs

# 10、删除新增的文件和文件夹
git clean -xdf
```

## 本地远程交互操作

```bash
# 1、查看远程库信息
git remote (-v -a)

# 2、下载远程master分支
git clone git@github.com:git账号/项目名.git

# 3、下载远程dev分支至本地dev分支
git checkout -b dev origin/dev

# 4、推送本地分支至远程
git push origin (master dev)

# 5、删除远程分支
git push origin --delete 远程分支

# 6、更新本地分支
git pull
```

## 缓存工作区

```bash
# 1、暂存
git stash

# 2、回到暂存前状态
git stash pop
```

## 参考资料

- [Git教程](https://www.liaoxuefeng.com/wiki/896043488029600/)
- [git commit 规范指南](https://www.jianshu.com/p/201bd81e7dc9?utm_source=oschina-app)
- [Gitbook 集成 Gittalk ](https://juejin.cn/post/6844903939091988494)
