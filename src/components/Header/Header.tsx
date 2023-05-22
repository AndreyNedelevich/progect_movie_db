import React, {useRef, useEffect, Fragment} from "react"
import {NavLink, useNavigate} from "react-router-dom";


import {WbSunnyOutlined} from "@mui/icons-material";
import {DarkModeOutlined} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useContext} from "react";
import './Header.css'
import logo from '../../assets/imeges/logo.png';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {ThemeContext, themes} from "../../context";
import {authActions} from "../../redux";


const Header = () => {
 const {isAuth}= useAppSelector(state=>state.authReducer)
   const dispatch= useAppDispatch()
   const navigate=useNavigate()

    const header = useRef(null);

    const context: any = useContext(ThemeContext);

    const {theme, setTheme} = context




    const switcTheme = () => {
        if (theme === themes.light) setTheme(themes.dark)
        if (theme === themes.dark) setTheme(themes.light)
    }


    useEffect(() => {
        const fixHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                header.current.classList.add('fix');
            } else {
                header.current.classList.remove('fix');
            }
        }


        window.addEventListener('scroll', fixHeader);
        return () => {
            window.removeEventListener('scroll', fixHeader);
        };
    }, [])


    const singlIn=()=>{
        navigate('/home')
        dispatch(authActions.shownModalLogIn(true))
    }


    const logOut=()=>{
        navigate('/home')
        dispatch(authActions.logout(false))
    }


    return (
        <Fragment>
            <header ref={header} className='header'>
                <div className='container'>
                    <nav className='flexSB'>
                        <div className='logo'>
                            <img src={logo} alt='logo '/>
                        </div>
                        <ul className='flexSB'>
                            <li>
                                <NavLink to={'home'}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'trending'}>Trending</NavLink>
                            </li>
                            <li>
                                <NavLink to={'upcoming'}>Upcoming</NavLink>
                            </li>
                            <li>
                                <NavLink to={'top_rated'}>Top-Rated</NavLink>
                            </li>
                            <li>
                                <NavLink to={'movies'}>All Movies</NavLink>
                            </li>
                            <li>
                                <NavLink to={'search'}>Search</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <IconButton
                            size="medium"
                            sx={{color: "inherit"}}
                            onClick={switcTheme}>
                            {theme === 'lights' && <WbSunnyOutlined fontSize="large"/>}
                            {theme === 'darks' && <DarkModeOutlined fontSize="large"/>}
                        </IconButton>
                        <button onClick={isAuth? logOut: singlIn } className='button'>{isAuth?'LOG OUT': 'SINGL IN'} </button>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export {Header}