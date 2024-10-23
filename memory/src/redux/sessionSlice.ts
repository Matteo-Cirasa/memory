// sessionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SessionState = {
  selectedGameTitle: string;
  selectedDifficulty: number;
  username: string | null;
  token: string | null;
  scadenza: number | null;
  score: number; // Punteggio corrente
  moves: number; // Numero di mosse
}

const initialState: SessionState = {
  selectedGameTitle: '',
  selectedDifficulty: 0,
  username: null,
  token: null,
  scadenza: null,
  score: 0,
  moves: 0,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSelectedGameTitle: (state, action: PayloadAction<string>) => {
      state.selectedGameTitle = action.payload;
    },
    setSelectedDifficulty: (state, action: PayloadAction<number>) => {
      state.selectedDifficulty = action.payload;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setMoves: (state, action: PayloadAction<number>) => {
      state.moves = action.payload;
    },
    setSession: (state, action: PayloadAction<{ username: string; token: string; scadenza: number }>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.scadenza = action.payload.scadenza;
    },
    clearSession: (state) => {
      state.selectedGameTitle = '';
      state.selectedDifficulty = 0;
      state.username = '';
      state.token = '';
      state.scadenza = 0;
      state.score = 0;
      state.moves = 0;
    },
  },
});

export const { setScore, setMoves, setSelectedGameTitle, setSelectedDifficulty, setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
