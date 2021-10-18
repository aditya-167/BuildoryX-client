import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';

import { Context } from '../context';
import { useRouter } from 'next/router';

const forgetPassword = () =>{
    const [email, setEmail] = useState('');
    
    const [success, setSuccess] = useState(false);
    
    const [pin, setPin] = useState('');
    
    const [newPass, setNewPass] = useState('');
    
    const [load, setLoad] = useState(false);

    const [ reEnternewPass, setreEnterNewPass ] = useState('');

    const { state: {user} } = useContext(Context);

    const router = useRouter();

    useEffect(()=>{

        if(user!==null) router.push("/");
    },[user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);

        try{
            const { data } = await axios.post('/api/forgetPassword', { email });
            setSuccess(true);
            toast("Pin sent to the register email!");
            setLoad(false);

        }catch(err){
            setLoad(false);
            toast.error(err.response.data);

        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoad(true);
        try{
            
            const { data } = await axios.post("/api/resetPassword",{ email, pin ,newPass, reEnternewPass });
            setEmail("");
            setPin("");
            setNewPass("");
            setreEnterNewPass("");
            setLoad(false);
            toast.success('Password updated Successfully');
            router.push("/login");
        }catch(err){
            setLoad(false);
            toast.error(err.response.data);
        }
    }

    return (
        <>
                    {!success && (<>
                        <div id="card-fp">
                            <div id="card-content">
                                <div id="card-title">
                                    <h2>FORGET PASSWORD</h2>
                                    <div className="underline-title-fp "></div>
                                </div>
                                
                                    <form onSubmit={handleSubmit} class="form">
                                        <label for="user-email" styles={{paddingTop:'30px'}}>
                                            &nbsp;
                                        </label>
                                        <input id="user-email" className="form-content-fp" placeholder = "Email" type="email" value = {email} onChange = {e=>setEmail(e.target.value)} autoComplete="on" required />
                                        <div className="form-border-fp text-center"></div>
                                        
                                        <button disabled = {!email} id="submit-btn" type="submit" value="Submit" >{load ? <SyncOutlined spin /> : "Submit"}</button>
                                        <p id="signup-fp">Enter email associated with your account</p>
                                    </form>
                                </div>
                        </div>
                    </>)}

                    {success && (<>
                        <div id="card-otp">
                            <div id="card-content">
                                <div id="card-title">
                                    <h2>FORGET PASSWORD</h2>
                                    <div className="underline-title-fp "></div>
                                </div>
                                <form onSubmit={handleResetPassword} class="form">
                                    <label for="user-email" styles={{paddingTop:'30px'}}>
                                        &nbsp;
                                    </label>
                                    <input id="user-email" className="form-content-fp" placeholder = "PIN" type="text" value = {pin} onChange = {e=>setPin(e.target.value)} autoComplete="on" required />
                                    <div className="form-border-fp text-center"></div>

                                    <label for="user-email" styles={{paddingTop:'30px'}}>
                                        &nbsp;
                                    </label>
                                    <input id="user-email" className="form-content-fp" placeholder = "New Password" type="password" value = {newPass} onChange = {e=>setNewPass(e.target.value)} autoComplete="on" required />
                                    <div className="form-border-fp text-center"></div>

                                    <label for="user-email" styles={{paddingTop:'30px'}}>
                                        &nbsp;
                                    </label>
                                    <input id="user-email" className="form-content-fp" placeholder = "Re-Enter New Password" type="password" value = {reEnternewPass} onChange = {e=>setreEnterNewPass(e.target.value)} autoComplete="on" required />
                                    <div className="form-border-fp text-center"></div>
                                    
                                    
                                    <button disabled = {!email} id="submit-btn" type="submit" value="Submit" >{load ? <SyncOutlined spin /> : "Submit"}</button>
                                    <p id="signup-fp">Enter the PIN sent to the registed email & set a new password</p>
                                </form>
                            </div>
                        </div>
                    </>)}
                
           

            
        </>

    )
}

export default forgetPassword;