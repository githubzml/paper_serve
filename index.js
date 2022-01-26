const express = require('express')
const app = express()
const port = 3000

// path 处理路径模块
const path = require("path");

const ejs = require("ejs");

// 保存基本的绝对路径
// console.log('__dirname', __dirname);
global.__basename = __dirname

// 导入数据库连接
global.sequelize = require("./db/connect");

// 全局模型
global.Model = require("./db/model/model");

// 1.导入路由
let routes = require("./routes/routes");

// 访问静态文件
// app.use(express.static('static'))

// 设置模板路径
// views 文件夹名称
app.set("views", path.resolve(__dirname, "views"))

// 设置类型1
// app.set("view engine", "ejs");


// 设置类型2
app.set("view engine", "html");
app.engine(".html", ejs.__express);

// 解析post请求体
// 导入body
let bodyParser = require("body-parser");

app.use(bodyParser.json());

// 登录验证
app.use((req, res, next) => {
  console.log('req', req.query);

  // console.log("pass")
  // 给req对象添加属性
  req.aa = "some word";
  // 传递
  next();
})
// 白名单拦截
app.use((req, res, next) => {
  // console.log("白名单拦截")
  // 传递
  next();
})

// 2.使用路由
routes(app);

app.get("/get", (req, res) => {
  res.send('首页')
})

app.get("/testData", (req, res) => {
  res.send({
    name: "zs",
    age: 20
  })
})
// 注册
// app.get("/register", (req, res) => {
//   console.log('req123', req.query);
//   res.send({
//     msg: "请求成功",
//     status: "ok"
//   })
// })

// app.post("/login", (req, res) => {
//   // 截取post请求体参数
//   let params = req.body;
//   console.log('params', params);
//   res.send({
//     msg: "登录成功",
//     status: "ok"
//   })
// })

// 中间件 处理404
app.use((req, res) => {
  // 设置响应状态码
  res.status(404).send("找不到资源")
})

// 处理500
app.use((err, req, res) => {
  if (err) {
    res.status(500).send("服务器出错")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

