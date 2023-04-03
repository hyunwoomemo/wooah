const mybatisMapper = require('mybatis-mapper');
const DBPool = require('../helper/DBPool');
const { RuntimeException } = require('../helper/ExceptionHelper');

class RecordService {

  /** 생성자 - Mapper파일을 로드한다 */
  constructor() {
    // mapper의 위치는 이 소스 파일이 아닌 프로젝트 root를 기준으로 상대경로
    mybatisMapper.createMapper([
      './server/mappers/RecordMapper.xml'
    ]);
  }

  /** 목록 데이터를 조회한다 */
  async getList() {
    let dbcon = null;
    let data = null;

    try {
      dbcon = await DBPool.getConnection();

      let sql = mybatisMapper.getStatement('RecordMapper', 'selectList');
      let [result] = await dbcon.query(sql);

      if (result.length === 0) {
        throw new RuntimeException('조회된 데이터가 없습니다.');
      }

      data = result;
    } catch (err) {
      throw err;
    } finally {
      if (dbcon) { dbcon.release(); }
    }

    return data;
  }

  /** 단일행 조회 */

  async getItem(params) {
    let dbcon = null;
    let selectData = null;

    try {
      dbcon = await DBPool.getConnection();

      let sql = mybatisMapper.getStatement('RecordMapper', 'selectItem', params);
      let [result] = await dbcon.query(sql);

      if (result.length === 0) {
        throw new RuntimeException('조회된 데이터가 없습니다.');
      }

      selectData = result;
    } catch (err) {
      throw err;
    } finally {
      if (dbcon) { dbcon.release(); }
    }

    return selectData;
  }

  /** 마지막 데이터를 조회한다 */
  async lastItem() {
    let dbcon = null;
    let data = null;

    try {
      dbcon = await DBPool.getConnection();

      let sql = mybatisMapper.getStatement('RecordMapper', 'selectLastItem');
      let [result] = await dbcon.query(sql);

      if (result.length === 0) {
        throw new RuntimeException('조회된 데이터가 없습니다.');
      }

      data = result[0];
    } catch (err) {
      throw err;
    } finally {
      if (dbcon) { dbcon.release(); }
    }

    return data;
  }

  /** 데이터를 추가하고 추가된 결과를 조회하여 리턴한다. */
  async addItem(params) {
    let dbcon = null;
    let data = null;

    try {
      dbcon = await DBPool.getConnection();

      let sql = mybatisMapper.getStatement('RecordMapper', 'insertItem', params);
      let [{ insertId, affectedRows }] = await dbcon.query(sql);

      if (affectedRows === 0) {
        throw new RuntimeException('저장된 데이터가 없습니다.');
      }

      /* // 새로 저장된 데이터의 PK값을 활용하여 다시 조회
      sql = mybatisMapper.getStatement('RecordMapper', 'selectItem', { id: insertId });
      let [result] = await dbcon.query(sql);

      if (result.length === 0) {
        throw new RuntimeException('저장된 데이터를 조회할 수 없습니다.');
      }

      data = result[0]; */
    } catch (err) {
      throw err;
    } finally {
      if (dbcon) { dbcon.release(); }
    }

    return data;
  }

  /** 데이터를 수정하고 수정된 결과를 조회하여 리턴한다. */
  async editItem(params) {
    let dbcon = null;

    try {
      dbcon = await DBPool.getConnection();

      let sql = mybatisMapper.getStatement('RecordMapper', 'updateItem', params);
      let [{ affectedRows }] = await dbcon.query(sql);

      if (affectedRows === 0) {
        throw new RuntimeException('저장된 데이터가 없습니다.');
      }

    } catch (err) {
      throw err;
    } finally {
      if (dbcon) { dbcon.release(); }
    }

  }

  /** 데이터를 삭제한다. */
  async deleteItem(params) {
    let dbcon = null;

    try {
      dbcon = await DBPool.getConnection();

      let sql = mybatisMapper.getStatement('RecordMapper', 'deleteItem', params);
      let [{ affectedRows }] = await dbcon.query(sql);

      if (affectedRows === 0) {
        throw new RuntimeException('삭제된 데이터가 없습니다.');
      }
    } catch (err) {
      throw err;
    } finally {
      if (dbcon) { dbcon.release(); }
    }
  }

  /** 전체 데이터 수 조회 */
  async getCount(params) {
    let dbcon = null;
    let cnt = 0;

    try {
      dbcon = await DBPool.getConnection();

      let sql = mybatisMapper.getStatement('RecordMapper', 'selectCountAll', params);
      let [result] = await dbcon.query(sql);

      if (result.length > 0) {
        cnt = result[0].cnt;
      }
    } catch (err) {
      throw err;
    } finally {
      if (dbcon) { dbcon.release(); }
    }

    return cnt;
  }
}



module.exports = new RecordService();