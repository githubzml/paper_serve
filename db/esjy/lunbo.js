// 轮播模型
const { DataTypes, Model } = require('sequelize');
// 创建lunbo模型 继承Model
class Lunbo extends Model { }
// 两个参数 表字段 配置
Lunbo.init({
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
    // 商品图片
    img: {
        type: DataTypes.STRING(120),
        allowNull: false,
        defaultValue: "",
        comment: "轮播图片"
    },
}, {
    modelName: 'lunbo',
    // 是否添加时间戳属性
    // timestamps: true,
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
Lunbo.sync({ force: false });

// 导出模型
module.exports = Lunbo;