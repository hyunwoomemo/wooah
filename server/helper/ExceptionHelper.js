/**
 * HTTP 상태 코드 (HTTP Status Code)
 * 웹에서의 에러상황을 의미하는 표준화된 숫자값
 * - 400 : Bad Request Exception -> 잘못된 요청 (사용자가 지정된 형식으로 입력하지 않은 경우)
 * - 403 : Forbidden -> 접근 권한이 없습니다. (로그인 실패 등)
 * - 404 : Page Not Found -> 페이지를 찾을 수 없습니다. (웹 브라우저에 주소 잘못 입력한 경우)
 * - 500 : Server Error -> 백엔드 프로그램이 겪는 Runtime Error (백엔드 개발자 잘못)
 * 
 * 사용자의 입력값 형식을 지키도록 강제하는 것은 백엔드에게는 보안과 연결되는 중요한 사안
 * 사용자의 입력값을 검사하여 지정된 형식이 아닐 경우 적절한 예외처리를 수행해야 한다.
 */

class Exception extends Error {
  // HTTP 상태코드를 의하는 멤버변수
  #code;

  constructor(statusCode, msg) {
    super(msg);
    super.name = this.constructor.name;
    this.#code = statusCode;
  }

  get code() {
    return this.#code;
  }
}

class BadRequestException extends Exception {
  constructor(msg = '잘못된 요청 입니다.') {
    super(400, msg);
  }
}

class ForbiddenException extends Exception {
  constructor(msg = '접근 권한이 없습니다.') {
    super(403, msg);
  }
}

class PageNotFoundException extends Exception {
  constructor(msg = '페이지를 찾을 수 없습니다.') {
    super(404, msg);
  }
}

class RuntimeException extends Exception {
  constructor(msg = '요청을 처리하는데 실패했습니다.') {
    super(500, msg);
  }
}

class MultipartException extends Exception {
  constructor(err) {
    let msg = null;

    if (err instanceof multer.MulterError) {
      switch (err.code) {
        case 'LIMIT_FIELD_COUNT':
          msg = '업로드 가능한 파일 수를 초과했습니다.';
          break;
        case 'LIMIT_FILE_SIZE':
          msg = '업로드 가능한 파일 용량을 초과했습니다.';
          break;
        default:
          msg = '파일 업로드 도중 알 수 없는 에러가 발생했습니다.';
          break;
      }
    }

    super(500, msg);
  }
}

module.exports = { BadRequestException, ForbiddenException, PageNotFoundException, RuntimeException, MultipartException };

