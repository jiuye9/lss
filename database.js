/**
 * 八字排盘数据库模块
 * 使用SQLite存储八字排盘记录
 */

const Database = require('better-sqlite3');
const path = require('path');
const { Lunar, Solar } = require('lunar-javascript');

// 数据库文件路径
const DB_PATH = path.join(__dirname, 'bazi_records.db');

// 初始化数据库连接
let db;

function initDatabase() {
  try {
    db = new Database(DB_PATH, { verbose: console.log });

    // 创建八字记录表
    db.exec(`
      CREATE TABLE IF NOT EXISTS bazi_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        birth_date_lunar TEXT NOT NULL,
        birth_date_solar TEXT NOT NULL,
        birth_hour INTEGER NOT NULL,
        birth_minute INTEGER DEFAULT 0,
        gender TEXT NOT NULL,
        bazi TEXT NOT NULL,
        analysis TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 创建索引以提高查询性能
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_name ON bazi_records(name);
      CREATE INDEX IF NOT EXISTS idx_created_at ON bazi_records(created_at);
    `);

    console.log('✅ 数据库初始化成功:', DB_PATH);
    return db;
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
function saveBaziRecord(record) {
  if (!db) {
    throw new Error('数据库未初始化');
  }

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

    // 插入记录
    const stmt = db.prepare(`
      INSERT INTO bazi_records (
        name,
        birth_date_lunar,
        birth_date_solar,
        birth_hour,
        birth_minute,
        gender,
        bazi,
        analysis
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const solarDateString = `${record.birthYear}-${String(record.birthMonth).padStart(2, '0')}-${String(record.birthDay).padStart(2, '0')}`;
    const birthMinute = record.birthMinute || 0; // 默认为0分

    const result = stmt.run(
      record.name,
      lunarInfo.lunarDateString,
      solarDateString,
      record.birthHour,
      birthMinute,
      record.gender,
      JSON.stringify(baziData),
      JSON.stringify(analysisData)
    );

    console.log('✅ 八字记录保存成功, ID:', result.lastInsertRowid);

    return {
      success: true,
      id: result.lastInsertRowid,
      message: '保存成功',
      lunarInfo: lunarInfo
    };
  } catch (error) {
    console.error('❌ 保存八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * 根据ID查询八字记录
 */
function getBaziRecordById(id) {
  if (!db) {
    throw new Error('数据库未初始化');
  }

  try {
    const stmt = db.prepare('SELECT * FROM bazi_records WHERE id = ?');
    const record = stmt.get(id);

    if (!record) {
      return { success: false, message: '记录不存在' };
    }

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
        bazi: JSON.parse(record.bazi),
        analysis: JSON.parse(record.analysis),
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
  }
}

/**
 * 根据姓名查询八字记录列表
 */
function getBaziRecordsByName(name) {
  if (!db) {
    throw new Error('数据库未初始化');
  }

  try {
    const stmt = db.prepare('SELECT * FROM bazi_records WHERE name LIKE ? ORDER BY created_at DESC');
    const records = stmt.all(`%${name}%`);

    return {
      success: true,
      data: records.map(record => ({
        id: record.id,
        name: record.name,
        birthDateLunar: record.birth_date_lunar,
        birthDateSolar: record.birth_date_solar,
        birthHour: record.birth_hour,
        birthMinute: record.birth_minute || 0,
        gender: record.gender,
        bazi: JSON.parse(record.bazi),
        createdAt: record.created_at,
        updatedAt: record.updated_at
      })),
      count: records.length
    };
  } catch (error) {
    console.error('❌ 查询八字记录失败:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * 获取所有八字记录（分页）
 */
function getAllBaziRecords(page = 1, pageSize = 20) {
  if (!db) {
    throw new Error('数据库未初始化');
  }

  try {
    const offset = (page - 1) * pageSize;

    // 查询总数
    const countStmt = db.prepare('SELECT COUNT(*) as total FROM bazi_records');
    const { total } = countStmt.get();

    // 查询分页数据
    const stmt = db.prepare(`
      SELECT * FROM bazi_records
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);
    const records = stmt.all(pageSize, offset);

    return {
      success: true,
      data: records.map(record => ({
        id: record.id,
        name: record.name,
        birthDateLunar: record.birth_date_lunar,
        birthDateSolar: record.birth_date_solar,
        birthHour: record.birth_hour,
        birthMinute: record.birth_minute || 0,
        gender: record.gender,
        bazi: JSON.parse(record.bazi),
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
  }
}

/**
 * 删除八字记录
 */
function deleteBaziRecord(id) {
  if (!db) {
    throw new Error('数据库未初始化');
  }

  try {
    const stmt = db.prepare('DELETE FROM bazi_records WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
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
  }
}

/**
 * 更新八字记录
 */
function updateBaziRecord(id, updates) {
  if (!db) {
    throw new Error('数据库未初始化');
  }

  try {
    const stmt = db.prepare(`
      UPDATE bazi_records
      SET name = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    const result = stmt.run(updates.name, id);

    if (result.changes === 0) {
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
  }
}

/**
 * 关闭数据库连接
 */
function closeDatabase() {
  if (db) {
    db.close();
    console.log('✅ 数据库连接已关闭');
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
