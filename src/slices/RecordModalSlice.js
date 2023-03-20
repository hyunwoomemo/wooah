import dayjs from "dayjs";

const { createSlice } = require("@reduxjs/toolkit");

const initialRecordModalSlice = {
  openCategory: '',
  volume: 140,
  date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  now: dayjs(new Date())
}

const RecordModalSlice = createSlice({
  name: 'RecordModalSlice',
  initialState: initialRecordModalSlice,
  reducers: {
    open: (state, action) => {
      const dateValue = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const openCategoryValue = action.payload;
      const volumeValue = state.volume;

      return { openCategory: openCategoryValue, date: dateValue, volume: volumeValue }
    },
    plus: (state, action) => {
      const volumeValue = state.volume + action.payload;
      const openCategoryValue = state.openCategory
      const dateValue = dayjs(new Date(state.date)).format('YYYY-MM-DD HH:mm:ss');
      return { date: dateValue, volume: volumeValue, openCategory: openCategoryValue }
    },
    minus: (state, action) => {
      const volumeValue = state.volume - action.payload;
      const openCategoryValue = state.openCategory
      const dateValue = dayjs(new Date(state.date)).format('YYYY-MM-DD HH:mm:ss');
      return { date: dateValue, volume: volumeValue, openCategory: openCategoryValue }
    },
    onChange: (state, action) => {
      const volumeValue = state.volume;
      const nowValue = action.payload
      const openCategoryValue = state.openCategory
      return { volume: volumeValue, now: nowValue, openCategory: openCategoryValue }
    },
    onEndDateChange: (state, action) => {
      const endDateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');

      return { endDate: endDateValue }
    },
    selectDate: (state, action) => {
      const dateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');
      const openCategoryValue = state.openCategory;
      const volumeValue = state.volume;

      return { date: dateValue, openCategory: openCategoryValue, volume: volumeValue }
    },

    selectEndDate: (state, action) => {
      const endDateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');
      const openCategoryValue = state.openCategory;
      const volumeValue = state.volume;

      return { endDate: endDateValue, openCategory: openCategoryValue, volume: volumeValue }
    }
  }
})


export const { open, plus, minus, onChange, onEndDateChange, selectDate } = RecordModalSlice.actions;

export default RecordModalSlice.reducer;