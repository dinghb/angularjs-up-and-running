# link函数
link函数和directive的关系类似于， 控制器与视图的关系

AngularJs会为指令的每一个实例都执行link函数，这样每一个实例都可以获取它自己`独有`的、完整的业务逻辑，而不影响同一指令的其他实例。
从这个角度来看，类似于以外我们在Java之类的编程语言的私有函数/私有变量。

## sample说明
在`directive.js`中使用link函数:
```javascript
link: function($scope, $element, $attrs) {
        $scope.getChange = function(stock) {
          return Math.ceil(((stock.price - stock.previous) /
              stock.previous) * 100);
        };
      }
```
其中,link函数的三个参数：
 - $scope: 表示指令对应元素的作用域
 - $element: 表示指令所对应的元素
 - $attr: 用字符串的形式表示元素的所有属性。
 

这样在`stock.html`调用中就不再使用Controllerd的方法`mainCtrl.getChange(stock)`来调用了，取而代之是直接使用指令中link函数定义的getChange(stock)函数。

也就是说这时候指令将使用指令自己作用域范围内定义的函数。
