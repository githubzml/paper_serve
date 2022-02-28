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

# 2011-1-26

### 3-10 3-11 3-12

用户注册前端验证

密码加密 写入数据库
用户是否已存在
npm install crypto-js 加密模块

MD5 加密
hex输出 16进制

### 3-14 

数据写入数据库

### 3-15

检测注册邮箱 

没有注册则注册
注册过了 提示已经被注册了

### 3-16

发邮件

获取邮箱验证码

### 3-17

保存邮箱验证码到数据库

3-18
验证验证码

# 2022-1-27

### 3-18

验证验证码

moment  处理时间模块

### 3-19

登录模块

### 3-20 

跟服务器换取一个合理的token  存在浏览器端

每次访问有关于用于页面的都必须把这个token 发给后台服务器

访问有关用户信息的页面 必须携带token 验证有没有登录过

### 3-21

token 被加密的字符串 登录验证

生成 解析

### 3-22 3-23 3-24 3-25 3-26

静态页制作

### 3-27 

token 的验证

### 3-28 

获取用户数据 接口查询

### 3-29

添加商品类型 与用户id关联防止信息丢失

搜索区域

### 3-30 

查询商品数据类型

将nodejs项目部署到服务区 让前端项目可访问

这个方向还是调整一下吧 
在本地能运行跑通再说线上的问题

本地的项目务必达到功能闭合

### 3-31 3-32

 搜索 查询 商品类型数据

### 3-33 - 3-39 

对lunwen 无用途

### 3-40 无

### 3-41

商品发布UI界面

### 3-42

点击商品发布弹框 通过接口查询所有的商品类型

### 3-43

绑定数据类型 预览上传图片

获取图片的base64

FileReader

### 3-44

定义商品模型

### 3-45

发布商品 上

### 3-46

发布商品 中 图片上传

### 3-47

3:28 将前端传递数据写入数据库 

### 3-48

左侧筛选

收藏

全局上的搜索

聊天框架

地址

支付

主图
附图3个图片

数据库的增删改查

### 3-63 选择上传头像和退出登录


### 3-64 修改用户头像
14：11