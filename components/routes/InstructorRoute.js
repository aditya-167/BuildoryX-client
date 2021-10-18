import { useEffect, useState, useContext } from 'react';

import { useRouter } from 'next/router';
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../../context'


const InstructorRoute = ({ children }) => {
    const [ok, setOk] = useState(false);

    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();
    useEffect(()=>{
        fetchInstructor();
    },[]);

    const fetchInstructor = async() => {
        try{
            const { data } = await axios.get("/api/currentInstructor");
            if(data.ok) setOk(true);
            
            console.log("instructor!")
        } catch(err){
            setOk(false);
            console.log("not instructor!")
            router.push("/login");
        }
    };

    console.log(ok);
    return (
        <>
            {!ok ? (<SyncOutlined 
                    spin 
                    className = "d-flex justify-content-center display-1 text-primary p-5 spin" 
                    />
            ) : (
            <>     
            {children}
            </>) 
            }
        </>
    );
};

export default InstructorRoute;
