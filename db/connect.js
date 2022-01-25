// 连接数据库
const Sequelize = require("sequelize");

let { mysqlOptions } = require("../config/config");
// 导出连接
module.exports = new Sequelize(mysqlOptions.database, mysqlOptions.username, mysqlOptions.password, {
  host: mysqlOptions.host,
  // 连接数据库类型
  dialect: mysqlOptions.dialect, /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  // 时区
  timezone: mysqlOptions.timezone,
  // 数据库连接池 负责分配 管理 释放数据库连接的
  pool: mysqlOptions.pool
});