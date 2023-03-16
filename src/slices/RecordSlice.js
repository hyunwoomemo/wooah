import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from '../helper/ReduxHelper'
import { cloneDeep } from 'lodash';
import Swal from "sweetalert2";


const URL = "http://localhost:3001/record";
// 다중행 데이터 조회
export const getList = createAsyncThunk("RecordSlice/getList", async (payload, { rejectWithValue }) => {
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
export const getItem = createAsyncThunk("RecordSlice/getItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.get(`${URL}/${payload?.id}`);
    result = response.data;
  } catch (err) {
    console.log(err);
    result = rejectWithValue(err.response);
  }
  return result;
});

// 데이터 추가
export const postItem = createAsyncThunk("RecordSlice/postItem", async (payload, { rejectWithValue }) => {

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
export const putItem = createAsyncThunk("RecordSlice/putItem", async (payload, { rejectWithValue }) => {

  let result = null;
  const params = null;

  try {
    const response = await axios.put(`${URL}/${payload?.id}`, payload);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

//  데이터 삭제
export const deleteItem = createAsyncThunk("RecordSlice/deleteItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.delete(`${URL}/${payload?.id}`);
    result = response.data;
  } catch (err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** Slice 정의   */
const RecordSlice = createSlice({
  name: 'RecordSlice',
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
    [postItem.fulfilled]: (state, { payload }) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `분유 기록이 추가되었습니다 🍼`,
        showConfirmButton: false,
        timer: 1500,
      });
      return {
        data: payload.item,
        pagenation: payload.pagenation,
        loading: false,
        error: null
      }
    },
    [postItem.rejected]: (state, { payload }) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      });
      const err = new Error();

      if (typeof payload.data === "string") {
        err.code = payload.status ? payload.status : 500;
        err.name = "React Error";
        err.message = payload.data;
      } else {
        err.code = payload.data.rtcode;
        err.name = payload.data.rt;
        err.message = payload.data.rtmsg;
      }
      return {
        ...state,
        loading: false,
        error: err
      }
    },


    [putItem.pending]: pending,
    [putItem.fulfilled]: fulfilled,
    [putItem.rejected]: rejected,


    [deleteItem.pending]: pending,
    [deleteItem.fulfilled]: fulfilled,
    [deleteItem.rejected]: rejected
  },
});



export const { getCurrentData } = RecordSlice.actions;
export default RecordSlice.reducer;