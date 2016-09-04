## 指令嵌套transclude进阶

## 运行结果 
```html
List of Stocks

We found First Stock at 0
We found Second Stock at 1
We found Third Stock at 2
We found Fourth Stock at 3
```

## 页面代码 
```html
<body ng-app="stockMarketApp" class="ng-scope">
    <div ng-controller="MainCtrl as mainCtrl" class="ng-scope">
        <h3>List of Stocks</h3>
        <!-- simpleStockRepeat: mainCtrl.stocks -->
        <div class="container">
            <div simple-stock-repeat="mainCtrl.stocks" class="ng-binding ng-scope">
                We found First Stock at 0
            </div>
            <div simple-stock-repeat="mainCtrl.stocks" class="ng-binding ng-scope">
                We found Second Stock at 1
            </div>
            <div simple-stock-repeat="mainCtrl.stocks" class="ng-binding ng-scope">
                We found Third Stock at 2
            </div>
            <div simple-stock-repeat="mainCtrl.stocks" class="ng-binding ng-scope">
                We found Fourth Stock at 3
            </div>
        </div>
    </div>
    <script src="https://cdn.bootcss.com/angular.js/1.3.2/angular.js"></script>
    <script src="app.js"></script>
    <script src="directive.js"></script>
</body>
```

## 是否应该使用嵌套

权衡以下场景：
* Is only the content of the directive important, or is the element on which the di‐ rective is applied necessary as well? Use transclude: true in the former, and transclude: element in the latter.
* If it’s a simple matter of displaying the transcluded content as is, use the ng- transclude directive directly in your directive template.
* Do we need to generate multiple copies of the template or add behavior, variables, and business logic to the scope on which the transclusion is done? If so, inject the transcluding function into our link function.
* Call the transclusion function with an optional new scope (this is recommended) and linking function for that instance. Within the linking function, add the func‐ tions and variables that the template needs.

通常使用场景：类似旋转幻灯片或无限下拉滚动条。
