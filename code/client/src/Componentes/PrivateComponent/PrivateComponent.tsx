import {Navigate, Outlet} from 'react-router-dom';

const PrivateComponent =() => {
    const auth = localStorage.getItem('token');
    return auth ?<Outlet />:<Navigate to = '/login' replace/>
}

export default PrivateComponent;