import { useEffect, useState, useContext} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import {SyncOutlined} from '@ant-design/icons'
import { Context } from "../context";
import { useRouter } from 'next/router';

const Login = () =>{
    
    const [email, setEmail] = useState('adityasrichandan3098@gmail.com');
    
    const [password, setPassword] = useState('Speedfreak@123');

    const [loading,setLoading] = useState(false);


    const { state, dispatch } = useContext(Context);

    const { user } = state;
    const router = useRouter();  

    useEffect(()=>{
        if(user!== null)
         router.push("/");
    },[user]);

    
    
    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            setLoading(true);
            const {data} = await axios.post(`api/login`,{
            email,
            password
            });

            dispatch({
                type: "LOGIN",
                payload: data,
            });

            //save local storage
            window.localStorage.setItem('user',JSON.stringify(data));
            toast.success('Logged in Successfully');
            setLoading(false);
            
            //REDIRECT TO HOMEPAGE
            router.push("/")
        } catch(err){
            
            toast.error(err.response.data);
            setLoading(false);
        }
    }
   return(
    <>
        
        
    <div id="card">
        <div id="card-content">
            <div id="card-title">
                <h2>SIGN IN</h2>
                <div className="underline-title"></div>
            </div>
            <form onSubmit={handleSubmit} class="form">
                <label for="user-email" styles={{paddingTop:'30px'}}>
                    &nbsp;
                </label>
                <input id="user-email" className="form-content" placeholder = "Email" type="email" value = {email} onChange = {e=>setEmail(e.target.value)} autoComplete="on" required />
                <div className="form-border"></div>
                <label for="user-password" styles={{paddingTop:'30px'}}>&nbsp;
                </label>
                <input id="user-password" className="form-content" value = {password} onChange = {e=>setPassword(e.target.value)} type="password" name="password" required />
                <div className="form-border"></div>
                    <a href="/forgetPassword">
                        <legend id="forgot-pass">Forgot password?</legend>
                    </a>
                    <button disabled = {!email||!password} id="submit-btn" type="submit" value="Submit" >{loading ? <SyncOutlined spin /> : "Submit"}</button>
                <a href="/register" id="signup">Don't have account yet?</a>
            </form>
        </div>
    </div>
        
    </>
   );

};

export default Login;