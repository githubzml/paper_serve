// user用户模型

// 获取模型类

const { DataTypes, Model } = require('sequelize');

// 创建user模型 继承Model
class User extends Model { }
// 两个参数 表字段 配置
User.init({
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

  userId: {
    type: DataTypes.STRING(30),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "用户Id"
  },
  email: {
    type: DataTypes.STRING(50),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "邮箱"
  },
  // 昵称
  nickname: {
    type: DataTypes.STRING(30),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "昵称"
  },
  //密码
  password: {
    type: DataTypes.STRING(32),
    // 不能为Null
    allowNull: false,
    defaultValue: "",
    // 备注
    comment: "密码"
  },
  url: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "http://localhost:3000/default.png",
    comment: "用户头像"
  },
}, {
  modelName: 'user',
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
User.sync({ force: false });

// 导出模型
module.exports = User;