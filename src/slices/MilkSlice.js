import dayjs from "dayjs";

const { createSlice } = require("@reduxjs/toolkit");

const initialMilkState = {
  volume: 140,
  date: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
}

const MilkSlice = createSlice({
  name: "milkSlice",
  initialState: initialMilkState,
  reducers: {
    plus: (state, action) => {
      const volumeValue = state.volume + action.payload;

      return { volume: volumeValue }
    },
    minus: (state, action) => {
      const volumeValue = state.volume - action.payload;

      return { volume: volumeValue }
    },
    timeChange: (state, action) => {
      const dateValue = dayjs(new Date(action.payload)).format('YYYY-MM-DD hh:mm:ss');
      const volumeValue = state.volume

      return { volume: volumeValue, date: dateValue }
    }
  }
});

export const { plus, minus, timeChange } = MilkSlice.actions;

export default MilkSlice.reducer;