import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import SideBar from './partials/SideBar';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getCookie('token');
        // console.log(token);
        if(token){
          const userData = jwtDecode(token);
          setUser(userData);
        //   console.log(userData);
        }
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className='flex gap-5'>
            <div>
                <SideBar focus='Dashboard'/>
            </div>
            <div>
                <p>Welcome</p>
                <p>{user.name}</p>
            </div>
        </div>
    );
}

export default Dashboard
