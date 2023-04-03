/**
 * @FileName : UtilHelper.js
 * @Description : 백엔드 개발시 자주 사용되는 독립 함수들 모음
 * @Author : Ezen 아카데미 Node.js 강의
 */

const { networkInterfaces } = require('os');
const nodemailer = require("nodemailer");
const logger = require('./LogHelper');

class UtilHelper {
  static #current = null;

  static getInstance() {
    if (UtilHelper.#current === null) {
      UtilHelper.#current = new UtilHelper();
    }

    return UtilHelper.#current;
  }

  myip() {
    const ipAddress = [];
    const nets = networkInterfaces();

    for (const attr in nets) {
      const item = nets[attr];

      item.map((v, i) => {
        if ((v.family == 'IPv4' || v.family == 4) && v.address != '127.0.0.1') {
          ipAddress.push(v.address);
        }
      });
    }

    return ipAddress;
  };

  urlFormat(urlObject) {
    return String(Object.assign(new URL('http://a.com'), urlObject));
  }

  // ^ 메일 발송

  async sendMail(writerName, writerEmail, receiverName, receiverEmail, subject, content) {
    if (writerName) {
      writerEmail = `${writerName} <${writerEmail}>`;
    }

    if (receiverName) {
      receiverEmail = `${receiverName} <${receiverEmail}>`;
    }

    const smtp = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    try {
      await smtp.sendMail({
        from: writerEmail,
        to: receiverEmail,
        subject: subject,
        html: content,
      });
    } catch (e) {
      logger.error(e.message);
      throw new Error('메일 발송에 실패했습니다.');
    }
  }

  /**
   * 페이지 구현에 필요한 변수값들을 계산
   * @param totalCount - 페이지 계산의 대상이 되는 전체 데이터 수 (SQL의 count 함수 결과값)
   * @param nowPage - 현재 페이지 (GET파라미터로 수신한 값)
   * @param listCount - 한 페이지에 보여질 목록의 수 (개발자가 정의하거나 GET으로 받는 값)
   * @param groupCount - 페이지 그룹 수 (개발자가 정하는 값)
   * @return Object - nowPage : 현재 페이지
   *                - totalCount : 전체 데이터 수
   *                - listCount : 한 페이지에 보여질 목록의 수
   *                - totalPage : 전체 페이지 수
   *                - nowGroup : 현재 페이지가 속해 있는 그룹 번호
   *                - groupStart : 현재 그룹의 시작 페이지
   *                - groupEnd : 현재 그룹의 마지막 페이지
   *                - prevGroupLastPage : 이전 그룹의 마지막 페이지
   *                - nextGroupFirstPage : 다음 그룹의 시작 페이지
   *                - offset : SQL의 LIMIT절에서 사용할 데이터 시작 위치
   */

  pagination(totalCount = 0, nowPage = 1, listCount = 10, groupCount = 5) {
    // 전달된 파라미터가 정수 타입이 아니라면 정수로 변환
    totalCount = isNaN(totalCount) ? 0 : parseInt(totalCount);
    nowPage = isNaN(nowPage) ? 1 : parseInt(nowPage);
    listCount = isNaN(listCount) ? 10 : parseInt(listCount);
    groupCount = isNaN(groupCount) ? 5 : parseInt(groupCount);

    // 전체 페이지 수
    let totalPage = parseInt((totalCount - 1) / listCount) + 1;

    // 전체 그룹 수
    let totalGroup = parseInt((totalPage - 1) / groupCount) + 1;

    // 현재 페이지가 속한 그룹
    let nowGroup = parseInt((nowPage - 1) / groupCount) + 1;

    // 현재 그룹의 시작 페이지 번호
    let groupStart = parseInt((nowGroup - 1) * groupCount) + 1;

    // 현재 그룹의 마지막 페이지 번호
    let groupEnd = Math.min(totalPage, nowGroup * groupCount);

    // 이전 그룹의 마지막 페이지 번호
    let prevGroupLastPage = 0;
    if (groupStart > groupCount) {
      prevGroupLastPage = groupStart - 1;
    }

    // 다음 그룹의 시작 페이지 번호
    let nextGroupFirstPage = 0;
    if (groupEnd < totalPage) {
      nextGroupFirstPage = groupEnd + 1;
    }

    // LIMIT 절에서 사용할 데이터 시작 위치
    let offset = (nowPage - 1) * listCount;

    // 리턴할 데이터들을 객체로 묶기
    return {
      nowPage: nowPage,
      totalCount: totalCount,
      listCount: listCount,
      totalPage: totalPage,
      groupCount: groupCount,
      totalGroup: totalGroup,
      nowGroup: nowGroup,
      groupStart: groupStart,
      groupEnd: groupEnd,
      prevGroupLastPage: prevGroupLastPage,
      nextGroupFirstPage: nextGroupFirstPage,
      offset: offset,
    };
  }
}

module.exports = UtilHelper.getInstance();