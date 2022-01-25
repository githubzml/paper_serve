// 路由控制器
class routesController {
  // 注册
  register(req, res) {
    res.send({ msg: "成功", code: 200 })
  }
}
module.exports = new routesController();