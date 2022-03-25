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
  //  增加商品类型
  app.post('/addType', routerController.addType);
  // 查询商品类型数据
  app.get("/findTypeDate", routerController.findTypeDate);

  // 发起支付
  app.post("/startPay", routerController.startPay);

  // 获取所有商品数据类型
  app.get("/typeAll", routerController.getTypeAll);

  // 发布商品类型
  app.post("/addProduct", routerController.addProduct);

  // 修改用户头像
  app.post("/uploadUserImg", routerController.uploadUserImg);

  // 修改用户昵称
  app.post("/updateNickName", routerController.updateNickName);

  // 修改用户密码
  app.post("/updatePwd", routerController.updatePwd);

  // 找回密码
  app.post("/findPassword", routerController.findPassword);


  app.post("/findCommodity", routerController.findCommodity);


  // ==================================================================

  app.get("/getHomeImg", routerController.getHomeImg);

  app.get("/getHomeList", routerController.getHomeList);

  app.post("/getDetail", routerController.getDetail);  
}