import { configureStore, ThunkAction, Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get } from 'firebase/database';
import { firebaseInstanse } from '../firebase';
import SvgIconProps from '@mui/material/SvgIcon/SvgIcon';
import { ResponsiveStyleValue } from '@mui/system';

export interface ComponentProps {
  name: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline' | 'inherit';
  color?: "primary" | "secondary" | "error" | "default" | "info" | "success" | "warning" | undefined;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  textAlign?: 'left' | 'center' | 'right' | undefined;
  noWrap?: boolean;
  paragraph?: string;
  sx?: any;
  display?: 'initial' | 'block' | 'inline';
  label?: string;
  src?: string;
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
  icon?: typeof SvgIconProps;
  href?: string;
  svg?: string;
  component?: string;
  components?: ComponentProps[];
  orientation?: 'horizontal' | 'vertical';
  alt?: string;     
}

export interface Page {
  routeName: string;
  components: ComponentProps[] | undefined;
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
