import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  maxValue: 0,
  stopQuiz: null,
  rightAnswer: 0,
  questionCount: 0,
  showResult: false,
};

export const incrementTimer = createAsyncThunk(
  "main/incrementTimer",
  async () => {
    return 1;
  }
);

export const setStopQuiz = createAsyncThunk(
  "main/setStopQuiz",
  async (value) => {
    return value;
  }
);

export const setRightAnswer = createAsyncThunk(
  "main/setRightAnswer",
  async () => {
    return 1;
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    reset: (state) => {
      state.stopQuiz = null;
      state.timerValueOnInterruption = null;
    },
    setMaxValue: (state, action) => {
      state.maxValue = action.payload;
    },
    incQuestCounter: (state, action) => {
      state.questionCount = action.payload;
    },
    setShowResult: (state, action) => {
      state.showResult = action.payload;
    },
    resetRightAnswer: (state) => {
      state.rightAnswer = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setStopQuiz.fulfilled, (state, action) => {
        state.stopQuiz = action.payload;
      })
      .addCase(setRightAnswer.fulfilled, (state, action) => {
        state.rightAnswer += action.payload;
      });
  },
});

export const {
  reset,
  setMaxValue,
  incQuestCounter,
  setShowResult,
  resetRightAnswer,
  setTimerValueOnInterruption,
} = mainSlice.actions;
export default mainSlice.reducer;
