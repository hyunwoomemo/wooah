import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';


const URL = "http://localhost:3001/milk";
// 다중행 데이터 조회
export const getList = createAsyncThunk("MilkSlice/getList", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(URL, {
      params: {
        page: payload?.page || 1,
        rows: payload?.rows || 30,
        query: payload?.keyword || ''
      }
    });
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});
// 단일행 데이터 조회
export const getItem = createAsyncThunk("MilkSlice/getItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.get(`${URL}/${payload?.authNo}`);
    result = response.data;
  } catch (err) {
    console.log(err);
    result = rejectWithValue(err.response);
  }
  return result;
});

// 데이터 추가
export const postItem = createAsyncThunk("MilkSlice/postItem", async (payload, { rejectWithValue }) => {

  let result = null;
  try {
    const response = await axios.post(URL, payload);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

//  데이터 수정
export const putItem = createAsyncThunk("MilkSlice/putItem", async (payload, { rejectWithValue }) => {

  let result = null;
  const params = null;

  try {
    const response = await axios.put(`${URL}/${payload?.authNo}`, payload);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

//  데이터 삭제
export const deleteItem = createAsyncThunk("MilkSlice/deleteItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.delete(`${URL}/${payload?.authNo}`);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** Slice 정의   */
const MilkSlice = createSlice({
  name: 'MilkSlice',
  initialState: {
    // backend 
    data: null,
    pagination: null,
    loading: false,
    error: null
  },

  //  외부 action 및 비동기 action (Ajax용)
  //  동기 : reducers
  //  비동기: extraReducers
  reducers: {
    getCurrentData: (state, action) => {
      return state;
    }
  },
  extraReducers: {

    // 로딩중임을 표시

    [getList.pending]: pending,
    [getList.fulfilled]: (state, { meta, payload }) => {
      if (meta.page > 1) {
        payload.item = state.data.concat(payload.item);
      }

      return {
        pagination: payload.pagination,
        data: payload.item,
        loading: false,
        error: null,
      };
    },
    [getList.rejected]: rejected,


    [getItem.pending]: pending,
    [getItem.fulfilled]: fulfilled,
    [getItem.rejected]: rejected,

    [postItem.pending]: pending,
    [postItem.fulfilled]: fulfilled,
    [postItem.rejected]: rejected,


    [putItem.pending]: pending,
    [putItem.fulfilled]: fulfilled,
    [putItem.rejected]: rejected,


    [deleteItem.pending]: pending,
    [deleteItem.fulfilled]: fulfilled,
    [deleteItem.rejected]: rejected
  },
});

export const { getCurrentData } = MilkSlice.actions;
export default MilkSlice.reducer;