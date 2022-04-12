// 模型
// 收集所有模型
// 用户模型
let User = require("./user");
// 验证码模型
let Code = require("./code");
// 商品类型
let Type = require("./type");

let Product = require("./product");

let Lists = require("../esjy/list");
let Lunbo = require("../esjy/lunbo");
let Qg = require("../esjy/qg");
module.exports = {
  User,
  Code,
  Type,
  Product,

  Lunbo,
  Lists,
  Qg
}