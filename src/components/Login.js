import React , {useState} from "react";
import {Link, useHistory } from "react-router-dom";
import '../css/Login.css'
import { auth } from "../firebase";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = (e) => {
        e.preventDefault();
        //testing@gmail.com
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/');
            })
            .catch(error => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth){
                    history.push('/');
                }
            })
            .catch( error => alert(error.message));
    }

    return (
        <div className='login'>
            <Link to='/'>
            <img className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='' />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' onChange={e=>setPassword(e.target.value)}/>

                    <button type={"submit"} className='login__signInButton' onClick={signIn}>Sign In</button>
                </form>

                <p>By signing-in you agree to the Amazon fake clone conditions of use & sale. Please see our privacy notie, our cookies notice and out interest-based ads notice</p>

            <button className='login__registerButton' onClick={register}>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login;