import dayjs from "dayjs";

const { createSlice } = require("@reduxjs/toolkit");

const initialActionModalState = {
  showAction: false,
};

const ActionModalSlice = createSlice({
  name: "ActionModalSlice",
  initialState: initialActionModalState,
  reducers: {
    toggleAction: (state, action) => {
      const showActionValue = !state.showAction;
      return { showAction: showActionValue };
    },
  },
});

export const { toggleAction } = ActionModalSlice.actions;

export default ActionModalSlice.reducer;
