# 指令的scope

## 默认scope 

默认情况下，每一条指令都继承了它的父作用域(也就是传入link函数的scope参数)，且指令的作用域与父元素的作用域保持一致，也就是说: 
* 指令能够访问父作用域中所有定义的变量和函数
* 任何指令作用域的修改会立即影响到父作用域。

这样导致的问题： 
* 该作用域中添加的变量/函数 也会影响到父作用域。
* 父作用域中也会突然出现一些变量和函数
* 指令可以会无意间覆盖了父作用域中已有的同名函数/变量
* 指令也可能无意间用到了父作用域中的函数/变量

## scope参数 

AngularJs在定义指令时，有一个scope参数：
```javascript
// File: chapter11/directive-with-scope/directive.js
angular.module('stockMarketApp')
  .directive('stockWidget', [function() {
    return {
      restrict: 'A',
      scope: {
        stockData: '='
      }
    };
  }]);
``` 
scope参数可以接受：
* false: 默认值，指令的作用域与父作用域一致，指令的作用域中的修改能够影响父作用域。
* true: 指令的作用域继承与父作用域，不过指令会创建自己的作用域

从上面来说，scope的值为false时相当于java中的值传递，值为true时，可以理解成引用传递。



