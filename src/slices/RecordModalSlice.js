import dayjs from "dayjs";

const { createSlice } = require("@reduxjs/toolkit");

const initialRecordModalSlice = {
  openCategory: '',
  updateCategory: '',
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
    update: (state, action) => {
      const dateValue = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const updateCategoryValue = action.payload;
      const openCategoryValue = state.openCategory
      const volumeValue = state.volume;

      return { openCategory: openCategoryValue, updateCategory: updateCategoryValue, date: dateValue, volume: volumeValue }
    },

    updateVolume: (state, action) => {
      const volumeValue = parseInt(action.payload);
      const updateCategoryValue = state.updateCategory
      const dateValue = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');

      return { volume: volumeValue, updateCategory: updateCategoryValue, date: dateValue }
    },

    plus: (state, action) => {
      const volumeValue = parseInt(state.volume) + action.payload;
      const openCategoryValue = state.openCategory
      const updateCategoryValue = state.updateCategory
      const dateValue = dayjs(new Date(state.date)).format('YYYY-MM-DD HH:mm:ss');

      return { date: dateValue, volume: volumeValue, updateCategory: updateCategoryValue, openCategory: openCategoryValue }
    },
    minus: (state, action) => {
      const volumeValue = parseInt(state.volume) - action.payload;
      const openCategoryValue = state.openCategory
      const updateCategoryValue = state.updateCategory
      const dateValue = dayjs(new Date(state.date)).format('YYYY-MM-DD HH:mm:ss');
      return { date: dateValue, volume: volumeValue, openCategory: openCategoryValue, updateCategory: updateCategoryValue }
    },
    onChange: (state, action) => {
      const volumeValue = state.volume;
      const nowValue = action.payload
      const openCategoryValue = state.openCategory
      return { volume: volumeValue, now: nowValue, openCategory: openCategoryValue }
    },
    onEndDateChange: (state, action) => {
      const endDateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');
      const volumeValue = state.volume;
      return { endDate: endDateValue, volume: volumeValue }
    },
    selectDate: (state, action) => {
      const dateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');
      const openCategoryValue = state.openCategory;
      const volumeValue = state.volume;
      const updateCategoryValue = state.updateCategory;

      return { date: dateValue, updateCategory: updateCategoryValue, openCategory: openCategoryValue, volume: volumeValue }
    },

    selectEndDate: (state, action) => {
      const dateValue = state.date;
      const endDateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');
      const openCategoryValue = state.openCategory;
      const volumeValue = state.volume;
      const updateCategoryValue = state.updateCategory;

      return { date: dateValue, endDate: endDateValue, updateCategory: updateCategoryValue, openCategory: openCategoryValue, volume: volumeValue }
    }
  }
})


export const { open, updateVolume, update, plus, minus, onChange, onEndDateChange, selectDate, selectEndDate } = RecordModalSlice.actions;

export default RecordModalSlice.reducer;