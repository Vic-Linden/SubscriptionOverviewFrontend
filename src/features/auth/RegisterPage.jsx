import { useState, useContext } from 'react';

import { register } from './authApi';
import { AuthContext } from './AuthContext';

function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { loginUser } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const data = await register(email, password);
            loginUser(data.token);
        }catch{
            setError('Email already in use.');
        }
    };
    return(
        <></>
    )
}
export default RegisterPage;