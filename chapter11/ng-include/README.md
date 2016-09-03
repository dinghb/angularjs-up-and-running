# ng-include

ng-include可以让我们将HTML分解成更小到、可复用到也是更容易维护的文件中，而不是直接写到一个文件中。

ng-include的值表示的是一个HTML文件的路径，然后ng-include就会根据这个路径从服务器中请求该文件，并在包含了该ng-inculde元素的`子元素`中显示内容。
比如，例子中index.html中的<div ng-inculde="mainCtrl.stockTemplate">引入的stock.html文件，显示在页面上如下：
```html
<div ng-include="mainCtrl.stockTemplate" class="ng-scope">
  <!-- ngInclude: mainCtrl.stockTemplate -->
  <!-- File: chapter11/ng-include/stock.html -->
  div class="stock-dash ng-scope">
    Name:
    <span class="stock-name ng-binding" ng-bind="stock.name">First Stock</span>
    Price:
    <span class="stock-price ng-binding" ng-bind="stock.price | currency">$100.00</span>
    Percentage Change:
    <span class="stock-change ng-binding" ng-bind="mainCtrl.getChange(stock) + '%'">-54%</span>
  </div>
</div>
```

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
