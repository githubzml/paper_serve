// 保存商品数据的

// user用户模型

// 获取模型类

const { DataTypes, Model } = require('sequelize');

// 创建user模型 继承Model
class Product extends Model { }
// 两个参数 表字段 配置
Product.init({
  // 表id
  id: {
    //数据类型 整形 无符号 
    type: DataTypes.INTEGER.UNSIGNED,
    // 不能为Null
    allowNull: false,
    // 主键
    primaryKey: true,
    // 自动递增
    autoIncrement: true,
    // 备注
    comment: "表Id"
  },
  // 商品id
  pId: {
    type: DataTypes.STRING(20),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "商品id"
  },
  // 知道是谁上传的
  userId: {
    type: DataTypes.STRING(30),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "用户Id"
  },
  // 商品名称
  pname: {
    type: DataTypes.STRING(20),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "商品名称"
  },
  // 关联商品id 类型id
  typeId: {
    type: DataTypes.STRING(30),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "类型id"
  },
  //商品价格
  price: {
    type: DataTypes.DECIMAL.UNSIGNED, //可以保留小数的， 无符号
    // 不能为Null
    allowNull: false,
    defaultValue: 0,
    // 备注
    comment: "商品价格"
  },
  // 商品图片
  pimg: {
    type: DataTypes.STRING(120),
    allowNull: false,
    defaultValue: "",
    comment: "商品图片"
  },
  // 商品图片
  pdimg: {
    type: DataTypes.STRING(120),
    allowNull: false,
    defaultValue: "",
    comment: "商品详情图片"
  },
  // 商品描述
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
    comment: "商品描述"
  }
}, {
  modelName: 'product',
  // 是否添加时间戳属性
  timestamps: true,
  // 逻辑删除      物理删除
  paranoid: true,
  // 自动设置字段为蛇形（以_方式命名）命名规则 userId => user_id
  underscored: true,
  // 禁止修改表名
  // 默认情况下，sequelize 会自动将所有传递的模型名称转换为复数形式。 如果不想这样做，请设置以下内容
  freezeTableName: true,
  // Sequelize 实例
  sequelize,
})

// force:true
// force:false 如果存在则不创建新表 否则创建新表
Product.sync({ force: false });

// 导出模型
module.exports = Product;