## 简介

> React 简易实现-createElement学习笔记。

## createElementSimple 实现

```text
由上一节可知 createElementSimple 本质:

1、参数: type、props、children 属性

2、返回: js 对象 - { type, props: [{ type, props, children: [] }] }
```

```js
export default function createElementSimple(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object'
          ? child
          : createTextElement(child)
      ),
    },
  }
}
```

## createTextElement 实现

```text
由于节点可能是文本节点，这里需要特殊处理一下

createTextElement 生成文本节点的逻辑如下
```

```js
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
```

## 结果验证

#### jsx 代码

```js
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
// == 等价于
// const element = createElementSimple(
//   "div",
//   { id: "foo" },
//   createElementSimple("a", null, "bar"),
//   createElementSimple("b")
// );
console.log(1111, element);
```

#### 执行结果

```json
{
  "type": "div",
  "props": {
    "id": "foo",
    "children": [
      {
        "type": "a",
        "props": {
          "children": [
            {
              "type": "TEXT_ELEMENT",
              "props": {
                "nodeValue": "bar",
                "children": []
              }
            }
          ]
        }
      },
      {
        "type": "b",
        "props": {
          "children": []
        }
      }
    ]
  }
}
```

## 项目地址

地址: https://github.com/yunaichun/react-study/tree/master/react-simple/simple-two

## 参考资料

- [手把手带你实现ToyReact框架](https://u.geekbang.org/lesson/50)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
