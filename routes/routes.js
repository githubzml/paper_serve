// 导入路由控制器层
let routerController = require("../routesController/routesController");

// 路由
module.exports = (app) => {
  // 匹配一个路由 下面的内容都不会执行 应为有返回值了 
  app.get('/', (req, res) => {
    // console.log(req.aa);
    // console.log("///");
    // res.send('Hello World! asd');

    // res.render("index");

    res.send("访问成功")
  })

  app.get('/a', (req, res) => {
    // console.log(req.aa);
    // console.log("///");
    // res.send('Hello World! asd');

    // res.render("index");

    res.send("访问成功a")
  })
  // 验证验证码
  app.use(routerController.validCode);

  app.use(routerController.validLogin);

  // 注册
  app.post('/register', routerController.register);
  // 验证码
  app.post('/code', routerController.getCode);
  // 登录
  app.post('/login', routerController.login);
  // 获取用户信息
  app.post('/userInfo', routerController.getUserInfo);
}