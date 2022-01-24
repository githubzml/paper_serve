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
}