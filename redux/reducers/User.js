import {createSlice} from '@reduxjs/toolkit';

const initailState = {
  isLoggedIn: false,
  profileImage:
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
};

export const User = createSlice({
  name: 'user',
  initialState: initailState,
  reducers: {
    logIn: (state, action) => {
      return {...state, ...{isLoggedIn: true}, ...action.payload};
    },
    resetToIntitialState: () => {
      return initailState;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {resetToIntitialState, logIn, updateToken} = User.actions;
export default User.reducer;
