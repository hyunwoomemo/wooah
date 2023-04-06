const express = require('express');
const logger = require("../helper/LogHelper");
const regexHelper = require('../helper/RegexHelper');
const RecordService = require("../services/RecordService");

module.exports = (() => {
  const url = "/record";
  const router = express.Router();

  /** 전체 목록 조회 --> Read(SELECT) */
  router.get(url, async (req, res, next) => {

    // 데이터 조회
    let json = null;

    try {
      json = await RecordService.getList();
    } catch (err) {
      return next(err);
    }

    res.send(json);
  });

  /** 단일행 조회 --> Read(SELECT) */
  router.get(`${url}/:date`, async (req, res, next) => {
    // 파라미터 받기
    const { date } = req.params;

    // 데이터 조회
    let json = null;
    try {
      json = await RecordService.getItem({
        date: date,
      });
    } catch (err) {
      return next(err);
    }

    res.send(json);
  });

  /** 데이터 추가 --> Create(INSERT) */
  router.post(url, async (req, res, next) => {
    // 파라미터 받기
    const { category, date, endDate, recorder, volume, big, email, groupName, calendarTitle, calendarLocation, calendarUrl, calendarMemo, vitamin, lactobacillus } = req.body;
    // 유효성 검사
    try {
      regexHelper.value(category, "카테고리 입력바람.");
    } catch (err) {
      return next(err);
    }

    // 데이터 저장
    let json = null;

    try {
      json = await RecordService.addItem({
        category: category,
        date: date,
        endDate: endDate,
        recorder: recorder,
        volume: volume,
        big: big,
        email: email,
        groupName: groupName,
        calendarTitle: calendarTitle,
        calendarLocation: calendarLocation,
        calendarUrl: calendarUrl,
        calendarMemo: calendarMemo,
        vitamin: vitamin,
        lactobacillus: lactobacillus
      });
    } catch (err) {
      return next(err);
    }

    res.send(json);
  });

  /** 데이터 수정 --> Update(UPDATE) */
  router.put(`${url}/:id`, async (req, res, next) => {
    // 파라미터 받기
    const { id } = req.params;
    console.log(id);
    const { category, date, endDate, recorder, volume, big, email, calendarTitle, calendarLocation, calendarUrl, calendarMemo, vitamin, lactobacillus } = req.body;

    // 데이터 저장
    let json = null;

    try {
      json = await RecordService.editItem({
        id: id,
        category: category,
        date: date,
        endDate: endDate,
        recorder: recorder,
        volume: volume,
        big: big,
        email: email,
        calendarTitle: calendarTitle,
        calendarLocation: calendarLocation,
        calendarUrl: calendarUrl,
        calendarMemo: calendarMemo,
        vitamin: vitamin,
        lactobacillus: lactobacillus
      });
    } catch (err) {
      return next(err);
    }

    res.send(json);
  });

  /** 데이터 삭제 --> Delete(DELETE) */
  router.delete(`${url}/:id`, async (req, res, next) => {
    // 파라미터 받기
    const { id } = req.params;

    // 유효성 검사
    try {
      regexHelper.value(id, "해당하는 id가 없습니다.");
    } catch (err) {
      return next(err);
    }

    let json = null;

    try {
      json = await RecordService.deleteItem({
        id: id,
      });
    } catch (err) {
      return next(err);
    }

    res.send(json);
  });

  return router;
})();