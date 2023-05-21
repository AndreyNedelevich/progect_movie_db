import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';


interface IProps {
    children: ReactElement
}

const RequiredAuth: FC<IProps> = ({children}) => {

   const auth= localStorage.getItem('auth')&&localStorage.getItem('username')


    if (!auth) {
        return <Navigate to={'/home'}/>
    }

    return children
};

export {RequiredAuth};