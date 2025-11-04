/**
 * 八字排盘数据库模块 - PostgreSQL版本
 * 使用PostgreSQL存储八字排盘记录
 */

const { Pool } = require('pg');
const { Lunar, Solar } = require('lunar-javascript');

// 数据库连接池配置
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'lsspp_bazi',
  user: process.env.DB_USER || 'lee',
  password: process.env.DB_PASSWORD || '',
  max: 20,  // 最大连接数
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

/**
 * 初始化数据库连接
 */
async function initDatabase() {
  try {
    // 测试连接
    const client = await pool.connect();
    console.log('✅ PostgreSQL数据库连接成功');

    // 验证表是否存在
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'bazi_records'
      );
    `);

    if (!result.rows[0].exists) {
      throw new Error('bazi_records表不存在，请先运行建表SQL');
    }

    client.release();
    console.log('✅ 数据库表验证通过');
    return pool;
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    throw error;
  }
}

/**
 * 将公历日期转换为农历日期字符串
 */
function convertToLunarDate(year, month, day) {
  try {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();

    return {
      lunarYear: lunar.getYear(),
      lunarMonth: lunar.getMonth(),
      lunarDay: lunar.getDay(),
      lunarDateString: `${lunar.getYear()}-${String(lunar.getMonth()).padStart(2, '0')}-${String(lunar.getDay()).padStart(2, '0')}`,
      lunarChinese: `${lunar.getYearInChinese()}年${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`
    };
  } catch (error) {
    console.error('农历转换失败:', error);
    return null;
  }
}

/**
 * 保存八字记录到数据库
 * @param {Object} record - 八字记录
 * @param {string} record.name - 姓名
 * @param {number} record.birthYear - 出生年份（公历）
 * @param {number} record.birthMonth - 出生月份（公历）
 * @param {number} record.birthDay - 出生日期（公历）
 * @param {number} record.birthHour - 出生时辰（0-23）
 * @param {number} record.birthMinute - 出生分钟（0-59），可选，默认0
 * @param {string} record.gender - 性别（MALE/FEMALE）
 * @param {Object} record.bazi - 八字数据
 * @param {Object} record.analysis - 分析结果
 * @returns {Object} 保存结果
 */
async function saveBaziRecord(record) {
  const client = await pool.connect();

  try {
    // 转换为农历日期
    const lunarInfo = convertToLunarDate(
      record.birthYear,
      record.birthMonth,
      record.birthDay
    );

    if (!lunarInfo) {
      throw new Error('农历日期转换失败');
    }

    // 准备八字数据（只保存核心信息）
    const baziData = {
      yearColumn: record.bazi.yearColumn,
      monthColumn: record.bazi.monthColumn,
      dayColumn: record.bazi.dayColumn,
      hourColumn: record.bazi.hourColumn,
      dayMaster: record.bazi.dayMaster,
      dayMasterWuxing: record.bazi.dayMasterWuxing
    };

    // 准备分析数据（完整保存）
    const analysisData = {
      yongshenAnalysis: record.analysis.yongshenAnalysis,
      gejuAnalysis: record.analysis.gejuAnalysis,
      shenshaAnalysis: record.analysis.shenshaAnalysis,
      classicalAnalysis: record.analysis.classicalAnalysis,
      dayunAnalysis: record.analysis.dayunAnalysis,
      wuxingAnalysis: record.analysis.wuxingAnalysis
    };

    const solarDateString = `${record.birthYear}-${String(record.birthMonth).padStart(2, '0')}-${String(record.birthDay).padStart(2, '0')}`;
    const birthMinute = record.birthMinute || 0;

    // 插入记录 (使用RETURNING获取插入的ID)
    const result = await client.query(
      `INSERT INTO bazi_records (
        name, birth_date_lunar, birth_date_solar, birth_hour, birth_minute,
        gender, bazi, analysis
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [
        record.name,
        lunarInfo.lunarDateString,
        solarDateString,
        record.birthHour,
        birthMinute,
        record.gender,
        JSON.stringify(baziData),
        JSON.stringify(analysisData)
      ]
    );

    const insertedId = result.rows[0].id;
    console.log('✅ 八字记录保存成功, ID:', insertedId);

    return {
      success: true,
      id: insertedId,
      message: '保存成功',
      lunarInfo: lunarInfo
    };
  } catch (error) {
    console.error('❌ 保存八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    client.release();
  }
}

/**
 * 根据ID查询八字记录
 */
async function getBaziRecordById(id) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM bazi_records WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return { success: false, message: '记录不存在' };
    }

    const record = result.rows[0];

    return {
      success: true,
      data: {
        id: record.id,
        name: record.name,
        birthDateLunar: record.birth_date_lunar,
        birthDateSolar: record.birth_date_solar,
        birthHour: record.birth_hour,
        birthMinute: record.birth_minute || 0,
        gender: record.gender,
        bazi: record.bazi,  // PostgreSQL自动解析JSONB
        analysis: record.analysis,
        createdAt: record.created_at,
        updatedAt: record.updated_at
      }
    };
  } catch (error) {
    console.error('❌ 查询八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    client.release();
  }
}

