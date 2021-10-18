import {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import {SyncOutlined} from '@ant-design/icons';
import { Context } from "../context";
import { useRouter } from 'next/router';


const Register = () =>{
    const [name, setName] = useState('');
    
    const [email, setEmail] = useState('');

    const [credsuccess, setcredsuccess] = useState(false);
    
    const [password, setPassword] = useState('');
    
    const [success, setSuccess] = useState(false);

    const [reEnterPassword, SetreEnterPassword] = useState('');

    const [loading,setLoading] = useState(false);

    const [pin, setPin] = useState('');

    const router = useRouter();

    const { state: { user }} = useContext(Context);
    useEffect(()=>{
        if(user!== null)
         router.push("/");
    },[user]);

    const handleSubmitOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const err1 = await axios.post('/api/checkCredentials', { 
                    name,
                    email,
                    password,
                    reEnterPassword, 
            });
            setcredsuccess(true);
            
            const err2 = await axios.post('/api/signUpOTP',{ email });
            toast("Pin sent to the registered email!");
            setSuccess(true);
            setLoading(false);
        }catch(err){
            
            setcredsuccess(false);
            setSuccess(false);
            if (credsuccess) toast.error(err.response.data);
            else{
             toast.error(err.response.data);
            }
            setLoading(false);
        };
            
    };


    const handleConfirmSubmit = async(e) =>{
        e.preventDefault();

        try{
            setLoading(true);
            const {data} = await axios.post(`api/register`,{
            name,
            email,
            password,
            pin,
        });
        
        toast.success('Signed up successfully! ');
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        SetreEnterPassword("");
        setPin("");
        router.push("/login")
        } catch(err){
            toast.error(err.response.data);
            setLoading(false);
            
        }


    }
    return(
        <>
        {!success && (<>
            <div id="card-register">
                <div id="card-content-register">
                    
                    <div id="card-title-register">
                        <h2>SIGN UP</h2>
                        <div className="underline-title-register"></div>
                    </div>
                    <form onSubmit = {handleSubmitOTP} class="form-register">
                        <label for="user-email" styles={{paddingTop:'30px'}}>
                            &nbsp;
                        </label>
                        <input id="user-email" className="form-content-register" placeholder = "Name" type="text" value = {name} onChange = {e=>setName(e.target.value)} autoComplete="on" required />
                        <div className="form-border-register"></div>

                        <label for="user-password" styles={{paddingTop:'30px'}}>
                            &nbsp;
                        </label>
                        <input id="user-password" className="form-content-register" placeholder = "Email" value = {email} onChange = {e=>setEmail(e.target.value)} type="email" name="email" required />
                        <div className="form-border-register"></div>

                        <label for="user-password" styles={{paddingTop:'30px'}}>
                            &nbsp;
                        </label>
                        <input id="user-password" className="form-content-register" placeholder = "Password" value = {password} onChange = {e=>setPassword(e.target.value)} type="password" name="password" required />
                        <div className="form-border-register"></div>

                        <label for="user-password" styles={{paddingTop:'30px'}}>
                            &nbsp;
                        </label>
                        <input id="user-password" className="form-content-register" placeholder = "Re-Enter Password" value = {reEnterPassword} onChange = {e=>SetreEnterPassword(e.target.value)} type="password" name="reEnterPassword" required />
                        <div className="form-border-register"></div>
                            
                        <button disabled = {!email||!password||!name||!reEnterPassword} id="submit-btn" type="submit" value="Submit" >{loading ? <SyncOutlined spin /> : "Submit"}</button>
                        <a href="/login" id="signup">Already have an account?</a>
                    </form>
                </div>
            </div>
        </>)}

        {success && (<>
            <div id="card">
                <div id="card-content">
                    
                    <div id="card-title">
                        <h2>PIN</h2>
                        <div className="underline-title"></div>
                    </div>
                    <form onSubmit = { handleConfirmSubmit } class="form">
                        <label for="user-email" styles={{paddingTop:'30px'}}>
                            &nbsp;
                        </label>
                        <input id="user-email" className="form-content" placeholder = "Verification PIN" type="text" value = {pin} onChange = {e=>setPin(e.target.value)} autoComplete="on" required />
                        <div className="form-border"></div>
                            
                        <button disabled = {!pin} id="submit-btn" type="submit" value="Submit" >{loading ? <SyncOutlined spin /> : "Submit"}</button>

                    </form>
                </div>
            </div>
        
        </>)}
        
           
        </>
    );
};

export default Register;
