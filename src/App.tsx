import React from 'react';

import './App.css';
import {authService} from "./services";
import {authorization} from "./constans";
import {Header} from "./components";
import {RoutesConfig} from "./routesConfig";
import {useAppSelector} from "./hooks";


function App() {

    authService.setTokens(authorization)

    const {user} = useAppSelector((state) => state.authReducer)


    return (
        <div>
            <Header/>
            <RoutesConfig/>

            {user && <div className="data">
                <div>login - user1@gmail.com /pin - 123456</div>
                <div>login - user2@gmail.com /pin - 123456</div>
                <div>login - user3@gmail.com /pin - 123456</div>
            </div>}
        </div>
    );
}

export default App;
