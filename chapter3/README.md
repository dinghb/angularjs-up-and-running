# 单元测试

## 测试定义
将单个函数从代码中抽离出来，为它编写断言以及测试用例来确保它的实际运行结果是符合预期的。



## 为什么需要

* 正确性验证
* 弥补编译器的缺乏
* 尽早发现错误
* 防止回归错误
* 良好的说明方式


## 测试驱动开发TDD

* Code is written only when there is a failing test that requires the code to pass.
* The bare minimum amount of code is written to ensure that the test passes.
* Duplication is removed at every step.
* When all tests pass, the next failing test is added for the next required functionality.


## Karma简介

### karma和Jesmine

Karma是测试运行器，只负责找出代码中所有的单元测试用例，然后打开浏览器并测试它们，最后获取运行结果。
Jesmine是测试框架，定义了测试用例的语法和API。


