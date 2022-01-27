// 导入加密模块
let crypto = require("crypto");

let nodemailer = require("nodemailer");

// 创建发邮件配置
var transporter = nodemailer.createTransport({
  // 主机
  host: "smtp.163.com",
  // 端口 25端口在服务器上可能会被禁用
  port: 465,
  secure: true,
  auth: {
    //发件地址
    user: "15712965708@163.com",
    pass: "ROYURMZNXDNXHDNG"
  }
})

// 导入 jsonwebtoken 模块
let jsonwebtoken = require("jsonwebtoken");
class Utils {
  // 加密字符串
  encodingString(value) {
    // 以MD5加密
    let md5 = crypto.createHash("md5");
    return md5.update(value).digest('hex');
  }
  // 发邮件
  sendEmail(emails, code, fn) {
    // emails: string ,123@qq.com,1235@qq.com,...
    transporter.sendMail({
      // 发件地址
      from: "15712965708@163.com",
      to: emails,
      subject: "邮箱验证", //主题
      text: `邮箱验证码为${code},5分钟内有效！啪_标记下_是我发的` //邮箱内容
    }, fn)
  }
  // 生成token
  // 加盐 强化加密方式
  // 过期时间 过了就无效
  signToken(value, expires) {


    // expiresIn 过期时间
    // 60 ===> '60s'
    // "100" ===> "100ms"
    // "2 days" ===> "2天"
    // "10h" ===> "10小时"
    // "7d" ===> "7天"

    // _tsalt 任意的加盐方式
    return jsonwebtoken.sign({ data: value }, "_tsalt", {
      expiresIn: expires
    })
  }

  verifyToken(value, fn) {
    return jsonwebtoken.verify(value, "_tsalt", fn)
  }
}

module.exports = new Utils();