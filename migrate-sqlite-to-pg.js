/**
 * SQLite到PostgreSQL数据迁移脚本
 */

const Database = require('better-sqlite3');
const { Pool } = require('pg');
const path = require('path');

// SQLite数据库路径
const SQLITE_DB_PATH = path.join(__dirname, 'bazi_records.db');

// PostgreSQL连接配置
const pgPool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'lsspp_bazi',
  user: 'lee',
  password: '',
  max: 5,
});

async function migrateData() {
  let sqliteDb;
  let pgClient;

  try {
    // 连接SQLite
    console.log('📦 连接SQLite数据库...');
    sqliteDb = new Database(SQLITE_DB_PATH, { readonly: true });

    // 连接PostgreSQL
    console.log('🐘 连接PostgreSQL数据库...');
    pgClient = await pgPool.connect();

    // 从SQLite读取所有记录
    console.log('📖 读取SQLite数据...');
    const sqliteRecords = sqliteDb.prepare('SELECT * FROM bazi_records ORDER BY id').all();
    console.log(`✅ 读取到 ${sqliteRecords.length} 条记录`);

    if (sqliteRecords.length === 0) {
      console.log('⚠️  SQLite数据库中没有数据需要迁移');
      return;
    }

    // 开始事务
    await pgClient.query('BEGIN');

    let successCount = 0;
    let failCount = 0;

    // 迁移每条记录
    for (const record of sqliteRecords) {
      try {
        await pgClient.query(
          `INSERT INTO bazi_records (
            name, birth_date_lunar, birth_date_solar, birth_hour, birth_minute,
            gender, bazi, analysis, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            record.name,
            record.birth_date_lunar,
            record.birth_date_solar,
            record.birth_hour,
            record.birth_minute || 0,
            record.gender,
            record.bazi,  // 直接传递JSON字符串，PostgreSQL会自动解析为JSONB
            record.analysis,
            record.created_at,
            record.updated_at
          ]
        );
        successCount++;
        console.log(`  ✓ 迁移记录: ${record.name} (ID: ${record.id})`);
      } catch (error) {
        failCount++;
        console.error(`  ✗ 迁移失败: ${record.name} (ID: ${record.id})`, error.message);
      }
    }

    // 提交事务
    await pgClient.query('COMMIT');

    console.log('\n📊 迁移统计:');
    console.log(`  ✅ 成功: ${successCount} 条`);
    console.log(`  ❌ 失败: ${failCount} 条`);
    console.log(`  📈 总计: ${sqliteRecords.length} 条`);

    // 重置PostgreSQL序列
    const maxIdResult = await pgClient.query('SELECT MAX(id) as max_id FROM bazi_records');
    const maxId = maxIdResult.rows[0].max_id || 0;
    if (maxId > 0) {
      await pgClient.query(`SELECT setval('bazi_records_id_seq', ${maxId})`);
      console.log(`\n🔄 重置自增序列到: ${maxId}`);
    }

    console.log('\n🎉 数据迁移完成！');

  } catch (error) {
    console.error('\n❌ 迁移过程中发生错误:', error);
    if (pgClient) {
      await pgClient.query('ROLLBACK');
    }
    process.exit(1);
  } finally {
    // 清理资源
    if (sqliteDb) {
      sqliteDb.close();
    }
    if (pgClient) {
      pgClient.release();
    }
    await pgPool.end();
  }
}

// 运行迁移
console.log('🚀 开始数据迁移: SQLite → PostgreSQL');
console.log('==========================================\n');

migrateData()
  .then(() => {
    console.log('\n==========================================');
    console.log('✅ 迁移脚本执行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 迁移脚本执行失败:', error);
    process.exit(1);
  });
