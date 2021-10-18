import { useState, useContext } from "react";
import {Menu} from "antd";
import { Context } from '../context';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


const {Item} = Menu;

const TopNav = () =>{
    const [loading,setLoading] = useState(false);

    const { state, dispatch } = useContext( Context );
    const router = useRouter();

    const { user } = state;

    const logout = async () => {
        
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get('/api/logout');

        toast.success(data.message);
        router.push("/login");
        
    };

    return (

        <nav id = "navigation" className="navbar navbar-expand-lg ">

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    { user === null && (
                        <>
                            <ul className="navbar-nav navbar-center-custom">
                                <li className="nav-item navItems">                            
                                        <a href="/" className="nav-link"><span><i className="fa fa-th-large icons" aria-hidden="true"></i></span>Browse</a>
                                </li>
                            </ul>
                            <ul style={{paddingLeft:"4rem"}} class="navbar-nav ml-auto">
                                    <li className="nav-item navItems">                            
                                    <p style = {{zIndex: "1", letterSpacing:"1.2rem", fontFamily: "Pacifico, cursive",fontWeight:"100px", fontSize:"45px"}} className="buildoryx">BUILDORYX!</p>
                                    </li>
                                </ul>
                            
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown ml-auto navItems">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span><i class="fa fa-user icons username" aria-hidden="true">Access</i></span></a>
                                <div className="dropdown-menu dropdown-menu-right dropMenu" aria-labelledby="navbarDropdownMenuLink">
                                    
                                    <a href="/login" className="nav-link"><span><i className="fas fa-sign-in-alt icons" aria-hidden="true" ></i></span>Sign In</a>
                                    <a href = "/register" className="nav-link"><span><i className="fa fa-user-plus icons" aria-hidden="true"></i></span>Sign Up</a>
                                </div>
                            </li>
                                
                                
                            </ul>
                        </>

                    )}
                   
                    { user!==null && (
                            <>
                                <ul className="navbar-nav navbar-center-custom">
                                    <li className="nav-item navItems">                            
                                        <a href="/" className="nav-link"><span><i className="fa fa-th-large icons" aria-hidden="true"></i></span>Browse</a>
                                    </li>
                                </ul>

                                <ul class="navbar-nav ml-auto">
                                    <li className="nav-item navItems">                            
                                        <p style = {{zIndex: "1", letterSpacing:"1.2rem", fontFamily: "Pacifico, cursive",fontWeight:"100px", fontSize:"45px"}} className="buildoryx">BUILDORYX!</p>
                                    </li>
                                </ul>
                                
                                <ul className="navbar-nav  ml-auto">
                                <li className="nav-item dropdown ml-auto navItems">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span><i class="fa fa-user icons username" aria-hidden="true">{user && user.name}</i></span></a>
                                    <div className="dropdown-menu dropdown-menu-right dropMenu" aria-labelledby="navbarDropdownMenuLink">
                                    {user && user.role && user.role.includes("Instructor") ? (
                                        <>
                                         <a className="dropdown-item droplist" href="/instructor"><span><i className="fa fa-bars icons" aria-hidden="true"></i>Dashboard</span></a>
                                         <a className="dropdown-item droplist" href="/instructor/course/create"><span><i className="fa fa-graduation-cap icons" aria-hidden="true"></i>Create Course</span></a>
                                        </>
                                    ):(<a className="dropdown-item droplist" href="/user"><span><i className="fa fa-bars icons" aria-hidden="true"></i>Dashboard</span></a>
                                    )}
                                        <a className="dropdown-item droplist" onClick = { logout }><span><i className="fas fa-sign-out-alt icons" aria-hidden="true"></i>Sign Out</span></a>  
                                    </div>
                                </li>
                                </ul>

                            </>
                    )}
                   

                    
                </div>
        </nav>
 
    );
};

export default TopNav;