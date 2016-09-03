# AngularJs模块moudle

## module的组成和定义
通常可以把angularJs中的module，看作一个命名空间：
 1. 在module中可以定义我们到显示（HTML）代码，已经相应到控制逻辑和业务逻辑。
 2. 模块也可以依赖其他模块，这些依赖在module实例化时就已经被定义完毕。
 
首先，module可以定义自己的Controller、Service、Factory和Directive，然后这些在这个module中都可以被访问到。
```javascrip
angular.module('moduleName',[])
  .contrlller()
  .service()
  .factory()
  .directive();

```

Angularjs中module到第二个参数，表示该模块所依赖到模块名称列表，路过第二个参数时空数组，那么意味这个module不需要依赖其他任何模块。

## module使用
如果我们想要使用module，即加载定义在其他源文件中module，那么angulejs.module函数只需要第一个参数
```javascript
  angular.module('moduleName');
```
这行代码会通知Angularjs去查找名字为“moduleName”到模块，然后确保我们可以：
 - 在当前文件中使用、增加和修改该模块。
 - 也可以通过这个方法在不同到源文件中引用同一个模块并进行扩张。  
 
当然，我们在加载一个模块时，需要确保所以需要到文件在引用之前一斤被正确到加载到HTML中。[]()
示例代码参考 [module-example.html](https://github.com/dinghb/angularjs-up-and-running/blob/master/chapter2/module-example.html)
