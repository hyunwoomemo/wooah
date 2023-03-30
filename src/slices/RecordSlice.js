import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from '../helper/ReduxHelper'
import { cloneDeep } from 'lodash';
import Swal from "sweetalert2";
import dayjs from "dayjs";


const URL = "http://localhost:8000/record";
// 다중행 데이터 조회
export const getList = createAsyncThunk("RecordSlice/getList", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.get(URL)

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
    const response = await axios.get(`${URL}/${payload}`);

    result = response.data;
  } catch (err) {
    console.log(err);
    result = rejectWithValue(err.response);
  }
  return result;
});

// 마지막행 데이터 조회

export const lastItem = createAsyncThunk("RecordSlice/lastItem", async (payload, { rejectWithValue }) => {
  let result = null;
  try {
    const response = await axios.get(`${URL}/last`);

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

  try {
    const response = await axios.put(`${URL}/${payload?.id}`, payload);
    console.log(payload)
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
    error: null,
    selectData: null,
    lastData: null,
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
    [getList.fulfilled]: (state, { payload }) => {
      return {
        data: [...payload],
        selectData: state.data,
        lastData: [...payload][[...payload].length - 1],
        loading: false,
        error: null,
      };
    },
    [getList.rejected]: rejected,


    [getItem.pending]: pending,
    [getItem.fulfilled]: (state, { payload }) => {
      return {
        data: state.data,
        selectData: [...payload],
        lastData: state.lastData,
        loading: false,
        error: null,
      };
    },
    [getItem.rejected]: rejected,

    [lastItem.pending]: pending,
    [lastItem.fulfilled]: (state, { payload }) => {
      return {
        data: state.data,
        selectData: state.data,
        lastData: [...payload],
        loading: false,
        error: null,
      };
    },
    [lastItem.rejected]: rejected,

    [postItem.pending]: pending,
    [postItem.fulfilled]: (state, { payload }) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `기록이 추가되었습니다`,
        showConfirmButton: false,
        timer: 1000,
      });

      return {
        data: [...payload],
        lastData: state.lastData,
        selectData: state.data,
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
    [putItem.fulfilled]: (state, { payload }) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `수정되었습니다`,
        showConfirmButton: false,
        timer: 800,
      });
      return {
        data: [...payload],
        selectData: state.data,
        lastData: state.lastData,
        loading: false,
        error: null
      }
    },
    [putItem.rejected]: rejected,


    [deleteItem.pending]: pending,
    [deleteItem.fulfilled]: (state, { payload }) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `삭제되었습니다`,
        showConfirmButton: false,
        timer: 800,
      });
      return {
        data: [...payload],
        selectData: state.data,
        lastData: state.lastData,
        loading: false,
        error: null
      }
    },
    [deleteItem.rejected]: rejected
  },
});



export const { getCurrentData } = RecordSlice.actions;
export default RecordSlice.reducer;