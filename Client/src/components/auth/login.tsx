'use client';

import { useContext } from 'react';
import { LoginContext } from '@/src/context/logincontext';
import { UserContext, useUser } from '@/src/context/userContext';
import ProfileNavbar from '@/src/pages/profileNav';

export const LoginBtn = () => {
    const context = useContext(LoginContext);
    const {user} = useUser();

    if (!context) {
        throw new Error("LoginContext is undefined. Make sure you are wrapping your component tree in LoginProvider.");
    }

    const { showModal, setShowModal } = context;

    const showLogin = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            {!user ? (
                <button className="px-8 py-2 text-slate-100 bg-blue-600 rounded" onClick={showLogin}>
                    Login
                </button>
            ) : (
                <div>
                    <ProfileNavbar />
                </div>
            )}
        </div>
    );
};

export default LoginBtn;
