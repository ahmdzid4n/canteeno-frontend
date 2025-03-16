import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    name: string;
    email: string;
    phoneNumber: string;
    password?: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPhoneNumber(state, action: PayloadAction<string>) {
            state.phoneNumber = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        }
    },
});

export const { setName, setEmail, setPhoneNumber, setPassword } = userSlice.actions;

export default userSlice.reducer;