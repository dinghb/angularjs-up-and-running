# ng-include

ng-include可以让我们将HTML分解成更小到、可复用到也是更容易维护的文件中，而不是直接写到一个文件中。

## 指令的调用方式

通过使用在控制器中定义的变量，引入一个url
index.html
```
<div ng-inculde="mainCtrl.stockTemplate">
```
