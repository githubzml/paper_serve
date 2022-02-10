// 路由控制器

let { encodingString, sendEmail, signToken, verifyToken } = require("../utils");
let { createData, findData } = require("../api/api");

// 操作符
const { Op } = require("sequelize");

let { codeList, tokenList } = require("../whiteList/whiteList");

let moment = require("moment");
class routesController {
  // 经过这个层
  validCode(req, res, next) {
    let { email, code } = req.body;

    let time = new Date().getTime() - 5 * 60 * 1000; //当前时间的前5分钟

    let date = moment(time).format("YYYY-MM-DD HH:mm:ss"); //当前时间的前5分钟格式化


    //需要验证码
    if (codeList.includes(req.url)) {
      // 获取邮箱和所输入的验证码
      findData("Code", {
        email,
        code,
        // 创建时间 > 当前时间 - 5分钟
        createdAt: {
          [Op.gte]: date
        }
      }).then(result => {
        if (!result.length) {
          res.send({ msg: "验证码有误", code: 0 });
        } else {
          next();
        }
      })

    } else {
      // 传递给下一个中间件或者路由
      next();
    }
  }

  validLogin(req, res, next) {

    if (tokenList.includes(req.url)) {
      // 需要进行token验证的
      let { token } = req.body;
      verifyToken(token, (err, decode) => {
        if (err) {
          res.send({ msg: "请先登录", code: 0 });
        } else {
          req.userId = decode.data;
          next();
        }
      })
    } else {
      next();
    }
  }

  //获取验证码
  getCode(req, res) {
    let { email } = req.body;
    // 随机生成验证码
    let code = Math.random().toString().substr(2, 6);

    // 存储验证码
    createData("Code", { email, code }).then(result => {

      res.send({ msg: "验证码已发送至邮箱", codeFlag: 1, code });

      // 开发环境不发邮件
      // 发邮件
      // sendEmail(email, code, (err, data) => {
      //   if (err) {
      //     res.send({ msg: "获取邮箱验证码失败", codeFlag: 0 });
      //   } else {
      //     res.send({ msg: "验证码已发送至邮箱", codeFlag: 1, code });
      //   }
      // })
    }).catch(err => {
      res.send({ msg: "defeat", codeFlag: 0 })
    })
  }

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
          res.send({ msg: "注册成功", code: 1 })
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

  // 登录
  login(req, res) {
    let { email, password } = req.body
    findData("User", {
      email
    }, ['userId', 'password']).then(result => {
      if (!result.length) {
        res.send({ msg: "邮箱未被注册", code: 0 });
      } else {
        // 邮箱存在 匹配密码
        let ps = encodingString(password);
        if (ps == result[0].dataValues.password) {

          let token = signToken(result[0].dataValues.userId, "1d");

          res.send({ msg: "登陆成功", code: 1, token });
        } else {
          res.send({ msg: "密码不正确", code: 0 });
        }
      }
    }).catch(err => {
      res.send({ msg: "登录失败", code: 0 });
    })
  }
  // 获取用户信息
  getUserInfo(req, res) {
    // req.userId
    // 查询昵称和头像
    findData("User", {
      userId: req.userId
    }, ['nickname', 'url']).then(result => {
      res.send({ msg: "查询用户信息成功", code: 200, result });
    }).catch(err => {
      console.log('err', err);
      res.send({ msg: "查询用户信息失败", code: 201 });
    })
  }
  // 添加商品类型
  addType(req, res) {
    res.send("添加商品类型成功")
  }
}
module.exports = new routesController();