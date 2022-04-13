
// 获取模型类

const { DataTypes, Model } = require('sequelize');

// 创建user模型 继承Model
class Gy extends Model { }
// 两个参数 表字段 配置
Gy.init({
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
    // 商品名称
    pname: {
        type: DataTypes.STRING(20),
        // 不能为Null
        allowNull: false,
        defaultValue: "",
        // 备注
        comment: "商品名称"
    },
    // 商品描述
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        comment: "商品描述"
    },
    // 联系人
    people: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        comment: "联系人"
    },
    // 联系电话
    lianxi: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        comment: "联系电话"
    },
    // 商品图片
    pimg: {
        type: DataTypes.STRING(120),
        allowNull: false,
        defaultValue: "",
        comment: "商品图片"
    },
}, {
    modelName: 'gy',
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
Gy.sync({ force: false });

// 导出模型
module.exports = Gy;