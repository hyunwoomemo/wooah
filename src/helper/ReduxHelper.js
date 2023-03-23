// REUDX SLICE 에서 반복적으로 사용되는 처리로직을 재사용하기 위해 만든 모듈
const pending = (state, { payload }) => {
  return { loading: true }
};

const fulfilled = (state, { payload }) => {
  return {
    data: payload,
    loading: false,
    error: null
  }
};

const rejected = (state, { payload }) => {
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
};

export { rejected, fulfilled, pending };