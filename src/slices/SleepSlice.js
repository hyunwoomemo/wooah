import dayjs from "dayjs";

const { createSlice } = require("@reduxjs/toolkit");

const initialMilkState = {
  date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  endDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
}

const SleepSlice = createSlice({
  name: "SleepSlice",
  initialState: initialMilkState,
  reducers: {
    selectDateSleep: (state, action) => {
      const dateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');
      const endDateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');

      return { date: dateValue, endDate: endDateValue }
    },
    selectEndDateSleep: (state, action) => {
      const dateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');
      const endDateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');

      return { date: dateValue, endDate: endDateValue }
    },

    timeChange: (state, action) => {
      const dateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD HH:mm:ss');

      return { date: dateValue }
    },
  }
});

export const { selectDateSleep, selectEndDateSleep, timeChange } = SleepSlice.actions;

export default SleepSlice.reducer;