import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue, isPending} from '@reduxjs/toolkit';
// import {AxiosError} from 'axios';


import {IAuth, IUser} from "../../interfaces";
import {authService} from "../../services";


interface IState {
    isShowModalLogIn: boolean
    isAuth: boolean,
    errorAuth: string,
    iLloading: boolean,
    user: IUser
}


const initialState: IState = {
    isShowModalLogIn: false,

    isAuth: false,
    errorAuth: '',
    iLloading: false,
    user: {} as IUser
}


const getAuthUser = createAsyncThunk<IUser, IAuth>(
    'authSlice/getAuthUser',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const {data} = await authService.getUseers()
            const mockUser = data.find(user => user.username === username && user.password === password);
            if (mockUser) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('username', mockUser.username);
                localStorage.setItem('password', mockUser.password);
                return mockUser
            }
        } catch (e) {
            // const err = e as AxiosError
            return rejectWithValue('Incorrect username or password')
        }
    }
)


const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        shownModalLogIn: (state, action) => {
            state.isShowModalLogIn = action.payload
        },
        logout: (state, action) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            state.user = {} as IUser;
            state.isAuth = action.payload
        },
    },


    extraReducers: builder =>
        builder
            .addCase(getAuthUser.fulfilled, (state, action) => {
                if (localStorage.getItem('auth') && localStorage.getItem('username')) {
                    state.user = action.payload;
                    state.isAuth = true
                    state.errorAuth=''
                } else {
                    state.errorAuth = 'Incorrect username or password'
                }
                state.isShowModalLogIn = false
            })
            .addMatcher(isPending(), (state) => {
                state.iLloading = true
            })
            .addMatcher(isFulfilled(), state => {
                state.iLloading = false
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.errorAuth = action.payload as string
                state.iLloading = false
            })
})

const {actions, reducer: authReducer} = slice


const authActions = {
    ...actions,
    getAuthUser

}

export {
    authActions,
    authReducer
}