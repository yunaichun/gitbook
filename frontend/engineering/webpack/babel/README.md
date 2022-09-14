## 简介

> babel 学习笔记。

## babel 相关插件区别

- @babel/core: 包含 @babel/parser @babel/traverse @babel/types @babel/template , 不包含 @babel/generator
- @babel/parser: 可以将 jsx, flow, typescript 转换成 ast
- @babel/generator: 可以将 AST 转换成 code
- @babel/traverse: 与 @babel/parser 一起使用，遍历 ast
- @babel/types: 是一个用于 AST 节点的 Lodash 式工具库，同时也可生成新的 ast 节点
- @babel/template: 相比 @babel/types，可以基于代码模版创建多 ast 节点

## 常用语法

#### ImportDeclaration ( import声明 )

```js
import 'a'
```

#### ImportDefaultSpecifier ( import default说明符 )

```js
import a from 'a'
```

#### ImportSpecifier ( import说明符 )

```js
import { a } from 'a'
```

#### BlockStatement ( 块 )

```js
{}
```

#### IfStatement ( if )

```js
if () {}
```

#### ForStatement ( for )

```js
for (;;){}
```

#### ForInStatement ( for in )

```js
for (a in b) {}
```

#### ForOfStatement ( for of )

```js
for (a of b) {}
```

## 函数相关

#### FunctionDeclaration ( 函数声明 )

```js
function a() {}
```

#### FunctionExpression ( 函数表达式 )

```js
var a = function() {}
```

#### ArrowFunctionExpression ( 箭头函数表达式 )

```js
var a = () => {}
```

#### AwaitExpression ( await表达式 )

```js
async function a () { await b() }
```

#### ClassDeclaration ( class声明 )

```js
/** 类的内部是 ClassBody-类的内部 */ 
class A {}
```

## 变量申明

#### VariableDeclarator ( 变量声明 )

```js
/** var,const,let用Node中的kind区分 */
var
const
let
```

#### Identifier ( 变量名 )

```js
var a
```

#### Literal ( 变量值 )

```js
/** NumberLiteral */
var a = 1
/** StringLiteral */
var a = 'a'
/** BooleanLiteral */
var a = true
/** NullLiteral */
var a = null
/** RegExpLiteral */
var a = /\d/g
/** TemplateLiteral */
var a = ``
```

## 常用语句

#### CallExpression ( 函数调用调用表达式 )

```js
/** 上一层是一个 ExpressionStatement-表达式语句 */
a()
```

#### NewExpression ( new表达式 )

```js
/** 上一层是一个 ExpressionStatement-表达式语句 */
new A()
```

#### AssignmentExpression ( 赋值表达式 )

```js
/** 上一层是一个 ExpressionStatement-表达式语句 */
a = 1
```

#### MemberExpression ( 成员表达式 )

```js
/** 上一层是一个 ExpressionStatement-表达式语句 */
a.b
```

#### ArrayExpression ( 数组表达式 )

```js
var a = []
```

#### ObjectExpression ( 对象表达式 )

```js
/** 这里的 b: 1 是一个 ObjectProperty-对象属性 */
/** 这里的 c() {} 是一个 ObjectMethod-对象函数方法 */
var a = { b: 1, c() {} }
```

## 常见 Pattern

#### AssignmentPattern ( 函数参数 )

```js
/** 函数参数是 AssignmentPattern */
function Hello(name = 'Lily'){}
```

#### ArrayPattern ( 数组解构 )

```js
/** 左边是 ArrayPattern 右边是 ArrayExpression */
var [ a, b ] = [ 1, 2 ]
```

#### ObjectPattern ( 对象解构 )

```js
/** 左边是 ObjectPattern 右边是 ObjectExpression */
var { a } = { a: 1 }
```

## JSX 相关

#### SpreadElement ( 扩展运算符 )

```js
/** ...a 为 SpreadElement */
var b = { ...a }
var b = [ ...a ]
```

#### RestElement ( 函数参数扩展运算符 )

```js
/** ...a 为 RestElement */
var a = (...a) => a
```

#### JSXIdentifier ( jsx 标签名 )

```js
/** div 为 JSXIdentifier */
export default () => <div a={a} {...b}>123</div>;
```

#### JSXAttribute ( jsx 普通组件传参 )

```js
/** 其中 {a} 为 JSXAttribute */
export default () => <div a={a} {...b}>123</div>;
```

#### JSXSpreadAttribute ( jsx 扩展运算符组件传参 )

```js
/** 其中 {...b} 为 JSXSpreadAttribute  */
export default () => <div a={a} {...b}>123</div>;
```

#### JSXExpressionContainer  ( jsx 语法表识符 )

```js
/** 其中 {} 为 JSXExpressionContainer */
export default () => <div a={a} {...b}>123</div>;
```

#### JSXText  ( jsx 内嵌文本 )

```js
/** 其中 123 为 JSXText */
export default () => <div a={a} {...b}>123</div>;
```

## 参考文档

- [@babel/core](https://www.babeljs.cn/docs/babel-core)
- [@babel/parser](https://www.babeljs.cn/docs/babel-parser)
- [@babel/generator](https://www.babeljs.cn/docs/babel-generator)
- [@babel/traverse](https://www.babeljs.cn/docs/babel-traverse)
- [@babel/types](https://www.babeljs.cn/docs/babel-types)
- [@babel/template](https://www.babeljs.cn/docs/babel-template)
- [在线 babel](https://www.babeljs.cn/repl)
- [在线 ast](https://astexplorer.net)
- [babel深入教程（babel7版本）](https://zhuanlan.zhihu.com/p/72995336)
