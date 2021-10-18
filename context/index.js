import {useEffect, createContext, useReducer} from 'react';
import axios from 'axios'

import { useRouter } from 'next/router';
const initState = {
    user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return { ...state, user: action.payload };
        
        case "LOGOUT":
            return { ...state, user: null };

            

        default:
            return state;
    }
};

//wrap _app.js with the context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer,initState)

    const router = useRouter();
    useEffect(()=>{
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem('user')),
        })
    }, []);

    axios.interceptors.response.use(
        function(res){

            //status code within 2xx
            return res;
        }, function(error){
            //

            let res = error.response;
            if(res.status === 401 && !res.config.__isRetryRequest){
                return new Promise((resolve,reject)=>{
                    axios.get("/api/logout").then((data)=>{
                        dispatch({ type: 'LOGOUT'})
                        window.localStorage.removeItem('user');
                        router.push("/login");
                    })
                    .catch(err=>{
                        console.log("AXIOS INTERCEPTORS ERROR", err);
                        reject(error);
                    });
                })
            }
            return Promise.reject(error);
        }
    );

    useEffect(()=>{
        const getCsrfToken = async() =>{

            const { data } = await axios.get("/api/csrf-token");
            
            axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
        };

        getCsrfToken();
    },[])


    return (
        <Context.Provider value = {{ state, dispatch }}>
            { children }
        </Context.Provider>
    );
};

export { Context, Provider };