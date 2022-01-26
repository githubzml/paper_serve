// 路由控制器

let { encodingString, sendEmail } = require("../utils");
let { createData, findData } = require("../api/api");


class routesController {
  // 注册
  register(req, res) {
    let { email, nickname, password, code } = req.body
    // 加密密码
    let ps = encodingString(password);

    // 生成用户ID
    let userId = "_u" + new Date().getTime();

    let o = {
      userId,
      password: ps,
      nickname,
      email
    }

    findData("User", {
      email
    }, ['userId']).then(result => {
      // 该邮箱没有被注册
      if (!result.length) {
        // 写入数据库
        createData("User", o).then(result => {
          res.send({ msg: "注册成功", code: 1, result })
        }).catch(err => {
          res.send({ msg: "注册失败", code: 0 })
        })
      } else {
        res.send({ msg: "邮箱已经被注册", code: 0 })
      }
    }).catch(err => {
      res.send({ msg: "defeat", code: 0 })
    })
  }

  getCode(req, res) {
    let { email } = req.body;
    // 随机生成验证码
    let code = Math.random().toString().substr(2, 6);

    // 存储验证码
    createData("Code", { email, code }).then(result => {
      sendEmail(email, code, (err, data) => {
        if (err) {
          res.send({ msg: "获取邮箱验证码失败", code: 0 });
        } else {
          res.send({ msg: "验证码已发送至邮箱", code: 1 });
        }
      })
    }).catch(err => {
      res.send({ msg: "defeat", code: 0 })
    })
  }
}
module.exports = new routesController();