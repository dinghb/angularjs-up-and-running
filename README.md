angularjs-up-and-running
========================

All the source code for the [AngularJS Up &amp; Running Book for O'Reilly](http://shop.oreilly.com/product/0636920033486.do)

*Steps To Server Files Locally*

Using NodeJS
```
git clone https://github.com/shyamseshadri/angularjs-up-and-running
cd angularjs-up-and-running
npm init
   (accept all defaults)
npm install --save http-server
node node_modules/http-server/bin/http-server
```

connect browser to http://localhost:8080
example directory is served

Using Python

```
git clone https://github.com/shyamseshadri/angularjs-up-and-running
cd angularjs-up-and-running
python -m SimpleHTTPServer
```

connect browser to http://localhost:8000
example directory is served

# 目录
前言 
## 第1章AngularJS概述  
AngularjS简介  
AngularjS，启航！  
   
## 第2章基本的AngularJS指令及控制器 
AngularJS模块  
创建自定义控制器  
数组的操作与显示  
更多指令  
ng—repeat的应用  
   
## 第3章AngularJS中的单元测试 
单元测试的定义及作用  
Karma简介  
Jasmine：定义式测试  
控制器的单元测试  
运行单元测试  
   
## 第4章表单、输入和服务 
ng—model的使用  
表单的使用  
使用数据绑定和模型  
表单状态及验证  
表单的错误处理  
ng—form与内嵌表单  
其他表单控件  
   
## 第5章AngularJS服务揭秘 
AngularJS服务  
创建自定义AngularJS服务  
   
## 第6章$http与服务器通信 
在$http中使用GET方式获取数据  
$http进阶应用  
   
## 第7章服务及XHR的单元测试 
单元测试中的依赖注入  
单元测试中的服务器请求  
   
## 第8章与过滤器共舞 
AngularJS过滤器介绍  
创建AngularJS自定义过滤器  
过滤器中的要点  
   
## 第9章过滤器的单元测试 
需要测试的过滤器  
测试timeAgo过滤器  
   
## 第10章ngRoute与页面迁移 
在单页面应用中进行页面迁移  
使用ngRoute  
迁移配置选项  
其他配置  
备选方案：ui—router  
   
## 第11章指令 
什么是指令？  
自定义指令  
基本的解决之道  
   
## 第12章指令的单元测试 
测试指令的步骤  
Stock Widget指令  
构建自定义指令的单元测试  
其他考虑  
   
## 第13章进阶指令 
AngularJS中的生命周期  
指令控制器及require选项  
编译  
Priority（优先级）和Terminal（终止）  
## 第三方指令集成  
推荐做法  
   
## 第14章端对端测试 
选择Protractor的理由  
初始化设置  
Protractor配置  
端对端测试  
我们的顾虑  
   
## 第15章指导方针和推荐做法 
测试  
项目结构  
构建  
推荐做法  
工具和库  
  

