# sample解析

- config函数会在AngularJs应用加载前执行，这样我们就能够确保它的执行顺序在Controller、Service和其他函数之前
- 也就是说，所有需要在应用启动之前执行和初始化的操作，都可以放在config中进行，比如，设置应用的URL终端、语言设置和 路由配置。

## provider与Service/factory的差异
- 不需要数组作为第二个参数，因为它不能依赖任何其他的服务。
