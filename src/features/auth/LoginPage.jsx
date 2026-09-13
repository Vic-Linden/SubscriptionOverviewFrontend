import {useState, useContext} from 'react';
import {login} from './authApi';
import {AuthContext} from './AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {loginUser} = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const data = await login(email, password);
            loginUser(data.token);
        } catch (error)
        {
            setError('Invalid email or password');
        }
    };
    return (
        <></>
    );
}
export default LoginPage;