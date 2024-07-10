import React, { useEffect } from 'react';
import initializeAuth from './helper/loginHelper';
// Componente responsable de ejecutar las rotaciones de tokens iniciales que deben ocurrir una vez (antes relogin)

const AuthInitializer = ({ children, callback }) => {
    useEffect(() => {
        initializeAuth();
    }, []);

    return <>{children}</>;
};

export default AuthInitializer;
