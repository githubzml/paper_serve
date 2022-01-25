// mysql数据库配置

exports.mysqlOptions = {
  // 数据库名称
  database: "esjydb",
  // 用户名
  username: "root",
  // 密码
  password: "1q2w3e",
  // 连接地址
  host: "localhost",
  // 连接数据库类型
  dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  // 时区
  timezone: "+08:00",
  // 数据库连接池 负责分配 管理 释放数据库连接的
  pool: {
    // 最大连接数
    max: 10,
    min: 0,
    // 连接超时 单位ms
    acquire: 30000,
    // 闲置时间
    idle: 10000
  }
}