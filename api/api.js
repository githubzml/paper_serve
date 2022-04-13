
class API {
  // 创建数据
  createData(modelName, o) {
    // modelName 模型名字
    // o 创建数据
    return Model[modelName].create(o);
  }
  // 查询数据
  findData(modelName, condition, attributes) {

    // modelName 模型名称 string
    // condition 查询条件
    // attributes 查询字段 [字段名1，字段名2，...]

    return Model[modelName].findAll({
      where: condition,
      attributes,
    })
  }
  // 原始查询
  query(sql, o) {
    return sequelize.query(sql, {
      replacements: o,
      type: sequelize.QueryTypes.SELECT
    })
  }
  // 更新数据的方法
  updateData(modelName, values, condition) {
    // modelName 模型名称
    // values 更新数据
    // condition 查询条件
    return Model[modelName].update(values, {
      where: condition
    });
  }
  // 删除数据的方法
  deleteData(modelName, condition) {
    // modelName 模型名称
    // condition 查询条件
    return Model[modelName].destroy({
      where: condition
    });
  }
}

module.exports = new API;