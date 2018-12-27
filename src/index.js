import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { put as dispatch, call, takeEvery } from 'redux-saga/effects';


// function* changesColor(action) {
//     try {
//         console.log(`in change colors`, action.payload);
//         yield call(axios.put, '/box', action.payload);
//         yield dispatch({ type: 'GET_COLOR', })
//     } catch (error) {
//         console.log('error getting projects saga', error);

//     }

// }

function* getColor() {
    try {
        console.log(` in get colors `);
        const setColor = yield axios.get('/api/box');
        yield dispatch({ type: 'SET_COLOR', payload: setColor });
        console.log(setColor);


    } catch (error) {
        console.log(`error in get colors saga`, error);

    }
}

// Create the rootSaga generator function
function* rootSaga() {
    // yield takeEvery('CHANGE_COLOR', changesColor) // to get projects
    yield takeEvery('GET_COLOR', getColor)
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const boxColor = (state = [
    {
        "id": 1,
        "color": "#95f442"
    }   
], action) => {
    switch (action.type) {
        case 'SET_COLOR':
            return action.payload; // need .data because we had nested data, duh.
        default:
            return state;
    }
}


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        boxColor,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));

// registerServiceWorker();

