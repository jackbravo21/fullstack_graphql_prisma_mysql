//root-reducer serve para chamar todos os reducers da nossa aplicacao;

//importo o combineReducers e o userReducer que foi criado no slice;
import { combineReducers } from 'redux';
import userReducer from './users/slice';
import courseReducer from './courses/slice';

//aqui eh o user do Slice;
export default combineReducers({
  user: userReducer,
  courses: courseReducer,
    
  /*
  //Aqui eu poderia ter importado outro slice, de um carrinho por exemplo:
  cart: cartSlice,
  */
})