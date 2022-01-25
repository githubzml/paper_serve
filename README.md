# 2022-1-24

### 2-1

单线程 只能执行单个任务

事件驱动 接受请求 就会触发一个事件 由这个事件完成请求内容
非阻塞 异步
API 绝大数都是异步的 实现并发效果

"express": "^4.17.2", 

"nodemon": "^2.0.15"

nodemon 当文件发生变化的时候 自动重启nodejs服务器的模块

uuid 唯一标识

Web服务器模块

登录验证
其他拦截

白名单验证

app.use 中间件

### 2-6

ejs 模板引擎

设置模板引擎路径

// 设置类型1
// app.set("view engine", "ejs"); 

// 设置类型2
app.set("view engine", "html"); 
app.engine(".html", ejs.__express); 

### 2-8

// 访问静态文件
// app.use(express.static('static'))

### 2-9

get 请求方式
post 请求方式

### 2-10

基本的绝对路径

后台服务器架构设计

### 3-1

server

```
 | - index.js 服务器入口层
 | - config 配置
 | - whiteList 白名单
 | - routes 路由层
 | - routesController 路由控制器层
 | - utils 工具库
 | - API层
 | - lib层
     | - ORM api
     | - model 模型
     | - 连接配置

```

### 3-2

抽离路由层 到单独文件夹
端口写5000以上 防止与系统端口冲突

## 2022-1-25

### 3-3

分离路由层和配置层

分层处理
每一个模块只做一件事情

### 3-4

sequelize模块连接数据库

创建数据库 再设置表 传统方式很麻烦

ORM sequelize模块 只需要定义一些模型 自动生成表

sequelize模块操作数据库

npm install --save mysql2 数据库驱动模块

新建一个连接
sequelize模块连接数据库

### 3-5

定义模型 来映射一个表结构

### 3-6

mysql 联通

通过模型 动态创建表结构

### 3-7  3-8  3-9

静态登录页面搭建
