import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';

import {IAuth} from "../../interfaces";
import {authActions} from "../../redux";
import {useAppDispatch} from "../../hooks";
import style from './loginForm.module.css'
import {authValidator} from "../../validators";
import logo from "../../assets/imeges/logo.png";



const LoginForm = () => {
    const dispatch = useAppDispatch();




    const {handleSubmit, register, reset,
        formState: {isValid, errors}} = useForm<IAuth>({mode: 'all', resolver: joiResolver(authValidator)});

    const login: SubmitHandler<IAuth> = (user) => {
        console.log(user);
        dispatch(authActions.getAuthUser(user))
        reset();

    }

    const closeModalWindow=()=>{
        dispatch(authActions.shownModalLogIn(false))
    }


    return (
        <div  className={style.backdrop}>
        <div className={style.wrapper}>
            <div className={style.logo}>
                <img src={logo} alt='logo '/>
            </div>
            <form className={style.form} onSubmit={handleSubmit(login)}>
                <CloseIcon onClick={closeModalWindow}/>
                <input
                    type="text"
                    placeholder={"username"}
                    {...register("username")}
                />
                {errors.username && <span>{errors.username.message}</span>}
                <input
                    type="text"
                    placeholder={"pasword"}
                    {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <button style={{width:'100%'}} className='button_slider modal ' disabled={!isValid} >SIGN IN</button>
            </form>
        </div>
        </div>
    );
};

export {LoginForm};