import { configureStore, ThunkAction, Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get } from 'firebase/database';
import { firebaseInstanse } from '../firebase';

export interface Page {
  routeName: string;
}

export interface PageState {
  pages: Page[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
  const dbRef = ref(getDatabase(firebaseInstanse));
  return get(child(dbRef, `pages`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  }).catch((error) => {
    return error;
  });
})

const pagesReducer = createSlice({
  name: 'pages',
  initialState: {
    pages: [] as Page[],
    status: 'idle',
    error: null
  } as PageState,
  reducers: {
    setPages: (state, action) => {
      state.pages = Object.values(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPages.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pages = Object.values(action.payload);
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ? action.error.message : null;
      })
  }
});

export const selectAllPages = (state: any) => state.pages.pages;

export const selectPagesStatus = (state: any) => state.pages.status;

export const store = configureStore({
  reducer: {
    pages: pagesReducer.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
