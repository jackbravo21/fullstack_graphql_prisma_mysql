import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: {
        id: null,
        fullname: null,
        mail: null,
        password: null,
        level: null,
        createdAt: null,
    },
    tempData: {
        id: null,
        fullname: null,
        mail: null,
        password: null,
        level: null,
        createdAt: null,
    },
    userInfo: null,
    isLoggedIn: false,
    administrator: false,
    users: [],
    error: null,
    loading: false,
};

export const userSlice = createSlice({

    name: "user",
    initialState,

    reducers: {

    //=============================================================

    setErrorUser: (state, action) => {
        state.error = action.payload.error;
    },

    //=============================================================

    resetErrorUser: (state, action) => {
        state.error = null;
    },

    //=============================================================

    dataTempUser: (state, action) => {
        state.loading = true;
        state.tempData.id = action.payload.id;
        state.tempData.fullname = action.payload.fullname;
        state.tempData.mail = action.payload.mail;
        state.tempData.level = action.payload.level;
        state.tempData.createdAt = action.payload.createdAt;
        state.loading = false;
    },

    clearDataTempUser: (state, action) => {
        state.tempData.id = null;
        state.tempData.fullname = null;
        state.tempData.mail = null;
        state.tempData.password = null;
        state.tempData.level = null;
        state.tempData.createdAt = null;
    },

    //=============================================================    

    createUser: (state, action) => {
        state.loading = true;

        state.tempData.fullname = action.payload.fullname;
        state.tempData.mail = action.payload.mail;
        state.tempData.password = action.payload.password;
        state.tempData.level = action.payload.level;
    },

    createUserSuccess: (state, action) => {   
        state.loading = false;
    },

    createUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    loginRequest: (state, action) => {
        state.loading = true;
        state.userData.mail = action.payload.mail;
        state.userData.password = action.payload.password;
    },

    loginSuccess: (state, action) => {
        //state.userData = action.payload;
        state.userData.id = action.payload.id;
        state.userData.fullname = action.payload.fullname;
        state.userData.mail = action.payload.mail;
        state.userData.level = action.payload.level;
        state.userData.createdAt = action.payload.createdAt;
        state.isLoggedIn = true;   
        state.loading = false;
    },

    loginFailure: (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    logoutRequest: (state) => {
        state.userData.id = null;
        state.userData.fullname = null;
        state.userData.mail = null;
        state.userData.password = null;
        state.userData.level = null;
        state.userData.createdAt = null;
        state.userData.administrator = null;

        state.tempData.id = null;
        state.tempData.fullname = null;
        state.tempData.mail = null;
        state.tempData.password = null;
        state.userData.level = null;
        state.tempData.createdAt = null;
        state.tempData.administrator = null;

        state.administrator = false;
        state.isLoggedIn = false;
        state.error = null;
    },

    //=============================================================

    getUser: (state, action) => {
        state.loading = true;
        state.tempData.id = action.payload.id;
    },

    getUserSuccess: (state, action) => {
        state.tempData.id = action.payload.id;
        state.tempData.fullname = action.payload.fullname;
        state.tempData.mail = action.payload.mail;
        state.tempData.password = action.payload.password;
        state.userData.level = action.payload.level;
        state.tempData.createdAt = action.payload.createdAt;
        state.loading = false;
    },

    getUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    editUser: (state, action) => {
        state.loading = true;
        state.tempData.id = action.payload.id;
        state.tempData.fullname = action.payload.fullname;
        state.tempData.mail = action.payload.mail;
        state.tempData.password = action.payload.password;
        state.tempData.level = action.payload.level;
        state.tempData.createdAt = action.payload.createdAt;
    },

    editUserSuccess: (state, action) => {
        state.loading = false;
    },

    editUserFailure: (state, action) => {
        state.tempData = action.payload;
        state.loading = false;
    },

    //=============================================================

    deleteUser: (state, action) => {
        state.loading = true;
        state.tempData.id = action.payload.id;
    },

    deleteUserSuccess: (state, action) => {
        state.tempData.id = null;
        state.tempData.fullname = null;
        state.tempData.mail = null;
        state.tempData.password = null;
        state.tempData.level = action.payload.level;
        state.tempData.createdAt = null;
        state.error = null;
        state.loading = false;
    },

    deleteUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    fetchUsers: (state, action) => {
        state.loading = true;
    },

    fetchUsersSuccess: (state, action) => {
        state.users = action.payload;
        state.loading = false;
        console.log("Saga: ", action.payload);
    },

    fetchUsersFailure: (state, action) => {     
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    }    

});

export const{
    setErrorUser, resetErrorUser, dataTempUser, clearDataTempUser,
    createUser, createUserSuccess, createUserFailure,
    loginRequest, loginSuccess, loginFailure,
    logoutRequest,
    getUser, getUserSuccess, getUserFailure,
    editUser, editUserSuccess, editUserFailure,
    deleteUser, deleteUserSuccess, deleteUserFailure,
    fetchUsers, fetchUsersSuccess, fetchUsersFailure
} = userSlice.actions;

export default userSlice.reducer;