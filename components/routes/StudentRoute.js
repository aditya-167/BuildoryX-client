import { useEffect, useState, useContext } from 'react';

import { useRouter } from 'next/router';
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../../context'


const StudentRoute = ({ children }) => {
    const [ok, setOk] = useState(false);

    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();
    useEffect(()=>{
        
        fetchUser();
    },[]);

    const fetchUser = async() => {
        try{
            const { data } = await axios.get("/api/current-user");
            if(data.ok) setOk(true);
        } catch(err){
            setOk(false);
            router.push("/login");
        }
    };

    console.log(ok);
    return (
        <>
            {!ok ? (<SyncOutlined 
                    spin 
                    className = "d-flex justify-content-center display-2 text-primary p-4" 
                    />
            ) : (
                <div className="container-fluid">
                    {children}
                </div>    
            ) 
            }
        </>
    );
};

export default StudentRoute;