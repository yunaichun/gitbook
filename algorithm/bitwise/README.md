## 简介

> 算法-位运算学习笔记。

## 基础知识

```text
1、进制转换
二进制->十进制: 科学计数法
十进制->二进制: 短除取余法

2、进制区分
为了和十进制（0d）区别，十六进制在前面加上 0x，二进制在前面加上 0b
0x2a 代表十六进制，值为 2a，a 为 16 进制的 10

3、负数: 正数的反码再加上1

4、位运算
&: 与。两个位都为 1 ，结果才为 1。
|: 或。两个位都为 0 ，结果才为 0。
^: 非。两个位相同为 0 ，相异为 1。
~: 取反。0 变 1， 1 变 0。
<<: 左移。
>>: 右移。

5、常用技巧
判断奇偶: x & 1 === 1
清除最低位 1: x & (x - 1)

得到最低位 1: x & -x
```

## 二进制位 1 的个数

- leetcode: https://leetcode.cn/problems/number-of-1-bits

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n = n & (n - 1);
    count++;
  }
  return count;
};
```

## 是否是 2 的 n 次幂

- leetcode: https://leetcode.cn/problems/power-of-two

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  /** 仅有1个1: 清除最低位的1为0即可 */
  return n > 0 && !(n & (n - 1));
};
```

## n 个数分别每个 1 的个数

- leetcode: https://leetcode.cn/problems/counting-bits

```js
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const a = [0];
  for (let i = 1; i <= n; i += 1) {
    a[i] = a[i & (i - 1)] + 1;
  }
  return a;
};
```

## 参考资料

- [数据结构与算法 JavaScript 描述](https://book.douban.com/subject/25945449/)
- [极客时间算法课程](https://time.geekbang.org/course/intro/100019701)
