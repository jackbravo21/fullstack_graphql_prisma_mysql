import { all } from 'redux-saga/effects';
import user from './users/saga';
import course from './courses/saga';

//essa funcao* eh uma funcao geradora, ela eh como o async await, o function* eh o async, e o yield eh o await que espera acontecer;
export default function* rootSaga(){
  return yield all([
    user(),
    course(),
  ])
}


