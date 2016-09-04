# 指令控制器和require

## 指令的link函数与指令控制器 

指令的link函数是一个非常理想的添加行为和业务逻辑的地方，也就是说我们用link函数来定义指令的行为。 
但是，link函数只能在每一条指令的实例内使用，指令控制器，则是主要用于跨指令(inter-directive)之间的交互。 
这个跨指令交互指的是一条对应某个元素的指令与另一条对应的父元素或者同一元素的指令进行交互。

## require
通过在／tab.js中tab指令中使用require: '^tabs', 我们告诉Angularjs当前tab指令需要在它某个父元素中执行tabs指令，其父元素也能够被tab指令访问到。

```js
// File: chapter13/directive-controllers/tab.js
angular.module('stockMarketApp')
  .directive('tab', [function() {
    return {
      restrict: 'E',
      transclude: true,     
      template: '<div ng-show="selected" ng-transclude></div>',
      require: '^tabs',    // <=== added 
      scope: true,
      link: function($scope, $element, $attr, tabCtrl) {
        tabCtrl.registerTab($attr.title, $scope);
      }
    };
  }]);
```


## sample运行页面代码
```html
<body ng-app="stockMarketApp" class="ng-scope">
    <div ng-controller="MainCtrl as mainCtrl" class="ng-scope">
        <tabs class="ng-scope">
            <div class="tab-headers">
                <!-- ngRepeat: tab in tabs -->
                <div ng-repeat="tab in tabs" ng-click="selectTab($index)" ng-class="{selected: isSelectedTab($index)}" class="ng-scope selected"> <span ng-bind="tab.title" class="ng-binding">First Tab</span> </div>
                <!-- end ngRepeat: tab in tabs -->
                <div ng-repeat="tab in tabs" ng-click="selectTab($index)" ng-class="{selected: isSelectedTab($index)}" class="ng-scope"> <span ng-bind="tab.title" class="ng-binding">Second Tab</span> </div>
                <!-- end ngRepeat: tab in tabs -->
            </div>
            <div ng-transclude="">
                <tab title="First Tab" class="ng-scope">
                    <div ng-show="selected" ng-transclude="" class=""><span class="ng-binding ng-scope">
        This is the first tab.
        The app started at Sep 4, 2016
      </span></div>
                </tab>
                <tab title="Second Tab" class="ng-scope">
                    <div ng-show="selected" ng-transclude="" class="ng-hide"><span class="ng-scope">
        This is the second tab
        </span>
                        <!-- ngRepeat: stock in mainCtrl.stocks -->
                        <div ng-repeat="stock in mainCtrl.stocks" class="ng-binding ng-scope">
                            Stock Name: First Stock
                        </div>
                        <!-- end ngRepeat: stock in mainCtrl.stocks -->
                        <div ng-repeat="stock in mainCtrl.stocks" class="ng-binding ng-scope">
                            Stock Name: Second Stock
                        </div>
                        <!-- end ngRepeat: stock in mainCtrl.stocks -->
                        <div ng-repeat="stock in mainCtrl.stocks" class="ng-binding ng-scope">
                            Stock Name: Third Stock
                        </div>
                        <!-- end ngRepeat: stock in mainCtrl.stocks -->
                        <div ng-repeat="stock in mainCtrl.stocks" class="ng-binding ng-scope">
                            Stock Name: Fourth Stock
                        </div>
                        <!-- end ngRepeat: stock in mainCtrl.stocks -->
                    </div>
                </tab>
            </div>
        </tabs>
    </div>
    <script src="https://cdn.bootcss.com/angular.js/1.3.2/angular.js"></script>
    <script src="app.js"></script>
    <script src="tabs.js"></script>
    <script src="tab.js"></script>
</body>

```