/**
 * 根据姓名查询八字记录列表
 */
async function getBaziRecordsByName(name) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM bazi_records WHERE name LIKE $1 ORDER BY created_at DESC',
      [`%${name}%`]
    );

    return {
      success: true,
      data: result.rows.map(record => ({
        id: record.id,
        name: record.name,
        birthDateLunar: record.birth_date_lunar,
        birthDateSolar: record.birth_date_solar,
        birthHour: record.birth_hour,
        birthMinute: record.birth_minute || 0,
        gender: record.gender,
        bazi: record.bazi,
        createdAt: record.created_at,
        updatedAt: record.updated_at
      })),
      count: result.rows.length
    };
  } catch (error) {
    console.error('❌ 查询八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    client.release();
  }
}

/**
 * 获取所有八字记录（分页）
 */
async function getAllBaziRecords(page = 1, pageSize = 20) {
  const client = await pool.connect();

  try {
    const offset = (page - 1) * pageSize;

    // 查询总数
    const countResult = await client.query('SELECT COUNT(*) as count FROM bazi_records');
    const total = parseInt(countResult.rows[0].count);

    // 查询分页数据
    const result = await client.query(
      `SELECT * FROM bazi_records
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [pageSize, offset]
    );

    return {
      success: true,
      data: result.rows.map(record => ({
        id: record.id,
        name: record.name,
        birthDateLunar: record.birth_date_lunar,
        birthDateSolar: record.birth_date_solar,
        birthHour: record.birth_hour,
        birthMinute: record.birth_minute || 0,
        gender: record.gender,
        bazi: record.bazi,
        createdAt: record.created_at,
        updatedAt: record.updated_at
      })),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  } catch (error) {
    console.error('❌ 查询八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    client.release();
  }
}

/**
 * 删除八字记录
 */
async function deleteBaziRecord(id) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'DELETE FROM bazi_records WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        message: '记录不存在'
      };
    }

    console.log('✅ 八字记录删除成功, ID:', id);
    return {
      success: true,
      message: '删除成功'
    };
  } catch (error) {
    console.error('❌ 删除八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    client.release();
  }
}

/**
 * 更新八字记录
 */
async function updateBaziRecord(id, updates) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `UPDATE bazi_records
       SET name = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [updates.name, id]
    );

    if (result.rowCount === 0) {
      return {
        success: false,
        message: '记录不存在'
      };
    }

    console.log('✅ 八字记录更新成功, ID:', id);
    return {
      success: true,
      message: '更新成功'
    };
  } catch (error) {
    console.error('❌ 更新八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    client.release();
  }
}

/**
 * 关闭数据库连接池
 */
async function closeDatabase() {
  try {
    await pool.end();
    console.log('✅ 数据库连接池已关闭');
  } catch (error) {
    console.error('❌ 关闭数据库连接池失败:', error);
  }
}

module.exports = {
  initDatabase,
  saveBaziRecord,
  getBaziRecordById,
  getBaziRecordsByName,
  getAllBaziRecords,
  deleteBaziRecord,
  updateBaziRecord,
  closeDatabase,
  convertToLunarDate
};
