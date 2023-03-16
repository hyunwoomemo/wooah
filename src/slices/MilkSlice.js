const { createSlice } = require("@reduxjs/toolkit");

const initialMilkState = {
  volume: 140,
  date: new Date(),
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
      const dateValue = action.payload;
      const volumeValue = state.volume

      return { volume: volumeValue, date: dateValue }
    }
  }
});

export const { plus, minus, timeChange } = MilkSlice.actions;

export default MilkSlice.reducer;