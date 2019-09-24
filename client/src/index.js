import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import Register from './components/Register'
import Login from './components/Login';
import FlashCards from './components/FlashCards'
import RequireAuth from './components/RequireAuth'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import authReducer from './store/reducers/authentication'
import { setAuthenticationHeader } from './utils/authenticate'

// const rootReducer = combineReducers({
//     authRed: AuthReducer
// })

const store = createStore(authReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// get the token
let token = localStorage.getItem('jsonwebtoken')
// and attach it ot the header
setAuthenticationHeader(token)

ReactDOM.render(
    <Provider store = {store} >
    <BrowserRouter>
    <BaseLayout>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/flashcards" component={FlashCards} />
        </Switch>
    </BaseLayout>
    </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
