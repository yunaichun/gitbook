## 简介

> husky + commitlint + lintstaged 学习笔记。

## husky

#### 初始化 husky

```sh
# Install husky
npm install husky --save-dev

# Enable Git hooks
npx husky install

# add to package.json
npm set-script prepare 'husky install'
```

#### 创建 Hook

```sh
# commit-msg 钩子: commit 备注规范
npx husky set .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

# pre-commit 钩子: eslint 自动修复
npx husky set .husky/pre-commit 'echo pre-commit && npx lint-staged'
```

## commitlint.config.js

```js
module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [0],
    'type-empty': [0],
    'type-case': [0],
    'subject-empty': [0],
    'scope-case': [0],
    'commit-check': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'commit-check': ({ type, scope, subject }) => {
          const tips = '\n提交规范<type>(<scope>): <subject>';
          const types = ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'];

          // == 验证 subject
          const emptySubject = !subject || subject.trim().length === 0;
          if (emptySubject) return [false, `subject 不允许为空 ${tips}`];

          // == 验证 type
          const illegalType = types.indexOf(type) < 0;
          if (illegalType) return [false, `type 请填写: ${types.join(', ')} ${tips}`];

          // == 验证 scope
          const scopePattern = /release|NoTicket|[A-Z]+-\d+/;
          if (!scopePattern.test(scope)) return [false, `scope 请填写: jiraID, NoTicket ${tips}`];
          return [true];
        },
      },
    },
  ],
};
```

## .lintstagedrc.js

```js
module.exports = {
  'src/*.{ts,tsx,js,jsx}': ['eslint --fix'],
};

try {
  // check if eslint installed
  require.resolve('eslint');
} catch (e) {
  // disable eslint related config if current project doesn't use eslint
  module.exports = {};
}
```

## standard-version

```json
{
  "name": "root",
  "version": "1.10.0",
  "private": true,
  "devDependencies": {
    "@commitlint/cli": "^12.1.1",
    "@commitlint/config-angular": "^12.1.1",
    "husky": "^6.0.0",
    "lint-staged": "^10.5.4",
    "standard-version": "^9.3.0",
  },
  "scripts": {
    "prepare": "husky install",
    "release": "standard-version && git push --follow-tags origin master"
  }
}
```

## 参考资料

- [husky 官网](https://typicode.github.io/husky)
- [commitlint 官网](https://commitlint.js.org)
- [Git 钩子](https://malcolmyu.github.io/2015/10/16/Git-Hooks/)
- [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- [commitlint + husky 规范 commit 日志](https://blog.csdn.net/wei371522/article/details/84070803)
- [从零配置 Eslint + Prettier + husky + lint-staged 构建前端代码工作流](https://segmentfault.com/a/1190000022497035)
