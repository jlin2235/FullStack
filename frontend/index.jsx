import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
// import { login, signup } from './util/session_api_util'


document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            session: { id: window.currentUser.id },
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }



    const root = document.getElementById('root');
    // const store = configureStore();

    ReactDOM.render(<Root store={store}/>,root);
    // ReactDOM.render(<h1> HELLO!</h1>);





    // window.login = login; 
    // window.signup = signup;
    //FOR TESTING
});

