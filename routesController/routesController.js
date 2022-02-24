// 路由控制器

let { encodingString, sendEmail, signToken, verifyToken, uploadImg } = require("../utils");
let { createData, findData, query } = require("../api/api");

// 操作符
const { Op, Sequelize } = require("sequelize");

let { codeList, tokenList } = require("../whiteList/whiteList");

let moment = require("moment");



// 引入配置文件
const alipaysdk = require("../db/alipay");
const AlipayFormData = require("alipay-sdk/lib/form").default;

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
    let url = req.url.split("?")[0];
    if (tokenList.includes(url)) {
      // 需要进行token验证的
      // 截取token
      let token = req.body.token ? req.body.token : req.query.token;

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
    // 生成typeId
    let typeId = "_t" + new Date().getTime();
    // 为类型模型添加数据
    createData("Type", { typeId, typeName: req.body.typeName, userId: req.userId }).then(result => {
      res.send({ msg: "成功", code: 200, result })
    }).catch(err => {
      console.log('err', err);
      res.send({ msg: "失败", code: 201 })
    })
  }


  findTypeDate(req, res) {
    // AND `type_name` LIKE '%品%'
    let sql = "SELECT * FROM `type` WHERE `user_id` = :userId ";

    // 带条件查询
    if (req.query.typeName) {
      sql += " AND `type_name` LIKE '%" + req.query.typeName + "%'";
    }

    sql += " LIMIT :offset,:count";

    query(sql, {
      userId: req.userId,
      count: Number(req.query.count),
      offset: Number(req.query.offset),
    }).then(result => {
      res.send({ msg: "查询商品类型数据成功", code: 200, result })
    }).catch(err => {
      res.send({ msg: "查询失败", code: 201 })
    })
  }
  //支付部分
  startPay(req, res) {

    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    // 配置信息
    formData.addField('bizContent', {
      outTradeNo: 'out_trade_no', //订单号
      productCode: 'FAST_INSTANT_TRADE_PAY', //固定不变的
      totalAmount: '0.01', //价格
      subject: '商品0217', //商品名称
      body: '商品详情2022-02-17', //商品描述
    });

    formData.addField('returnUrl', 'http://localhost:8081/#/pay');

    const result = alipaysdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData: formData },
    );
    // 对接支付宝成功 支付宝返回的数据
    result.then(resp => {
      res.send({ code: 200, success: true, msg: "支付中", paymentUrl: resp })
    })

  }

  // 查询所有商品类型
  getTypeAll(req, res) {
    findData("Type", { userId: req.userId }).then(result => {
      res.send({ code: 200, msg: "查询所有商品类型成功", result })
    }).catch(err => {
      res.send({ code: 201, msg: "失败" })
    })
  }

  // 添加商品
  addProduct(req, res) {
    // 图片不能上传过大
    // let data = req.body;
    // dimg
    // img
    // data:image/png;base64,
    // 获取商品图片
    // 替换掉标记符
    let dimgbase64 = req.body.dimg.replace(/data:image\/[a-z]+;base64/, '').replace(/ /g, "+");
    let dimgType = req.body.dimg.split(";")[0].split("/")[1];

    let imgbase64 = req.body.img.replace(/data:image\/[a-z]+;base64/, '').replace(/ /g, "+");
    let imgType = req.body.img.split(";")[0].split("/")[1];

    Promise.all([
      // 等待上传完毕所有图片之后 再将商品数据写入数据库
      uploadImg(
        // 任务1 商品图片
        {
          base64: imgbase64,
          type: imgType
        },
      ),
      // 等待上传完毕所有图片之后 再将商品数据写入数据库
      uploadImg(
        // 任务2 详情图片
        {
          base64: dimgbase64,
          type: dimgType
        },
      )
    ]).then(result => {

      req.body.img = "http://localhost:/3000" + result[0].filename;
      req.body.dimg = "http://localhost:/3000" + result[1].filename;

      // 移除多于属性
      delete req.body.token;

      // req.body.price = Number(req.body.price);
      // req.body.count = Number(req.body.count);
      // req.body.status = Number(req.body.status);
      // // 生成一个商品Pid属性
      // req.body.pid = "_p" + new Date().getTime();

      // req.body.userId = req.userId;

      // desc

      // name

      // price

      // typeId


      res.send("发布商品ok");
    }).catch(err => {
      console.log('err');
      res.send("发布商品失败");
    })
  }
}
module.exports = new routesController();