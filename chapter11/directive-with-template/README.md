#  指令



## sample运行结果
```js
<body ng-app="stockMarketApp" class="ng-scope">
    <div ng-controller="MainCtrl as mainCtrl" class="ng-scope">
        <h3>List of Stocks</h3>
        <!-- ngRepeat: stock in mainCtrl.stocks -->
        <div ng-repeat="stock in mainCtrl.stocks" class="ng-scope">
            <div stock-widget="">
                <!-- File: chapter11/directive-with-template/stock.html -->
                <div class="stock-dash">
                    Name:
                    <span class="stock-name ng-binding" ng-bind="stock.name">First Stock</span> Price:
                    <span class="stock-price ng-binding" ng-bind="stock.price | currency">$100.00</span> Percentage Change:
                    <span class="stock-change ng-binding" ng-bind="mainCtrl.getChange(stock) + '%'">-54%</span>
                </div>
            </div>
        </div>
        <!-- end ngRepeat: stock in mainCtrl.stocks -->
        <div ng-repeat="stock in mainCtrl.stocks" class="ng-scope">
            <div stock-widget="">
                <!-- File: chapter11/directive-with-template/stock.html -->
                <div class="stock-dash">
                    Name:
                    <span class="stock-name ng-binding" ng-bind="stock.name">Second Stock</span> Price:
                    <span class="stock-price ng-binding" ng-bind="stock.price | currency">$140.00</span> Percentage Change:
                    <span class="stock-change ng-binding" ng-bind="mainCtrl.getChange(stock) + '%'">17%</span>
                </div>
            </div>
        </div>
        <!-- end ngRepeat: stock in mainCtrl.stocks -->
        <div ng-repeat="stock in mainCtrl.stocks" class="ng-scope">
            <div stock-widget="">
                <!-- File: chapter11/directive-with-template/stock.html -->
                <div class="stock-dash">
                    Name:
                    <span class="stock-name ng-binding" ng-bind="stock.name">Third Stock</span> Price:
                    <span class="stock-price ng-binding" ng-bind="stock.price | currency">$110.00</span> Percentage Change:
                    <span class="stock-change ng-binding" ng-bind="mainCtrl.getChange(stock) + '%'">0%</span>
                </div>
            </div>
        </div>
        <!-- end ngRepeat: stock in mainCtrl.stocks -->
        <div ng-repeat="stock in mainCtrl.stocks" class="ng-scope">
            <div stock-widget="">
                <!-- File: chapter11/directive-with-template/stock.html -->
                <div class="stock-dash">
                    Name:
                    <span class="stock-name ng-binding" ng-bind="stock.name">Fourth Stock</span> Price:
                    <span class="stock-price ng-binding" ng-bind="stock.price | currency">$400.00</span> Percentage Change:
                    <span class="stock-change ng-binding" ng-bind="mainCtrl.getChange(stock) + '%'">-4%</span>
                </div>
            </div>
        </div>
        <!-- end ngRepeat: stock in mainCtrl.stocks -->
    </div>
    <script src="https://cdn.bootcss.com/angular.js/1.3.2/angular.js"></script>
    <script src="app.js"></script>
    <script src="directive.js"></script>
</body>

```