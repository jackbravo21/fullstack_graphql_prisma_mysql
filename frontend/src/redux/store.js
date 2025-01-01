//Vamos configurar o store.js com o middleware do Saga.
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// Importação dos reducers
import userReducer from './users/slice';
import courseReducer from './courses/slice';

// Importação dos sagas
import userSaga from './users/saga';
import courseSaga from './courses/saga';

const sagaMiddleware = createSagaMiddleware();

// Configuração do store
export const store = configureStore({
    reducer: {
        //adiciona os reducers;
        user: userReducer,
        course: courseReducer,
    },
    //Este trecho ignora a serializacao: ignoredActions: ['product/createProduct'],
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [],
                ignoredPaths: [],
    },
}).concat(sagaMiddleware),
});

// Executa os sagas
sagaMiddleware.run(userSaga);
sagaMiddleware.run(courseSaga);

export default store;