import { configureStore } from "@reduxjs/toolkit";
import RecordSlice from "./slices/RecordSlice";
import MilkSlice from './slices/MilkSlice';
import DateSlice from "./slices/DateSlice";
import ActionModalSlice from "./slices/ActionModalSlice";
import RecordModalSlice from "./slices/RecordModalSlice";
import SleepSlice from "./slices/SleepSlice";

const store = configureStore({
  // 개발자가 직접 작성한 Slice 오브젝트들이 명시되어야 한다.
  reducer: {
    RecordSlice: RecordSlice,
    MilkSlice: MilkSlice,
    DateSlice: DateSlice,
    ActionModalSlice: ActionModalSlice,
    RecordModalSlice: RecordModalSlice,
    SleepSlice: SleepSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;