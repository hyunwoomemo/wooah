import dayjs from "dayjs";

const { createSlice } = require("@reduxjs/toolkit");

const initialMonthState = {
  selectValue: new Date(),
}

const DateSlice = createSlice({
  name: "DateSlice",
  initialState: initialMonthState,
  reducers: {
    select: (state, action) => {
      const selectDateValue = action.payload;

      return { selectValue: selectDateValue }
    },
  }
});

export const { select } = DateSlice.actions;

export default DateSlice.reducer;