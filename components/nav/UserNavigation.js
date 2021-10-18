import Link from 'next/link';
import { useState, useContext } from "react";
import { Context } from '../../context';

const UserNavigation = () =>{
    const { state, dispatch } = useContext( Context );
    

    const { user } = state;

    return (
            <>
                <div class="sidebar-container">
                <ul class="sidebar-navigation">
                    
                    
                {user && user.role && user.role.includes("Instructor") && (
                    <>
                    <li>
                        <a href="/instructor/course/create" className="dropdown-item droplist" >
                            <span><i className="fa fa-graduation-cap icons" aria-hidden="true"></i>Create Course
                            </span>
                        </a>
                    </li>
                </>)}
                    
                   
                    
                </ul>
                </div>
            </>



    );


};

export default UserNavigation;