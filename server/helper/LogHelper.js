/** 1) 패키지 참조 */
const { mkdirs } = require("./FileHelper");
const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const dotenv = require("dotenv");
const { join, resolve } = require("path");
const fs = require("fs");

/** 2) 환경설정 정보 */
// 설정파일의 절대경로 문자열 생성
// resolve() --> 현재 프로그램의 root 경로
const configFileName = process.env.NODE_ENV !== "production" ? ".env.server.development" : ".env.server.production";
const configPath = join(resolve(), configFileName);

// 파일이 존재하지 않을 경우 강제로 에러 발생함.
if (!fs.existsSync(configPath)) {
  try {
    throw new Error();
  } catch (e) {
    console.error("================================================");
    console.error("|          Configuration Init Error            |");
    console.error("================================================");
    console.error("환경설정 파일을 찾을 수 없습니다. 환경설정 파일의 경로를 확인하세요.");
    console.error(`환경설정 파일 경로: ${configPath}`);
    console.error("프로그램을 종료합니다.");
    process.exit(1);
  }
}

// 설정파일 로드
dotenv.config({ path: configPath });

/** 3) 로그가 저장될 폴더 생성 */
mkdirs(process.env.LOG_PATH);

/** 4) 로그가 출력될 형식 지정하기 위한 함수 추출 */
const { combine, timestamp, printf, splat, colorize } = winston.format;

/** 5) winston 객체 만들기 */
const logger = winston.createLogger({
  // 로그의 전반적인 형식
  format: combine(
    timestamp({
      // 날짜 출력형식은 https://day.js.org/docs/en/display/format 참고
      //format: 'YYYY-MM-DD HH:mm:ss',
      format: "YY/MM/DD HH:mm:ss SSS",
    }),
    printf((info) => {
      return `${info.timestamp} [${info.level}]: ${info.message}`;
    }),
    splat()
  ),
  // 일반 로그 규칙 정의
  transports: [
    // 하루에 하나씩 파일 형태로 기록하기 위한 설정
    new winstonDaily({
      name: "log",
      level: process.env.LOG_LEVEL, // 출력할 로그의 수준.
      datePattern: "YYMMDD", // 파일 이름에 표시될 날짜형식
      dirname: process.env.LOG_PATH, // 파일이 저장될 위치
      filename: "log_%DATE%.log", // 파일이름 형식
      maxsize: 50000000,
      maxFiles: 50,
      zippedArchive: true,
    }),
  ],
});

/** 6) 콘솔 설정 */
// 프로덕션 버전(=상용화 버전)이 아니라면?
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      prettyPrint: true,
      showLevel: true,
      level: process.env.LOG_LEVEL,
      format: combine(
        colorize({ all: true }),
        printf((info) => {
          return `${info.timestamp} [${info.level}]: ${info.message}`;
        })
      ),
    })
  );
}

/** 7) 생성한 로그 객체 내보내기 */
module.exports = logger;
