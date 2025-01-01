import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courseData: {
        id: null,
        title: null,
        description: null,
        image: null,
        teacher: null,
        createdAt: null,
    },
    courseInfo: null,
    courses: [],
    error: null,
    loading: false,
};

export const courseSlice = createSlice({

    name: "course",
    initialState,

    reducers: {

    //=============================================================
    
    setErrorCourse: (state, action) => {
        state.error = action.payload.error;
    },
    
    //=============================================================
    
    resetErrorCourse: (state, action) => {
        state.error = null;
    },

    //=============================================================

    dataTempCourse: (state, action) => {
        state.courseData.id = action.payload.id;
        state.courseData.title = action.payload.title;
        state.courseData.description = action.payload.description;
        state.courseData.teacher = action.payload.teacher;
        state.courseData.createdAt = action.payload.createdAt;
     },

    //=============================================================

    clearDataCourse: (state, action) => {
        state.courseData.id = '';
        state.courseData.title = '';
        state.courseData.description = '';
        state.courseData.teacher = '';
        state.courseData.createdAt = '';
    },

    clearDataCourses: (state, action) => {
        console.log("clearDataCourses Antes:" + state.courses);
        state.courses = '';
        console.log("clearDataCourses Feito:" + state.courses);
    },

    //=============================================================

    createCourse: (state, action) => {
        state.loading = true;

        state.courseData.title = action.payload.title;
        state.courseData.description = action.payload.description;
        state.courseData.teacher = action.payload.teacher;
        state.courseData.createdAt = action.payload.createdAt;
    },

    createCourseSuccess: (state, action) => {
        state.loading = false;
    },

    createCourseFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    editCourse: (state, action) => {
        state.loading = true;
        state.courseData.id = action.payload.id;
        state.courseData.title = action.payload.title;
        state.courseData.description = action.payload.description;
        state.courseData.teacher = action.payload.teacher;
        state.courseData.createdAt = action.payload.createdAt;
    },

    editCourseData: (state, action) => {
        state.loading = true;
     },

    editCourseSuccess: (state, action) => {
        state.loading = false;
    },

    editCourseFailure: (state, action) => {
        state.courseData = action.payload;
        state.loading = false;
    },

    //=============================================================

    deleteCourse: (state, action) => {
        state.loading = true;
        state.courseData.id = action.payload.id;
    },

    deleteCourseSuccess: (state, action) => {
        state.courseData.id = null;
        state.courseData.title = null;
        state.courseData.description = null;
        state.courseData.teacher = null;
        state.courseData.createdAt = null;
        state.error = null;
        state.loading = false;
    },

    deleteCourseFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    getCourse: (state, action) => {
        state.loading = true;
        state.courseData.id = action.payload.id;
    },

    getCourseSuccess: (state, action) => {
        state.courseData.id = action.payload.id;
        state.courseData.title = action.payload.title;
        state.courseData.description = action.payload.description;
        state.courseData.teacher = action.payload.teacher;
        state.courseData.createdAt = action.payload.createdAt;
        state.loading = false;
    },

    getCourseFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    fetchCourses: (state, action) => {
        state.loading = true;
    },

    fetchCoursesSuccess: (state, action) => {
        state.courses = action.payload;
        state.loading = false;
    },

    fetchCoursesFailure: (state, action) => {     
        state.error = action.payload;
        state.loading = false;
    },

    //=============================================================

    }

});

export const{
    setErrorCourse, resetErrorCourse, dataTempCourse, clearDataCourse, clearDataCourses, 
    createCourse, createCourseSuccess, createCourseFailure, 
    editCourse, editCourseData, editCourseSuccess, editCourseFailure, 
    deleteCourse, deleteCourseSuccess, deleteCourseFailure, 
    getCourse, getCourseSuccess, getCourseFailure, 
    fetchCourses, fetchCoursesSuccess, fetchCoursesFailure
} = courseSlice.actions;

export default courseSlice.reducer;