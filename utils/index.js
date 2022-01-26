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
}

module.exports = new Utils();