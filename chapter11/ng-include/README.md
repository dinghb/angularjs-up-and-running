# ng-include

ng-include可以让我们将HTML分解成更小到、可复用到也是更容易维护的文件中，而不是直接写到一个文件中。

## 指令的调用方式

通过使用在控制器中定义的变量，引入一个url  
 /index.html
```html
<div ng-inculde="mainCtrl.stockTemplate">
```

也可以直接在HTML的ng-include中指定路径。
```html
<div ng-inculde="'view/stock.html'">
```
此时需要，在双引号中，使用单引号将路径`view/stock.html`包裹起来，表明这个路径是一个字面量，而不是让angularjs将其当成一个变量。

## 特点


## 限制
