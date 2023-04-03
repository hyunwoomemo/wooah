// 필요한 패키지 가져오기
const { join, resolve } = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const logger = require('./LogHelper');

// 환경설정 파일 로드 --> 데이터베이스 접속정보를 가져오기 위함
dotenv.config({ path: join(resolve(), ".env.server.development") });

/**
 * DB Connection Pool을 관리하기 위한 SingleTon 클래스
 */

class DBPool {
  // 싱글톤 객체
  static #current = null;

  // 접속 정보 설정
  static connectionInfo = {
    host: process.env.DB_HOST, // MYSQL 서버 주소 (다른 PC인 경우 IP 주소),
    port: process.env.DB_PORT, // MYSQL 포트번호
    user: process.env.DB_USERNAME, // MYSQL의 로그인 할 수 잇는 계정 이름
    password: process.env.DB_PASSWORD, // 비밀번호
    database: process.env.DB_SCHEMA, // 사용하고자 하는 데이터베이스 이름
    connectionLimit: process.env.DB_CONNECTION_LIMIT, // 최대 커넥션 수
    connectTimeout: process.env.DB_CONNECT_TIMEOUT, // 커넥션 타임 아웃
    waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS // 커넥션 풀이 다 찬 경우 처리
  };

  /** 싱글톤 객체를 생성하여 리턴하는 메서드 */
  static getInstance() {
    if (DBPool.#current == null) {
      DBPool.#current = new DBPool();
    }
    return DBPool.#current;
  }

  /** 
   * 생성자
   * 데이터베이스 Connection Pool을 생성하고 필요한 이벤트를 정의한다.
   * 각 이벤트는 DBConnection의 생성, 임대, 반납 여부를 모니터링 하고
   * 데이터베이스에 접속되었을 경우 DB에 전달되는 SQL문을 가로채서 로그로 기록하는 기능을 구현한다.
   */
  constructor() {
    // Connection pool 객체를 멤버변수로서 생성
    this.pool = mysql.createPool(DBPool.connectionInfo);

    // 데이터베이스에 접속된 경우 발생할 이벤트
    this.pool.on('connection', (connection) => {
      logger.info(` >> DB 접속됨 [threaId=${connection.threadId}]`);

      // 이 객체로 전달되는 SQL 수행 기능을 가로챔
      const oldQuery = connection.query;

      // 가로챈 객체의 기능을 로그 기록 후 SQL을 수행하도록 재정의
      connection.query = function (...args) {
        const queryCmd = oldQuery.apply(connection, args);
        // 1) sql문에 포함된 모든 줄바꿈문자를 띄어쓰기로 변환한다.
        // 2) sql문에 포함된 2회 연속 공백 문자를 하나의 공백으로 변환한다.
        // 3) 그 결과를 로그로 기록
        logger.debug(queryCmd.sql.trim().replace(/\n/g, " ").replace(/ +(?= )/g, " "));
        return queryCmd;
      }
    });

    this.pool.on('acquire', (connection) => {
      logger.info(` >> Connection 임대됨 [threadId=${connection.threadId}]`);
    });
    this.pool.on('release', (connection) => {
      logger.info(` >> Connection 반납됨 [threadId=${connection.threadId}]`);
    });
  }

  /**
   * Connection Pool에서 하나의 데이터베이스 접속 객체를 임대하는 베서드
   */
  async getConnection() {
    let dbcon = null;

    try {
      dbcon = await this.pool.getConnection();
    } catch (err) {
      // 임대한 자원이 있다면 반드시 반납해야 함.
      if (dbcon) { dbcon.release(); }
      logger.error(err);
      throw err;
    }

    return dbcon;
  }

  /** 
   * 데이터베이스 커넥션 풀을 종료함
   */
  close() {
    this.pool.end();
  }
}

// 싱글톤 객체를 모듈로 내보냄
module.exports = DBPool.getInstance();